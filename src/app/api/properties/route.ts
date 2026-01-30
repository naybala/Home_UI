import { NextRequest, NextResponse } from "next/server";
import { PropertyService } from "@/features/properties/api/properties.service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  try {
    const data = await PropertyService.getProperties(searchParams);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Property Proxy Error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: error.message === "Unauthorized" ? 401 : 500 },
    );
  }
}
