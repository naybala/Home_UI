"use client";

import React from "react";
import { Carousel } from "primereact/carousel";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { Button } from "primereact/button";

export default function appUi() {
  const { t } = useTranslation("common");

  const items = [
    {
      id: 1,
      src: "/images/place-holder-ph.jpg",
      alt: "App Ui Image 1",
      priority: true,
    },
    { id: 2, src: "/images/place-holder-ph.jpg", alt: "App Ui Image 2" },
    { id: 3, src: "/images/place-holder-ph.jpg", alt: "App Ui Image 3" },
    { id: 4, src: "/images/place-holder-ph.jpg", alt: "App Ui Image 4" },
    { id: 5, src: "/images/place-holder-ph.jpg", alt: "App Ui Image 5" },
    { id: 6, src: "/images/place-holder-ph.jpg", alt: "App Ui Image 6" },
    { id: 7, src: "/images/place-holder-ph.jpg", alt: "App Ui Image 7" },
  ];

  const itemTemplate = (item: {
    src: string;
    alt: string;
    priority?: boolean;
  }) => (
    <div className="flex justify-center px-5">
      <Image
        src={item.src}
        alt={item.alt}
        width={300}
        height={200}
        className="rounded shadow-md h-auto w-auto"
        priority={item.priority === true}
      />
    </div>
  );

  return (
    <section id="app-ui">
      {/* Header */}
      <h5 className="text-3xl font-bold mb-12 dark:text-white text-center">
        {t("app-ui")}
      </h5>
      <div className="max-w-7xl mx-auto pt-4 px-4">
        <div className="">
          <Carousel
            value={items}
            numVisible={5}
            numScroll={1}
            itemTemplate={itemTemplate}
            className="custom-carousel w-full"
            circular
            autoplayInterval={3000}
            showNavigators={false}
          />
        </div>
      </div>
    </section>
  );
}
