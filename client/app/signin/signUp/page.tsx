"use client";
import "@/app/globals.css";
import { useEffect, useState, Suspense } from "react";

import { z } from "zod";

import { useRouter, useSearchParams } from "next/navigation";
import { EnterAccountInfo } from "@/app/v1/components/(signup)/EnterAccountInfo";
import ResetPassword from "@/app/v1/components/(signup)/resetPassword";
import NotificationSettings from "@/app/v1/components/(signup)/notificationSettings";
import ProfilePictureSetup from "@/app/v1/components/(signup)/profilePictureSetup";
import SignatureSetup from "@/app/v1/components/(signup)/signatureSetup";
import { useUserStore } from "@/app/lib/store/userStore";
import { getApiUrl } from "@/app/lib/utils/api-Utils";

// Define Zod schema for validating props
const propsSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  accountSetup: z.boolean(),
});

// Validation logic
function validateProps(userId: string | null, accountSetup: string | null) {
  try {
    const parsed = propsSchema.parse({
      userId: userId || undefined,
      accountSetup: accountSetup === "true",
    });
    return { valid: true, data: parsed };
  } catch (error) {
    console.error("Invalid props:", error);
    return { valid: false, data: null };
  }
}

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const accountSetup = searchParams.get("accountSetup");
  const userName = searchParams.get("userName") || "";

  const validation = validateProps(userId, accountSetup);
  const isValid = validation.valid;

  const [step, setStep] = useState(1); // Always call useState
  const totalSteps = 6; // Total number of steps in the signup process
  const handleComplete = async () => {
    try {
      // Make a post route to finish user setup\
      const API_URL = getApiUrl();

      const res = await fetch(`${API_URL}/api/v1/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountSetup: true }),
      }).then((res) => res.json());

      if (res.success) {
        useUserStore.getState().setUser(res.data);
        return router.push("/v1");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Early return after hooks are declared
  if (!isValid) return <div>Error: Invalid props provided.</div>;

  return (
    <>
      {step === 1 && (
        <EnterAccountInfo
          userId={userId!}
          handleNextStep={handleNextStep}
          userName={userName}
          totalSteps={totalSteps}
          currentStep={step}
        />
      )}

      {step === 2 && (
        <ResetPassword
          userId={userId!}
          handleNextStep={handleNextStep}
          totalSteps={totalSteps}
          currentStep={step}
        />
      )}
      {step === 3 && (
        <NotificationSettings
          userId={userId!}
          handleNextStep={handleNextStep}
          totalSteps={totalSteps}
          currentStep={step}
        />
      )}
      {step === 4 && (
        <ProfilePictureSetup
          userId={userId!}
          handleNextStep={handleNextStep}
          totalSteps={totalSteps}
          currentStep={step}
        />
      )}

      {(step === 5 || step === 6) && (
        <SignatureSetup
          userId={userId!}
          handleNextStep={handleComplete}
          setStep={setStep}
          totalSteps={totalSteps}
          currentStep={step}
        />
      )}
    </>
  );
}

export default function SignUp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
