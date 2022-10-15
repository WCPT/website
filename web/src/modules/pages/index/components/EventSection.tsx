import React from "react";
import cx from "classnames";
import { BsArrowRightCircle } from "react-icons/bs";

import { Image } from "@/components/Elements";
import GlobeImage from "../assets/globe.jpeg";

export const EventsSection: React.FC<{
  events: Array<{
    id: string | number;
    slug: string;
    type: string;
    title: string;
    dates: string;
    year: number;
  }>;
}> = ({ events }) => {
  return (
    <section className="relative py-12 sm:py-16 sm:pb-36">
      <Image
        backgroundCover
        overlayed="opacity-80 bg-skin-primary"
        alt="Connected globe"
        src={GlobeImage}
        placeholder="blur"
        credit="Background vector created by liuzishan on freepik.com"
        creditHref="https://www.freepik.com/vectors/background"
      />
      <div className="xl:container mx-auto">
        <div className="flex flex-col mb-12 lg:mb-0 px-8 sm:px-12">
          <div className="z-10 flex flex-col my-16 max-w-lg">
            <span className="text-lg tracking-wider text-skin-inverted-muted">
              #WCPTevents
            </span>
            <h1 className="mt-1 mb-2 sm:mb-4 text-2xl sm:text-3xl md:text-4xl text-skin-inverted">
              Upcoming Events
            </h1>
            <span className="text-lg text-skin-inverted-muted">
              Join us in our virtual events. We carry out workshops and meetups
              that you can virtually join from anywhere.
            </span>
          </div>
          <div className="z-10 grid lg:grid-cols-3 grid-rows-1 gap-12 lg:gap-8 xl:gap-12 2xl:gap-16 text-gray-600 overflow-hidden">
            {events.map((event, i) => (
              <EventCard key={i} {...event} href={`/events/${event.slug}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const EventCard: React.FC<{
  className?: string;
  type: string;
  title: string;
  excerpt?: string;
  dates: string;
  year: number;
  href: string;
}> = ({ className, type, title, excerpt, dates, year, href }) => {
  return (
    <a
      href={href}
      className={cx(
        "group flex flex-col rounded-md overflow-hidden",
        className
      )}
    >
      <div className="relative flex justify-between py-8 px-10 border-b border-solid text-skin-inverted bg-[#0988ab]/60 group-hover:bg-skin-primary-muted transition-colors duration-200">
        <div className="flex flex-col">
          <span className="text-2xl 2xl:text-3xl font-semibold">{dates}</span>
          <span className="text-lg uppercase tracking-widest">{year}</span>
          <div className="absolute bottom-0 translate-y-1/2 py-2 px-3 rounded-md drop-shadow-md text-skin-base bg-white">
            <span className="font-bold text-skin-muted tracking-wider">
              {type}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full p-10 bg-skin-base">
        <div className="flex flex-col leading-snug">
          <span className="text-lg xl:text-xl font-bold mb-4 group-hover:text-skin-primary transition-colors duration-200">
            {title}
          </span>

          {excerpt && (
            <div className="lg:hidden xl:block text-lg leading-snug text-skin-muted">
              {excerpt}
            </div>
          )}
        </div>

        <div className="flex items-center mt-auto pt-8 2xl:pt-12 gap-2 text-skin-muted group-hover:text-skin-primary transition-colors duration-200">
          <span>View details</span>
          <BsArrowRightCircle className="text-3xl" />
        </div>
      </div>
    </a>
  );
};

export default EventsSection;
