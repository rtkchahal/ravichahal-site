import { NextRequest, NextResponse } from "next/server";

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

    // Subscribe via Buttondown API
    const res = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
      },
      body: JSON.stringify({
        email_address: email.toLowerCase(),
        type: "regular",
      }),
    });

    if (res.status === 201) {
      return NextResponse.json(
        { success: true, message: "You're in! Check your inbox." },
        { status: 201 }
      );
    }

    const data = await res.json();
    const detail = JSON.stringify(data).toLowerCase();

    if (detail.includes("already") || detail.includes("duplicate")) {
      return NextResponse.json(
        { error: "You're already subscribed!" },
        { status: 409 }
      );
    }

    if (detail.includes("blocked") || detail.includes("firewall")) {
      // Buttondown firewall can block disposable/suspicious emails
      return NextResponse.json(
        { error: "Please use a valid email address." },
        { status: 400 }
      );
    }

    if (res.ok) {
      return NextResponse.json(
        { success: true, message: "You're in! Check your inbox." },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  } catch (err) {
    console.error("[subscribe] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
