"use client";
import "@/app/globals.css";
import { Bases } from "@/app/v1/components/(reusable)/bases";
import PrivacyPolicy from "./privacyPolicy";

export default function PrivacyPolicyPage() {
  return (
    <Bases>
      <PrivacyPolicy />
    </Bases>
  );
}
