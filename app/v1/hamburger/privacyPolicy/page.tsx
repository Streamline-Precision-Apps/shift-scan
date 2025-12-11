"use client";
import "@/app/globals.css";
import { Bases } from "@/app/v1/components/(reusable)/bases";

import PrivacyPolicyMobile from "./privacyPolicy";

export default function PrivacyPolicyPage() {
  return (
    <Bases>
      <PrivacyPolicyMobile />
    </Bases>
  );
}
