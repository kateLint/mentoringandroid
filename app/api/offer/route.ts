import { NextResponse } from "next/server";
import { getOffer, saveOffer } from "@/lib/storage";
import { Offer } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const offer = getOffer();
  return NextResponse.json(offer);
}

export async function PUT(request: Request) {
  try {
    const body: Partial<Offer> = await request.json();
    const current = getOffer();
    const updated: Offer = {
      ...current,
      ...body,
      // Recalculate discount if prices change
      discountPercentage:
        body.originalPrice && body.currentPrice
          ? Math.round(((body.originalPrice - body.currentPrice) / body.originalPrice) * 100)
          : current.discountPercentage,
    };
    saveOffer(updated);
    return NextResponse.json({ success: true, offer: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update offer" }, { status: 500 });
  }
}
