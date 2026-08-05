import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    
    // Ensure public folder exists
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(publicDir, "Mayank_Sahu_MERN_Stack.pdf");
    fs.writeFileSync(filePath, buffer);
    
    return NextResponse.json({ success: true, path: "/Mayank_Sahu_MERN_Stack.pdf" });
  } catch {
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
