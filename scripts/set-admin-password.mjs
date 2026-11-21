import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import fs from "node:fs";

// Load environment variables natively in Node.js from .env.local and .env
for (const envFile of [".env.local", ".env"]) {
  if (fs.existsSync(envFile)) {
    try {
      if (typeof process.loadEnvFile === "function") {
        process.loadEnvFile(envFile);
      } else {
        const content = fs.readFileSync(envFile, "utf-8");
        for (const line of content.split("\n")) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          const eqIdx = trimmed.indexOf("=");
          if (eqIdx !== -1) {
            const key = trimmed.slice(0, eqIdx).trim();
            let val = trimmed.slice(eqIdx + 1).trim();
            if (
              (val.startsWith('"') && val.endsWith('"')) ||
              (val.startsWith("'") && val.endsWith("'"))
            ) {
              val = val.slice(1, -1);
            }
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      }
    } catch {
      // safe fallback
    }
  }
}

const uri =
  process.env.MONGODB_URI ||
  process.env.mongodb ||
  process.env.DATABASE_URL ||
  "mongodb://127.0.0.1:27017/mayank_portfolio";

const sanitizedUri = uri
  ? uri.replace(/\/\/[^@]+@/, "//***:***@")
  : "unknown";

// Password can be passed via command line argument:
// node scripts/set-admin-password.mjs <new_password> [email]
// Or picked up from ADMIN_SEED_PASSWORD in .env
const argPassword = process.argv[2];
const argEmail = process.argv[3];

const targetEmail = (
  argEmail ||
  process.env.ADMIN_SEED_EMAIL ||
  "admin@example.com"
)
  .trim()
  .toLowerCase();

const targetPassword =
  argPassword || process.env.ADMIN_SEED_PASSWORD;

if (!targetPassword) {
  console.error(
    "\n[Error] No password provided!\n" +
      "Usage:\n" +
      "  node scripts/set-admin-password.mjs <new_password> [email]\n" +
      "Or define ADMIN_SEED_PASSWORD in your .env file.\n"
  );
  process.exit(1);
}

if (targetPassword.length < 8) {
  console.error(
    "\n[Error] Password must be at least 8 characters long for security.\n"
  );
  process.exit(1);
}

async function main() {
  console.log(`[Admin Password] Connecting to ${sanitizedUri}...`);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log(`[Admin Password] Connected successfully.`);
    const db = client.db("mayank_portfolio");

    const now = new Date();
    const passwordHash = await bcrypt.hash(targetPassword, 12);

    const existingAdmin = await db
      .collection("admin_users")
      .findOne({ email: targetEmail });

    let adminId = existingAdmin?.id;

    if (!existingAdmin) {
      adminId = randomUUID();
      await db.collection("admin_users").insertOne({
        id: adminId,
        email: targetEmail,
        name: "Administrator",
        passwordHash,
        role: "ADMIN",
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });
      console.log(
        `[Admin Password] Admin account created for: ${targetEmail}`
      );
    } else {
      await db.collection("admin_users").updateOne(
        { email: targetEmail },
        {
          $set: {
            passwordHash,
            isActive: true,
            updatedAt: now,
          },
        }
      );
      console.log(
        `[Admin Password] Password successfully updated in DB for: ${targetEmail}`
      );
    }

    // Invalidate old sessions for this admin to enforce fresh login with the new password
    if (adminId) {
      const deleteResult = await db
        .collection("sessions")
        .deleteMany({ adminUserId: adminId });
      console.log(
        `[Admin Password] Cleared ${deleteResult.deletedCount} active session(s) to enforce re-login.`
      );
    }

    console.log(`\n[Success] Password changed successfully for ${targetEmail}!`);
    console.log(`You can now log in at /cms/login with your updated credentials.\n`);
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error(`\n[Admin Password Error] Failed to update password in DB: ${errMsg}`);
    if (
      errMsg.includes("tlsv1 alert internal error") ||
      errMsg.includes("SSL alert")
    ) {
      console.error(
        "\n[MongoDB Atlas Tip] SSL Alert 80: Your IP address is not whitelisted in MongoDB Atlas.\n" +
          "Go to MongoDB Atlas -> Network Access -> Add IP Address -> Allow Access From Anywhere (0.0.0.0/0) or your current IP.\n"
      );
    }
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();
