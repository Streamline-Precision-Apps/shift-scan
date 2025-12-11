"use client";

import { Capacitor } from "@capacitor/core";
import { useTranslations } from "next-intl";
import { Browser } from "@capacitor/browser";

export default function PrivacyPolicy({
  isMobile = false,
}: {
  isMobile?: boolean;
}) {
  const t = useTranslations("PrivacyPolicy");
  const isNative = Capacitor.isNativePlatform();

  return (
    <>
      <div className="sticky top-0 rounded-t-2xl bg-white/98 backdrop-blur-sm border-b border-gray-200 p-3 md:p-4 z-10">
        <div className="text-center">
          <img
            src="/windows11/StoreLogo.scale-400.png"
            alt="Shift Scan Logo"
            className="h-16 w-auto mx-auto rounded-lg"
          />
          <h1 className="text-xl font-bold text-app-dark-blue ">
            {t("title")}
          </h1>
          <p className="text-app-dark-blue text-xs ">{t("lastUpdated")}</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="text-gray-700 space-y-4 text-sm">
          {/* --- Inserted new policy content here --- */}
          <p>{t("policyContent.Intro")}</p>
          <ul className="list-disc ml-4">
            <li>
              {t("policyContent.S0.1.1")}{" "}
              {isMobile && isNative ? (
                <button
                  className="text-app-dark-blue underline"
                  onClick={() =>
                    Browser.open({ url: "https://shiftscanapp.com" })
                  }
                  type="button"
                >
                  {t("policyContent.S0.1.2")}
                </button>
              ) : (
                <a
                  href="https://shiftscanapp.com"
                  className="text-app-dark-blue underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("policyContent.S0.1.2")}
                </a>
              )}
              {t("policyContent.S0.1.3")}
            </li>
            <li>{t("policyContent.S0.2.1")}</li>
            <li>{t("policyContent.S0.3.1")}</li>
            <li>{t("policyContent.S0.4.1")}</li>
          </ul>
          <p>
            {t("policyContent.S0.5.1")}{" "}
            {isMobile && isNative ? (
              <button
                className="text-app-dark-blue underline"
                onClick={() =>
                  Browser.open({ url: "mailto:support@shiftscan.com" })
                }
                type="button"
              >
                {t("policyContent.S0.5.2")}
              </button>
            ) : (
              <a
                href="mailto:support@shiftscan.com"
                className="text-app-dark-blue underline"
              >
                {t("policyContent.S0.5.2")}
              </a>
            )}
          </p>

          <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
            {t("policyContent.S0.6.1")}
          </h2>
          <p>{t("policyContent.S0.7.1")}</p>
          <ul className="list-disc ml-4">
            <li>
              <b> {t("policyContent.S0.8.1")}</b> {t("policyContent.S0.8.2")}
            </li>
            <li>
              <b> {t("policyContent.S0.9.1")}</b> {t("policyContent.S0.9.2")}
            </li>
            <li>
              <b> {t("policyContent.S0.10.1")}</b> {t("policyContent.S0.10.2")}
            </li>
            <li>
              <b> {t("policyContent.S0.11.1")}</b> {t("policyContent.S0.11.2")}
            </li>
            <li>
              {" "}
              <b> {t("policyContent.S0.12.1")}</b> {t("policyContent.S0.12.2")}
            </li>
            <li>
              <b> {t("policyContent.S0.13.1")}</b> {t("policyContent.S0.13.2")}
            </li>
            <li>
              <b> {t("policyContent.S0.14.1")}</b> {t("policyContent.S0.14.2")}
            </li>
            <li>
              <b> {t("policyContent.S0.15.1")}</b> {t("policyContent.S0.15.2")}
            </li>
          </ul>

          <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
            {t("policyContent.Toc.title")}
          </h2>
          <ol className="list-decimal ml-4">
            <li>
              <a href="#section-1" className="text-app-dark-blue underline">
                {t("policyContent.Toc.1")}
              </a>
            </li>
            <li>
              <a href="#section-2" className="text-app-dark-blue underline">
                {t("policyContent.Toc.2")}
              </a>
            </li>
            <li>
              <a href="#section-3" className="text-app-dark-blue underline">
                {t("policyContent.Toc.3")}
              </a>
            </li>
            <li>
              <a href="#section-4" className="text-app-dark-blue underline">
                {t("policyContent.Toc.4")}
              </a>
            </li>
            <li>
              <a href="#section-5" className="text-app-dark-blue underline">
                {t("policyContent.Toc.5")}
              </a>
            </li>
            <li>
              <a href="#section-6" className="text-app-dark-blue underline">
                {t("policyContent.Toc.6")}
              </a>
            </li>
            <li>
              <a href="#section-7" className="text-app-dark-blue underline">
                {t("policyContent.Toc.7")}
              </a>
            </li>
            <li>
              <a href="#section-8" className="text-app-dark-blue underline">
                {t("policyContent.Toc.8")}
              </a>
            </li>
            <li>
              <a href="#section-9" className="text-app-dark-blue underline">
                {t("policyContent.Toc.9")}
              </a>
            </li>
            <li>
              <a href="#section-10" className="text-app-dark-blue underline">
                {t("policyContent.Toc.10")}
              </a>
            </li>
            <li>
              <a href="#section-11" className="text-app-dark-blue underline">
                {t("policyContent.Toc.11")}
              </a>
            </li>
            <li>
              <a href="#section-12" className="text-app-dark-blue underline">
                {t("policyContent.Toc.12")}
              </a>
            </li>
          </ol>

          {/* --- Section 1: WHAT INFORMATION DO WE COLLECT? --- */}
          <section id="section-1">
            <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
              {t("policyContent.S1.title")}
            </h2>
            <p className="font-semibold">{t("policyContent.S1.content.1")}</p>
            <p>I{t("policyContent.S1.content.2")}</p>
            <p>{t("policyContent.S1.content.3")}</p>
            <p>{t("policyContent.S1.content.4")}</p>
            <ul className="list-disc ml-4">
              <li>{t("policyContent.S1.content.5.1")}</li>
              <li>{t("policyContent.S1.content.5.2")}</li>
              <li>{t("policyContent.S1.content.5.3")}</li>
              <li>{t("policyContent.S1.content.5.4")}</li>
              <li>{t("policyContent.S1.content.5.5")}</li>
              <li>{t("policyContent.S1.content.5.6")}</li>
              <li>{t("policyContent.S1.content.5.7")}</li>
              <li>{t("policyContent.S1.content.5.8")}</li>
            </ul>
            <p>
              <b>{t("policyContent.S1.content.6.1")}</b>{" "}
              {t("policyContent.S1.content.6.2")}
            </p>
            <p className="font-semibold">{t("policyContent.S1.content.7")}</p>
            <p>{t("policyContent.S1.content.8")}</p>
            <p>
              <b>{t("policyContent.S1.content.9.1")}</b>{" "}
              {t("policyContent.S1.content.9.2")}
            </p>
            <p>
              <b>{t("policyContent.S1.content.10.1")}</b>{" "}
              {t("policyContent.S1.content.10.2")}
            </p>
            <p>
              <b>{t("policyContent.S1.content.11.1")}</b>{" "}
              {t("policyContent.S1.content.11.2")}
            </p>
            <p>
              <b>{t("policyContent.S1.content.12.1")}</b>{" "}
              {t("policyContent.S1.content.12.2")}
            </p>
            <p>{t("policyContent.S1.content.13")}</p>
            <p>{t("policyContent.S1.content.14")}</p>
            <p className="font-semibold">{t("policyContent.S1.content.15")}</p>
            <p>{t("policyContent.S1.content.16")}</p>
            <p>{t("policyContent.S1.content.17")}</p>
            <p>{t("policyContent.S1.content.18")}</p>
            <p>{t("policyContent.S1.content.19")}</p>
            <ul className="list-disc ml-4">
              <li>
                <b>{t("policyContent.S1.content.20.1")}</b>{" "}
                {t("policyContent.S1.content.20.2")}
              </li>
              <li>
                <b>{t("policyContent.S1.content.21.1")}</b>{" "}
                {t("policyContent.S1.content.21.2")}
              </li>
              <li>
                <b>{t("policyContent.S1.content.22.1")}</b>{" "}
                {t("policyContent.S1.content.22.2")}
              </li>
            </ul>
            <p>
              <b>{t("policyContent.S1.content.23.1")}</b>{" "}
              {t("policyContent.S1.content.23.2")}
            </p>
          </section>

          {/* --- Section 2: HOW DO WE PROCESS YOUR INFORMATION? --- */}
          <section id="section-2">
            <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
              {t("policyContent.S2.title")}
            </h2>
            <p>{t("policyContent.S2.content.1")}</p>
            <p>{t("policyContent.S2.content.2")}</p>
            <ul className="list-disc ml-4">
              <li>{t("policyContent.S2.content.3")}</li>
              <li>{t("policyContent.S2.content.4")}</li>
              <li>{t("policyContent.S2.content.5")}</li>
              <li>{t("policyContent.S2.content.6")}</li>
              <li>{t("policyContent.S2.content.7")}</li>
              <li>{t("policyContent.S2.content.8")}</li>
              <li>{t("policyContent.S2.content.9")}</li>
              <li>{t("policyContent.S2.content.10")}</li>
              <li>{t("policyContent.S2.content.11")}</li>
              <li>{t("policyContent.S2.content.12")}</li>
              <li>{t("policyContent.S2.content.13")}</li>
              <li>{t("policyContent.S2.content.14")}</li>
              <li>{t("policyContent.S2.content.15")}</li>
              <li>{t("policyContent.S2.content.16")}</li>
            </ul>
          </section>

          {/* --- Section 3: WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION? --- */}
          <section id="section-3">
            <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
              {t("policyContent.S3.title")}
            </h2>
            <p>{t("policyContent.S3.content.1")}</p>
            <p>{t("policyContent.S3.content.2")}</p>
            <ul className="list-disc ml-4">
              <li>
                <b> {t("policyContent.S3.content.3.1")}</b>{" "}
                {t("policyContent.S3.content.3.2")}
              </li>
              <li>
                <b> {t("policyContent.S3.content.4.1")}</b>{" "}
                {t("policyContent.S3.content.4.2")}
              </li>
              <li>
                <b> {t("policyContent.S3.content.5.1")}</b>{" "}
                {t("policyContent.S3.content.6.2")}
              </li>
              <li>
                <b> {t("policyContent.S3.content.7.1")}</b>{" "}
                {t("policyContent.S3.content.7.2")}
              </li>
            </ul>
          </section>

          {/* --- Section 4: COOKIES AND TRACKING --- */}
          <section id="section-4">
            <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
              {t("policyContent.S4.title")}
            </h2>
            <p>{t("policyContent.S4.content.1")}</p>
            <p>{t("policyContent.S4.content.2")}</p>
            <p>{t("policyContent.S4.content.3")}</p>
            <p>{t("policyContent.S4.content.4")}</p>
            <p>{t("policyContent.S4.content.5")}</p>
          </section>

          {/* --- Section 5: DATA RETENTION --- */}
          <section id="section-5">
            <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
              {t("policyContent.S5.title")}
            </h2>
            <p>{t("policyContent.S5.content.1")}</p>
            <p>{t("policyContent.S5.content.2")}</p>
            <p>{t("policyContent.S5.content.3")}</p>
          </section>

          {/* --- Section 6: DATA SECURITY --- */}
          <section id="section-6">
            <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
              {t("policyContent.S6.title")}
            </h2>
            <p>{t("policyContent.S6.content.1")}</p>
            <p>{t("policyContent.S6.content.2")}</p>
          </section>

          {/* --- Section 7: PRIVACY RIGHTS --- */}
          <section id="section-7">
            <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
              {t("policyContent.S7.title")}
            </h2>
            <p>{t("policyContent.S7.content.1")}</p>
            <p>
              <b>{t("policyContent.S7.content.2.1")}</b>{" "}
              {t("policyContent.S7.content.2.2")}
            </p>
            <p>{t("policyContent.S7.content.3")}</p>
            <p>
              <b>{t("policyContent.S7.content.4.1")}</b>{" "}
              {t("policyContent.S7.content.4.2")}
            </p>
            <p className="font-semibold">{t("policyContent.S7.content.5")}</p>
            <ul className="list-disc ml-4">
              <li>{t("policyContent.S7.content.6")}</li>
              <li>{t("policyContent.S7.content.7")}</li>
              <li>{t("policyContent.S7.content.8")}</li>
              <li>{t("policyContent.S7.content.9")}</li>
            </ul>
            <p>{t("policyContent.S7.content.10")}</p>
            <p>
              <b>{t("policyContent.S7.content.11.1")}</b>{" "}
              {t("policyContent.S7.content.11.2")}
            </p>
            <p>
              {t("policyContent.S7.content.12.1")}{" "}
              {isMobile && isNative ? (
                <button
                  className="text-app-dark-blue underline"
                  onClick={() =>
                    Browser.open({ url: "mailto:support@shiftscan.com" })
                  }
                  type="button"
                >
                  {t("policyContent.S7.content.12.2")}
                </button>
              ) : (
                <a
                  href="mailto:support@shiftscan.com"
                  className="text-app-dark-blue underline"
                >
                  {t("policyContent.S7.content.12.2")}
                </a>
              )}
            </p>
          </section>

          {/* --- Section 8: DO-NOT-TRACK --- */}
          <section id="section-8">
            <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
              {t("policyContent.S8.title")}
            </h2>
            <p>{t("policyContent.S8.content.1")}</p>
            <p>{t("policyContent.S8.content.2")}</p>
          </section>

          {/* --- Section 9: US RESIDENTS' RIGHTS & TABLE --- */}
          <section id="section-9">
            <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
              {t("policyContent.S9.title")}
            </h2>
            <p>{t("policyContent.S9.content.1")}</p>

            <div className="overflow-x-auto my-4">
              <table className="min-w-full border text-xs">
                <thead>
                  <tr className="bg-app-dark-blue text-white border border-black">
                    <th className="border border-black px-2 py-1">
                      {t("policyContent.S9.content.Table.TH.1")}
                    </th>
                    <th className="border border-black px-2 py-1">
                      {t("policyContent.S9.content.Table.TH.2")}
                    </th>
                    <th className="border border-black px-2 py-1">
                      {t("policyContent.S9.content.Table.TH.3")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.A.1")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.A.2")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.A.3")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.B.1")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.B.2")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.B.3")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.C.1")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.C.2")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.C.3")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.D.1")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.D.2")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.D.3")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.E.1")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.E.2")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.E.3")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.F.1")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.F.2")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.F.3")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.G.1")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.G.2")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.G.3")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.H.1")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.H.2")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.H.3")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.I.1")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.I.2")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.I.3")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.J.1")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.J.2")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.J.3")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.K.1")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.K.2")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.K.3")}
                    </td>
                  </tr>

                  <tr>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.L.1")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.L.2")}
                    </td>
                    <td className="border px-2 py-1">
                      {t("policyContent.S9.content.Table.TB.L.3")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* --- The rest of the policy continues as in your provided text, with sections 10, 11, 12, etc. --- */}
          <section id="section-10">
            <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
              {t("policyContent.S10.title")}
            </h2>
            <p>{t("policyContent.S10.content.1")}</p>
            <p>{t("policyContent.S10.content.2")}</p>
          </section>

          <section id="section-11">
            <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
              {t("policyContent.S11.title")}
            </h2>
            <p>
              {t("policyContent.S11.content.1.1")}{" "}
              <a
                href="mailto:support@shiftscan.com"
                className="text-app-dark-blue underline"
              >
                {t("policyContent.S11.content.1.2")}
              </a>{" "}
              {t("policyContent.S11.content.1.3")}
            </p>
            <p>
              {t("policyContent.S11.content.2.1")}
              <br />
              {t("policyContent.S11.content.2.2")}
              <br />
              {t("policyContent.S11.content.2.3")}
              <br />
              {t("policyContent.S11.content.2.4")}
            </p>
          </section>

          <section id="section-12">
            <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
              {t("policyContent.S12.title")}
            </h2>
            <p>
              {t("policyContent.S12.content.1.1")}{" "}
              {isMobile && isNative ? (
                <button
                  className="text-app-dark-blue underline"
                  onClick={() =>
                    Browser.open({
                      url: "https://shiftscanapp.com/privacy-policy/dsa-request",
                    })
                  }
                  type="button"
                >
                  {t("policyContent.S12.content.1.2")}
                </button>
              ) : (
                <a
                  href={`/privacy-policy/dsa-request?returnUrl=${
                    isMobile ? "/v1/hamburger/privacyPolicy" : "/"
                  }`}
                  className="text-app-dark-blue underline"
                >
                  {t("policyContent.S12.content.1.2")}
                </a>
              )}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
