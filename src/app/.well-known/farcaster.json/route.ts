import { PROJECT_TITLE } from "~/lib/constants";

export async function GET() {
  const appUrl =
    process.env.NEXT_PUBLIC_URL ||
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;

  const config = {
    accountAssociation: {
      header: "eyJmaWQiOjg2OTk5OSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDc2ZDUwQjBFMTQ3OWE5QmEyYkQ5MzVGMUU5YTI3QzBjNjQ5QzhDMTIifQ",
      payload: "eyJkb21haW4iOiJwb255b25nbWktYnJpZ2h0c3Vuc2V0YXBwLnZlcmNlbC5hcHAifQ",
      signature: "MHgwOWI2MTlmMTEyODc3ZWE0YTU3MTg3MzhiYTUyZjUwZTE5NmFlOWQyZjI1NDA3MGNhMGJkMTIzY2Y0NmY5N2VkN2Q0Njg4NTdhMTRhYjc2YThlZGEyZjMyZTYwYmY3MmZiOWQ2NTZhYTRiM2RmNzEyODE4Yjc0Y2FmYTQ1OWVmMzFi",
    },
    frame: {
      version: "1",
      name: "Goobie Game",
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/og.png`,
      buttonTitle: "Open",
      webhookUrl: `${appUrl}/api/webhook`,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#555555",
      primaryCategory: "games",
      tags: ["game", "interactive", "fun", "mini-app", "farcaster"],
    },
  };

  return Response.json(config);
}
