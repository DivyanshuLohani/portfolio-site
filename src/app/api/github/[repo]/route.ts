import { getRepositoryData } from "@/lib/github";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { repo: string } }
) {
  const data = await getRepositoryData(params.repo);

  return NextResponse.json(data);
}
