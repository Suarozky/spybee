import { NextResponse } from "next/server";
import { DATA } from "../../../constans/data";

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    if (!DATA) {
      throw new Error("Products not found");
    }

    return NextResponse.json(DATA);
  } catch (error) {
    return NextResponse.json({ error: error}, { status: 500 });
  }
}
