/**
 * Admin Setup Script
 * Run this script to promote an existing user to admin role.
 * 
 * Usage:
 *   node make_admin.js <email>
 *
 * Example:
 *   node make_admin.js admin@example.com
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel');

const email = process.argv[2];

if (!email) {
    console.error('❌ Usage: node make_admin.js <email>');
    console.error('   Example: node make_admin.js admin@example.com');
    process.exit(1);
}

async function promoteToAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB Atlas');

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            console.error(`❌ No user found with email: ${email}`);
            process.exit(1);
        }

        if (user.role === 'admin') {
            console.log(`ℹ️  User "${user.name}" is already an admin.`);
        } else {
            user.role = 'admin';
            await user.save();
            console.log(`🎉 Success! "${user.name}" (${user.email}) is now an ADMIN.`);
        }

        mongoose.connection.close();
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

promoteToAdmin();
