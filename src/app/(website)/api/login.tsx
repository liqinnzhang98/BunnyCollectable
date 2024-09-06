import { NextApiRequest, NextApiResponse } from 'next';
import payload from 'payload';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (user.docs.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const userData = user.docs[0];

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, userData.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: userData.id }, JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Error logging in', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

