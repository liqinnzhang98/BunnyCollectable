import { NextApiRequest, NextApiResponse } from 'next';
import payload from 'payload';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, firstName, lastName } = req.body;

    try {
      // Check if user already exists
      const existingUser = await payload.find({
        collection: 'customers',
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (existingUser.docs.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user in Payload
      const customer = await payload.create({
        collection: 'customers',
        data: {
          email,
          firstName,
          lastName,
          password: hashedPassword,
        },
      });

      return res.status(201).json(customer);
    } catch (error) {
      return res.status(500).json({ message: 'Error registering user', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
