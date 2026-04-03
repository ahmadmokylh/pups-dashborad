import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var __MONGOOSE_CACHE__: MongooseCache | undefined;
}

const cached: MongooseCache = global.__MONGOOSE_CACHE__ ?? {
  conn: null,
  promise: null,
};

global.__MONGOOSE_CACHE__ = cached;

export async function connectDB() {
  const MONGODB_URL = process.env.DATABASE_URL_MONGODB;

  if (!MONGODB_URL) {
    throw new Error('Invalid/Missing environment variable: DATABASE_URL_MONGODB');
  }

  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new MongoDB connection...');
    cached.promise = mongoose.connect(MONGODB_URL);
  }

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB connected successfully');
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error('MongoDB connection failed:', error);
    throw error;
  }
}