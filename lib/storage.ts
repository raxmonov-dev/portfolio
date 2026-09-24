import { randomBytes } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

const ALLOWED_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

const MAX_BYTES = 5 * 1024 * 1024;

export type StoredFile = {
  url: string;
  filename: string;
  mimeType: string;
  size: number;
};

export interface StorageAdapter {
  save(file: File): Promise<StoredFile>;
}

class LocalStorageAdapter implements StorageAdapter {
  async save(file: File): Promise<StoredFile> {
    const extension = ALLOWED_TYPES.get(file.type);
    if (!extension) {
      throw new StorageError("Unsupported image type. Use JPG, PNG, WEBP or GIF.");
    }
    if (file.size > MAX_BYTES) {
      throw new StorageError("Image must be under 5MB.");
    }

    const filename = `${Date.now()}-${randomBytes(6).toString("hex")}.${extension}`;
    const directory = path.join(process.cwd(), "public", "uploads");
    await mkdir(directory, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(directory, filename), buffer);

    const stored = {
      url: `/uploads/${filename}`,
      filename,
      mimeType: file.type,
      size: file.size,
    };

    await prisma.media.create({
      data: stored,
    });

    return stored;
  }
}

export class StorageError extends Error {
  status = 400;
  constructor(message: string) {
    super(message);
    this.name = "StorageError";
  }
}

export const storage: StorageAdapter = new LocalStorageAdapter();
