import { NextRequest, NextResponse } from "next/server";
import { PropertyService } from "@/features/properties/api/properties.service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const data = await PropertyService.getPropertyDetail(id);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Property Detail Proxy Error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: error.message === "Unauthorized" ? 401 : 500 },
    );
  }
}
