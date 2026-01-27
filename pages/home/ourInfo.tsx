"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function ourInfo() {
  const { t } = useTranslation("common");

  return (
    <section id="our-info" style={{ minHeight: "100vh", paddingTop: "10px" }}>
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Header */}
          <h5 className="text-3xl font-bold mb-12 dark:text-white">
            {t("our-info")}
          </h5>

          <div className="bg-white dark:bg-gray-900 p-10 rounded-lg shadow-lg dark:shadow-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
              {/* Payment Info Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 flex flex-col items-end text-right">
                <div className="flex space-x-3 mb-4">
                  <Image
                    src="/images/kpay.png"
                    alt="KBZ Pay"
                    width={50}
                    height={50}
                  />
                  <Image
                    src="/images/wavemoney.jpg"
                    alt="Wave Money"
                    width={50}
                    height={50}
                  />
                  <Image
                    src="/images/ayapay.jpg"
                    alt="AYA Pay"
                    width={50}
                    height={50}
                  />
                </div>

                <p className="text-xl font-semibold dark:text-white">
                  09 763 684 400
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  Name – Nay Ba La
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  လတ်မှတ်ကြေးပေးရန် Account
                </p>

                <div className="flex space-x-3 mt-4">
                  <Image
                    src="/images/viber.png"
                    alt="Viber"
                    width={45}
                    height={45}
                  />
                  <Image
                    src="/images/telegram.png"
                    alt="Telegram"
                    width={45}
                    height={45}
                  />
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
                  လတ်မှတ်ကြေးပေးပြီးပါက app မှာ အသုံးပြုလိုပါက <br />
                  Viber/Telegram ကို ဆက်သွယ်ပေးပါ။
                </p>
              </div>

              {/* Center Phone Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/place-holder-ph.jpg"
                  alt="App Screenshot"
                  width={260}
                  height={500}
                  className="rounded-xl shadow-md"
                />
              </div>

              {/* Guide Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-10">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/images/section_two_little_phone.jpg"
                    alt="Register"
                    width={50}
                    height={100}
                  />
                  <div className="text-left">
                    <h4 className="text-lg font-semibold dark:text-white">
                      Register ဖြည့်ရန်
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      CM App account မှတ်ပုံတင်ရန် အကောင့်ဖွင့်ပါ။
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Image
                    src="/images/section_two_little_phone.jpg"
                    alt="User Guide"
                    width={50}
                    height={100}
                  />
                  <div className="text-left">
                    <h4 className="text-lg font-semibold dark:text-white">
                      User Guide
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      CM App အသုံးပြုပုံကို သိရန် ကြည့်ပါ။
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
