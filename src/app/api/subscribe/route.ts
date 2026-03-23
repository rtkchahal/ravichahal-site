import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "src/data/subscribers.json");

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Read existing subscribers
    let subscribers: string[] = [];
    try {
      const raw = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
      subscribers = JSON.parse(raw);
    } catch {
      subscribers = [];
    }

    // Check for duplicate
    if (subscribers.includes(email.toLowerCase())) {
      return NextResponse.json(
        { error: "You're already subscribed!" },
        { status: 409 }
      );
    }

    // Add new subscriber
    subscribers.push(email.toLowerCase());
    await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));

    return NextResponse.json(
      { success: true, message: "You're in! Check your inbox." },
      { status: 201 }
    );
  } catch (err) {
    console.error("[subscribe] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
