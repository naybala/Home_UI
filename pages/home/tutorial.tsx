import React from "react";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { useTranslation } from "next-i18next";

interface TimelineEvent {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
}

export default function tutorial() {
  const { t } = useTranslation("common");

  const events: (TimelineEvent & { index: number })[] = [
    {
      status: "Step One",
      date: "instruction",
      icon: "pi pi-spin pi-cog",
      image: "/images/place-holder-ph.jpg",
      index: 0,
    },
    {
      status: "Step Two",
      date: "instruction",
      icon: "pi pi-spin pi-cog",
      image: "/images/place-holder-ph.jpg",
      index: 1,
    },
    {
      status: "Step Three",
      date: "instruction",
      icon: "pi pi-spin pi-cog",
      image: "/images/place-holder-ph.jpg",
      index: 2,
    },
    {
      status: "Step Four",
      date: "instruction",
      icon: "pi pi-spin pi-cog",
      image: "/images/place-holder-ph.jpg",
      index: 3,
    },
  ];

  const customizedMarker = (item: TimelineEvent) => {
    return (
      <span className="flex w-10 h-10 items-center justify-center  border-circle z-1 shadow-md dark:shadow-white">
        <i
          className={`${item.icon} text-lg rounded-lg text-black dark:text-white p-2`}
        ></i>
      </span>
    );
  };

  const customizedContent = (item: TimelineEvent & { index: number }) => {
    const isEven = item.index % 2 === 0;

    return (
      <Card
        title={item.status}
        subTitle={item.date}
        className="dark:text-white text-black dark:bg-gray-900 bg-white"
      >
        <div
          className={`flex flex-col md:flex-row ${
            isEven ? "md:flex-row" : "md:flex-row-reverse"
          } items-center gap-4`}
        >
          {item.image && (
            <Image
              src={`${item.image}`}
              alt={item.image}
              width="500"
              className="shadow-1"
              preview
            />
          )}
          <p className="text-left">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate neque quas!
          </p>
        </div>
      </Card>
    );
  };

  return (
    <>
      <section id="tutorial" style={{ minHeight: "100vh", paddingTop: "10px" }}>
        <h5 className="text-3xl font-bold mb-12 dark:text-white text-center">
          {t("app-tutorial")}
        </h5>
        <div className="card max-w-7xl mx-auto">
          <Timeline
            value={events}
            align="alternate"
            className="customized-timeline"
            marker={customizedMarker}
            content={customizedContent}
          />
        </div>
      </section>
    </>
  );
}
