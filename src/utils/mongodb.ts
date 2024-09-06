import mongoose from 'mongoose';

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process.env.DATABASE_URI; // Ensure you have this in your .env file
  if (!uri) {
    throw new Error('Missing MongoDB URI');
  }

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDb;
