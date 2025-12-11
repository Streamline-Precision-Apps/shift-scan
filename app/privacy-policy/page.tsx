"use client";

import PrivacyPolicy from "./privacy-policy";

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-app-gradient bg-to-br from-app-dark-blue via-app-blue to-app-blue px-4 py-8 md:py-0 md:max-h-screen flex flex-col items-center justify-center">
      {/* Animated Gradient Background Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-app-dark-blue via-app-blue to-app-blue animate-gradient-move opacity-80" />
        <div className="absolute left-1/2 top-1/4 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-app-blue opacity-20 rounded-full blur-3xl" />
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-app-blue opacity-10 rounded-full blur-2xl" />
      </div>
      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          {/* Sticky Header */}

          {/* Scrollable Content */}
          <PrivacyPolicy isMobile={false} />

          {/* Sticky Footer */}
          <div className="sticky bottom-0 bg-white/98 backdrop-blur-sm border-t border-gray-200 p-4 z-10">
            <div className="text-center">
              <a
                href="/"
                className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
