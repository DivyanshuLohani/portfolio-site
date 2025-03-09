import { getUserStats } from "@/lib/github";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getUserStats();
  return NextResponse.json(data);
}
