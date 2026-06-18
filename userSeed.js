/**
 * userSeed.js — C-Skills Hub demo data seeder
 *
 * Creates one demo User and one demo Admin (superadmin) in the database.
 * Safe to run multiple times — existing records are updated, not duplicated.
 *
 * Usage:
 *   npm run seed
 */

import 'dotenv/config';
import dns from 'dns';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// ── Force Google DNS (fixes c-ares SRV lookup issue on some networks) ──
dns.setServers(['8.8.8.8', '8.8.4.4']);

// ── Inline schemas (avoids importing the full app stack) ─────────────────
const userSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true },
  avatar:    { type: String, default: '' },
  bio:       { type: String, default: '' },
  isActive:  { type: Boolean, default: true },
  role:      { type: String, default: 'user' },
}, { timestamps: true });

const adminSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['admin', 'superadmin'], default: 'superadmin' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const User  = mongoose.model('User',  userSchema);
const Admin = mongoose.model('Admin', adminSchema);

// ── Seed data ─────────────────────────────────────────────────────────────
const DEMO_USER = {
  name:     'Demo User',
  email:    'user@cskillshub.io',
  password: 'User@1234',
};

const DEMO_ADMIN = {
  name:     'Demo Admin',
  email:    'admin@cskillshub.io',
  password: 'Admin@1234',
  role:     'superadmin',
};

// ── Main ──────────────────────────────────────────────────────────────────
async function seed() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌  MONGO_URI is not set in .env');
    process.exit(1);
  }

  console.log('\n🌱  Connecting to MongoDB…');
  await mongoose.connect(uri);
  console.log(`✅  Connected: ${mongoose.connection.host}\n`);

  // ── User ──────────────────────────────────────────────────────────────
  const userHash = await bcrypt.hash(DEMO_USER.password, 12);

  const user = await User.findOneAndUpdate(
    { email: DEMO_USER.email },
    {
      name:     DEMO_USER.name,
      email:    DEMO_USER.email,
      password: userHash,
      isActive: true,
    },
    { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
  );

  console.log('👤  Demo User');
  console.log(`    Email    : ${DEMO_USER.email}`);
  console.log(`    Password : ${DEMO_USER.password}`);
  console.log(`    Role     : user`);
  console.log(`    ID       : ${user._id}\n`);

  // ── Admin ─────────────────────────────────────────────────────────────
  const adminHash = await bcrypt.hash(DEMO_ADMIN.password, 12);

  const admin = await Admin.findOneAndUpdate(
    { email: DEMO_ADMIN.email },
    {
      name:     DEMO_ADMIN.name,
      email:    DEMO_ADMIN.email,
      password: adminHash,
      role:     DEMO_ADMIN.role,
      isActive: true,
    },
    { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
  );

  console.log('🛡️   Demo Admin (superadmin)');
  console.log(`    Email    : ${DEMO_ADMIN.email}`);
  console.log(`    Password : ${DEMO_ADMIN.password}`);
  console.log(`    Role     : ${DEMO_ADMIN.role}`);
  console.log(`    ID       : ${admin._id}\n`);

  console.log('✅  Seed complete.\n');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('❌  Seed failed:', err.message);
  process.exit(1);
});
