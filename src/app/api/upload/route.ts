import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string; // "resume" | "avatar" | "banner"
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let filename = "";
    if (type === "avatar") {
      filename = "profile-avatar.webp";
    } else if (type === "banner") {
      filename = "hero-banner.webp";
    } else {
      filename = "Mayank_Sahu_MERN_Stack.pdf";
    }

    const filePath = path.join(publicDir, filename);
    fs.writeFileSync(filePath, buffer);
    
    return NextResponse.json({ success: true, path: `/${filename}` });
  } catch {
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
