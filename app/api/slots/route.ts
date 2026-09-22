import { NextResponse } from "next/server";
import { getSlots } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  const slots = getSlots();
  return NextResponse.json(slots);
}
