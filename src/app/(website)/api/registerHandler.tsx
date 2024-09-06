import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../utils/mongodb'

interface RegisterRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { firstName, lastName, email, password }: RegisterRequestBody = req.body;

      console.log(req.body)

      // Validate the request body
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const client = await dbConnect;
      // const db = client.db('buunny-collectable');
      // const collection = db.collection('customers');
      // console.log(db);

      // // Insert data into the customers collection
      // const result = await collection.insertOne({ firstName, lastName, email, password });

      // res.status(201).json({ message: 'User registered successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allsdowed`);
  }
}
