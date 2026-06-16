import type { Metadata } from "next";
import AlertPreviewPage from "@/app/page.client";

export const metadata: Metadata = {
  description:
    "Configure and style premium Formula 1 telemetry overlay alerts for Kick, Twitch, and YouTube streams.",
  title: "Race Control Studio - Custom Kick Stream Overlay Alerts",
};

export default function Page() {
  return <AlertPreviewPage />;
}
