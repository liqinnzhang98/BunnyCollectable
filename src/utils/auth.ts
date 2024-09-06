import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authMiddleware = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authMiddleware;