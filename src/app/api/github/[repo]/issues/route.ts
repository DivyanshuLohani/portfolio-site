// cretae the endpoint for creating the issues

import { createIssue } from "@/lib/github";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { repo: string } }
) {
  const { title, body } = await request.json();
  if (!title || !body) return NextResponse.json({ error: "Missing fields" });
  const data = await createIssue(params.repo, title, body);
  return NextResponse.json(data);
}
