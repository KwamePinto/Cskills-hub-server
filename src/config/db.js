import mongoose from 'mongoose';
import dns from 'dns';

const connectDB = async () => {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB connected: ${conn.connection.host}`);
};

export default connectDB;
