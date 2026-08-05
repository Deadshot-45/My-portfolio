import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/data/site-data.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json(JSON.parse(fileContent));
  } catch {
    return NextResponse.json({ error: "Failed to read site data file" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const filePath = path.join(process.cwd(), "src/data/site-data.json");
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to write site data file" }, { status: 500 });
  }
}
