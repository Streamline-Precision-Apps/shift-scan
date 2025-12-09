"use client";

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-app-gradient bg-to-br from-app-dark-blue via-app-blue to-app-blue px-4 py-8 md:py-0 md:max-h-screen flex flex-col items-center justify-center">
      {/* Animated Gradient Background Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-app-dark-blue via-app-blue to-app-blue animate-gradient-move opacity-80" />
        <div className="absolute left-1/2 top-1/4 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-app-blue opacity-20 rounded-full blur-3xl" />
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-app-blue opacity-10 rounded-full blur-2xl" />
      </div>

      {/* Privacy Policy Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 space-y-8 md:space-y-6">
          <div className="text-center mb-8">
            <img
              src="/windows11/StoreLogo.scale-400.png"
              alt="Shift Scan Logo"
              className="h-16 w-auto mx-auto mb-4 rounded-lg"
            />
            <h1 className="text-2xl font-bold text-app-dark-blue mb-2">
              ShiftScan Inc. – Privacy Policy
            </h1>
            <p className="text-gray-600">Effective Date: December 08, 2025</p>
          </div>
          <div className="text-gray-700 space-y-4 text-sm max-h-[400px] overflow-y-auto px-2">
            <p>
              ShiftScan Inc. (“ShiftScan,” “we,” “our,” or “us”) is committed to
              protecting the privacy of our users. This Privacy Policy explains
              how we collect, use, disclose, and protect your information when
              you use the ShiftScan mobile app, website, and related services
              (collectively, the “Service”). By using the Service, you agree to
              the practices described in this Privacy Policy.
            </p>
            <h2 className="font-semibold text-app-dark-blue mb-2">
              1. Information We Collect
            </h2>
            <ul className="list-disc ml-4">
              <li>
                <b>Personal Information:</b> Name, email address, phone number,
                employee ID, profile details.
              </li>
              <li>
                <b>Authentication Information:</b> Email + password (securely
                hashed), Google or Apple authentication data.
              </li>
              <li>
                <b>Location Information:</b> GPS location at clock-in/out,
                jobsite geolocation, background location (if enabled). Location
                is tracked only for timekeeping and jobsite verification.
              </li>
              <li>
                <b>Jobsite & Work Information:</b> Timecard entries, equipment
                logs, vehicle/trailer check-ins, jobsite visit history,
                photos/documents uploaded for inspections, safety reports, or
                forms.
              </li>
              <li>
                <b>Device Information:</b> Device model, OS version, IP address,
                app usage logs, error/crash data.
              </li>
              <li>
                <b>Payment Information:</b> Payment data (if applicable) is
                processed securely by third-party processors; we do not store
                full credit card numbers.
              </li>
              <li>
                <b>Analytics Information:</b> App interactions, performance
                data, aggregated statistics. Analytics data is anonymized where
                possible.
              </li>
            </ul>
            <h2 className="font-semibold text-app-dark-blue mb-2">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc ml-4">
              <li>Verify employee identity</li>
              <li>Track time accurately</li>
              <li>Determine jobsite attendance</li>
              <li>Provide payroll and HR reporting</li>
              <li>Maintain equipment and jobsite logs</li>
              <li>Improve app performance and functionality</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Provide customer support</li>
              <li>Process payments</li>
              <li>Comply with legal and safety requirements</li>
            </ul>
            <p>We never sell user data.</p>
            <h2 className="font-semibold text-app-dark-blue mb-2">
              3. How We Share Information
            </h2>
            <p>
              We do not sell or rent your information. We may share information
              only with:
            </p>
            <ul className="list-disc ml-4">
              <li>
                <b>Payroll and HR Departments:</b> For accurate timekeeping and
                employee reporting.
              </li>
              <li>
                <b>Authorized Company Administrators:</b> Supervisors, managers,
                or administrators within your organization.
              </li>
              <li>
                <b>Service Providers:</b> Trusted third parties for hosting
                (AWS), authentication, analytics, error logging, payment
                processing. Providers may only use your data to perform services
                on our behalf.
              </li>
              <li>
                <b>Legal Requirements:</b> If required by law or to protect
                rights and safety.
              </li>
            </ul>
            <h2 className="font-semibold text-app-dark-blue mb-2">
              4. GPS & Location Tracking
            </h2>
            <p>
              GPS data is used for jobsite clock-in verification, timecard
              accuracy, location-specific safety forms, jobsite visit tracking,
              and preventing fraudulent check-ins. We do not use GPS for
              marketing, unrelated tracking, or selling to third parties.
              Location access can be disabled, but some features may not
              function.
            </p>
            <h2 className="font-semibold text-app-dark-blue mb-2">
              5. Data Retention
            </h2>
            <p>
              Data is retained only as long as necessary to provide the Service,
              meet legal/accounting/safety requirements, and support payroll/HR
              needs. Timecard and jobsite data may be retained for compliance.
            </p>
            <h2 className="font-semibold text-app-dark-blue mb-2">
              6. Data Security
            </h2>
            <ul className="list-disc ml-4">
              <li>AWS secure hosting</li>
              <li>Encrypted data transmission (HTTPS)</li>
              <li>Secure password hashing</li>
              <li>Access controls and permissions</li>
              <li>Regular security audits</li>
              <li>Device and server monitoring</li>
            </ul>
            <p>
              While no system is fully secure, we take all reasonable steps to
              protect your information.
            </p>
            <h2 className="font-semibold text-app-dark-blue mb-2">
              7. Your Rights and Choices
            </h2>
            <p>
              Depending on your location, you may have the right to access,
              correct, or delete your information, opt out of certain uses,
              withdraw consent, or file a complaint. Contact us at{" "}
              <a
                href="mailto:support@shiftscan.com"
                className="text-app-blue underline"
              >
                support@shiftscan.com
              </a>{" "}
              for requests.
            </p>
            <h2 className="font-semibold text-app-dark-blue mb-2">
              8. Children’s Privacy
            </h2>
            <p>
              ShiftScan is not intended for individuals under 13. We do not
              knowingly collect data from children.
            </p>
            <h2 className="font-semibold text-app-dark-blue mb-2">
              9. International Data Transfers
            </h2>
            <p>
              Data may be stored and processed in the United States (AWS) or
              other regions where our providers operate. We follow applicable
              laws for international transfers.
            </p>
            <h2 className="font-semibold text-app-dark-blue mb-2">
              10. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. The updated
              version will be posted with a new “Effective Date.” Continued use
              of the Service indicates acceptance of the updated policy.
            </p>
            <h2 className="font-semibold text-app-dark-blue mb-2">
              11. Contact Us
            </h2>
            <p>
              If you have questions, concerns, or requests regarding your
              privacy, contact us:
              <br />
              Streamline Precision LLC
              <br />
              Email:{" "}
              <a
                href="mailto:support@shiftscan.com"
                className="text-app-blue underline"
              >
                support@shiftscan.com
              </a>
              <br />
              Address:
            </p>
          </div>
          <div className="mt-4 text-center">
            <a
              href="/"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
