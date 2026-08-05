import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getSiteData, saveSiteData } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string; // "resume" | "avatar" | "banner"
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const isProductionDb = !!process.env.MONGODB_URI;
    
    const siteData = await getSiteData();
    if (!siteData.profile) {
      siteData.profile = {};
    }

    let urlPath = "";
    if (isProductionDb) {
      const mimeType = file.type || (type === "resume" ? "application/pdf" : "image/webp");
      const base64Data = buffer.toString("base64");
      urlPath = `data:${mimeType};base64,${base64Data}`;
    } else {
      const publicDir = path.join(process.cwd(), "public");
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }

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
      urlPath = `/${filename}`;
    }

    if (type === "avatar") {
      siteData.profile.avatarUrl = urlPath;
    } else if (type === "banner") {
      siteData.profile.bannerUrl = urlPath;
    } else {
      siteData.profile.resumeUrl = urlPath;
    }
    
    siteData.profile.lastUpdated = Date.now();
    await saveSiteData(siteData);
    
    return NextResponse.json({ success: true, path: urlPath });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
