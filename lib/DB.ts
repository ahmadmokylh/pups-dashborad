import mongoose from 'mongoose';

const MONGODB_URL = process.env.DATABASE_URL_MONGODB!;

if (!MONGODB_URL) {
  throw new Error('Invalid/Missing environment variable: DATABASE_URL_MONGODB');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // typed cache on global to survive hot reloads without using `any`
  var __MONGOOSE_CACHE__: MongooseCache | undefined;
}

let cached = global.__MONGOOSE_CACHE__ as MongooseCache | undefined;

if (!cached) {
  cached = global.__MONGOOSE_CACHE__ = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  if (cached?.conn) return cached.conn;

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URL).then((m) => m);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}
