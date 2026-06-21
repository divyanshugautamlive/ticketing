import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "dev-key-12345678901234567890123456789012";
const HASH_SALT = process.env.HASH_SALT || "dev-salt-123";

// Ensure we get a valid 32-byte key buffer
let keyBuffer: Buffer;
if (ENCRYPTION_KEY.length === 64) {
  keyBuffer = Buffer.from(ENCRYPTION_KEY, "hex");
} else {
  keyBuffer = Buffer.from(ENCRYPTION_KEY.padEnd(32, "0")).slice(0, 32);
}

/**
 * Encrypt sensitive data (email, phone, passport, etc.)
 */
export function encrypt(plaintext: string): string {
  if (!plaintext) return "";
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, iv);

  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");

  // Return iv:encrypted for storage
  return `${iv.toString("hex")}:${encrypted}`;
}

/**
 * Decrypt sensitive data
 */
export function decrypt(encryptedData: string): string {
  if (!encryptedData) return "";
  try {
    const [ivHex, encryptedHex] = encryptedData.split(":");
    if (!ivHex || !encryptedHex) return encryptedData; // fallback if not encrypted format
    const iv = Buffer.from(ivHex, "hex");

    const decipher = crypto.createDecipheriv("aes-256-cbc", keyBuffer, iv);

    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error);
    return encryptedData; // fallback on error
  }
}

/**
 * Hash sensitive data (one-way, for comparison or indexing)
 */
export function hashSensitiveData(data: string): string {
  if (!data) return "";
  return crypto
    .createHash("sha256")
    .update(data + HASH_SALT)
    .digest("hex");
}
