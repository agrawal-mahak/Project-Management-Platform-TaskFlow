import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import User from './models/User.js';

// Load .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const makeAdmin = async () => {
  const email = process.argv[2];
  
  if (!email) {
    console.error('❌ Please provide the email address of the user.');
    console.log('Usage: npx tsx makeAdmin.ts <user-email>');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('📦 Connected to MongoDB');

    const user = await User.findOneAndUpdate(
      { email: email },
      { $set: { role: 'admin' } },
      { new: true }
    );

    if (!user) {
      console.error(`❌ User with email "${email}" not found in database.`);
    } else {
      console.log(`✅ Success! Updated ${user.name} (${user.email}) to ADMIN role.`);
      console.log('👉 They must log out and log back in to get their new admin access.');
    }

  } catch (error) {
    console.error('❌ Error updating user:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

makeAdmin();
