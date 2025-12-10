"use client";

import { useTranslations } from "next-intl";
import { Contents } from "../../components/(reusable)/contents";
import { Grids } from "../../components/(reusable)/grids";
import { Holds } from "../../components/(reusable)/holds";
import { Images } from "../../components/(reusable)/images";
import { TitleBoxes } from "../../components/(reusable)/titleBoxes";
import { Titles } from "../../components/(reusable)/titles";
import { Capacitor } from "@capacitor/core";

export default function PrivacyPolicy() {
  const t = useTranslations("Hamburger-Policy");
  const ios = Capacitor.getPlatform() === "ios";
  const android = Capacitor.getPlatform() === "android";
  return (
    <Contents>
      <Grids
        rows={"7"}
        cols={"1"}
        gap={"5"}
        className={
          ios
            ? "pt-12 h-full w-full"
            : android
            ? "pt-4 h-full w-full"
            : "h-full w-full"
        }
      >
        <Holds
          background={"white"}
          size={"full"}
          className="row-start-1 row-end-2 h-full "
        >
          <TitleBoxes>
            <Holds position={"row"} className="w-full justify-center gap-x-2 ">
              <Titles size={"lg"}>{t("PrivacyPolicy")}</Titles>
              <Images
                titleImg="/key.svg"
                titleImgAlt="Key Icon"
                className=" max-w-6 h-auto object-contain"
              />
            </Holds>
          </TitleBoxes>
        </Holds>
        <Holds background={"white"} className=" row-start-2 row-end-8 h-full ">
          <div
            className={
              "h-full flex flex-col justify-center items-center overflow-y-scroll px-2 py-10 "
            }
          >
            <section className="text-sm text-gray-700 space-y-4 pt-5">
              <p className="text-xs text-gray-500">{t("lastUpdated")}</p>
              <h2 className="font-semibold text-app-dark-blue mb-2 mt-4">
                {t("introTitle")}
              </h2>
              <p>{t("introText")}</p>

              <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
                {t("summaryTitle")}
              </h2>
              <ul className="list-disc ml-4 space-y-2">
                <li>{t("summaryPoint1")}</li>
                <li>{t("summaryPoint2")}</li>
                <li>{t("summaryPoint3")}</li>
              </ul>

              <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
                {t("infoTitle")}
              </h2>
              <ul className="list-disc ml-4 space-y-2">
                <li>{t("infoPersonal")}</li>
                <li>{t("infoDevice")}</li>
                <li>{t("infoPermissions")}</li>
                <li>{t("infoNotifications")}</li>
              </ul>

              <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
                {t("processingTitle")}
              </h2>
              <ul className="list-disc ml-4 space-y-2">
                <li>{t("processingPoint1")}</li>
                <li>{t("processingPoint2")}</li>
              </ul>

              <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
                {t("sharingTitle")}
              </h2>
              <ul className="list-disc ml-4 space-y-2">
                <li>{t("sharingPoint1")}</li>
                <li>{t("sharingPoint2")}</li>
              </ul>

              <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
                {t("cookiesTitle")}
              </h2>
              <p>{t("cookiesText")}</p>

              <h2 className="font-semibold text-app-dark-blue mb-2 mt-6">
                {t("contactTitle")}
              </h2>
              <p>{t("contactText")}</p>
            </section>
          </div>
        </Holds>
      </Grids>
    </Contents>
  );
}
