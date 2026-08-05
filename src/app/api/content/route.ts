import { NextResponse } from "next/server";
import { getSiteData, saveSiteData } from "@/lib/db";

export async function GET() {
  try {
    const data = await getSiteData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to read site data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await saveSiteData(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to write site data" }, { status: 500 });
  }
}
