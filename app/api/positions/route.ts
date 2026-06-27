import { NextResponse } from "next/server";
import { getPositions } from "../../../lib/positions";

export async function GET() {
  try {
    const positions = await getPositions();

    return NextResponse.json({
      ok: true,
      positions,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}