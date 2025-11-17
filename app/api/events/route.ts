// import { Event } from "@/app/database";
import Event from "@/app/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json(
        { messsage: "Invalid JSON data format" },
        { status: 500 }
      );
    }

    const createdEvent = await Event.create(event);

    return NextResponse.json({
      message: "Event created successfully",
      event: createdEvent,
    }, {status: 201});
  } catch (e) { 
    console.error(e);
    return NextResponse.json(
      {
        mess: "Event Creation Failed",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: 500 }
    );
  }
}
