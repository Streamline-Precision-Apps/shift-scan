"use client";

import { useTranslations } from "next-intl";
import { Contents } from "../../components/(reusable)/contents";
import { Grids } from "../../components/(reusable)/grids";
import { Holds } from "../../components/(reusable)/holds";
import { Images } from "../../components/(reusable)/images";
import { TitleBoxes } from "../../components/(reusable)/titleBoxes";
import { Titles } from "../../components/(reusable)/titles";
import { Capacitor } from "@capacitor/core";
import PrivacyPolicy from "@/app/privacy-policy/privacy-policy";

export default function PrivacyPolicyMobile() {
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
          <PrivacyPolicy isMobile={true} />
        </Holds>
      </Grids>
    </Contents>
  );
}
