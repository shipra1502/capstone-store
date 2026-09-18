// scripts/test-hash.mjs
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const hash = process.env.DISPATCHER_PASSWORD_HASH;
console.log("Hash from env:", JSON.stringify(hash));
console.log("Hash length:", hash?.length);

const result = await bcrypt.compare("YourNewPassword123", hash);
console.log("Match result:", result);
