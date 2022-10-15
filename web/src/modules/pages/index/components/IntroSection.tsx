import React from "react";
import cx from "classnames";

import { useExtendedContent } from "@/hooks";
import { Image } from "@/components/Elements";
import SmilingFijianImage from "../assets/smiling-fijian.jpeg";
import StudentPortraitImage from "../assets/student-portrait.jpeg";
import SmilingStudentImage from "../assets/smiling-student.jpeg";
import IslanderStudentImage from "../assets/islander-student.jpeg";

export const IntroSection: React.FC<{
  title: string;
  excerpt: string;
  body: string;
}> = ({ title, excerpt, body }) => {
  const { ref, isVisible, toggle } = useExtendedContent();

  return (
    <section ref={ref} className="relative py-16 sm:py-20 bg-skin-base">
      {/* <Image
        backgroundCover
        className="object-center"
        overlayed="opacity-10 bg-black"
        placeholder="blur"
        src={LearnImage}
        alt="Blue ocean"
        credit="Photo by Hoodh Ahmed on Unsplash"
      /> */}

      <div className="xl:container mx-auto px-8 sm:px-12">
        <div className="flex justify-center mb-8">
          <h1 className="font-serif sm:mb-8 max-w-3xl text-2xl sm:text-3xl md:text-4xl text-center leading-snug md:leading-snug text-skin-muted">
            {title}
          </h1>
        </div>
        <div className="grid lmd:grid-cols-5 xl:grid-cols-2 gap-8">
          <div className="lmd:col-span-3 xl:col-span-1">
            <div className="prose prose-p:leading-normal max-w-none lg:pr-6 text-lg lg:text-xl text-skin-base">
              <p
                className="first-letter:text-5xl"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
              <div
                className={cx(
                  "opacity-0 sm:opacity-100 transition-opacity duration-300",
                  isVisible ? "block opacity-100" : "hidden sm:block"
                )}
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </div>

            <div className="block sm:hidden">
              <span
                className="inline-block px-2 py-1.5 sm:p-2 rounded-sm text-blue-500 border border-blue-500 cursor-pointer"
                onClick={toggle}
              >
                {isVisible ? "Show less" : "Show more"}
              </span>
            </div>
          </div>
          <div className="hidden relative lmd:grid xl:grid-cols-2 gap-4 auto-rows-min col-span-2 xl:col-span-1">
            <Image
              src={SmilingFijianImage}
              alt="Smiling student"
              placeholder="blur"
              credit="Vijeshwar Datt on Unsplash"
              creditHref="https://vijeshdatt.com/"
            />
            <div className="relative hidden xl:inline top-[10%]">
              <Image
                src={StudentPortraitImage}
                alt="Smiling student"
                placeholder="blur"
                credit="Vijeshwar Datt on Unsplash"
                creditHref="https://vijeshdatt.com/"
              />
            </div>
            <div className="relative lg:hidden xl:inline">
              <Image
                src={SmilingStudentImage}
                alt="Smiling student"
                placeholder="blur"
                credit="Vijeshwar Datt on Unsplash"
                creditHref="https://vijeshdatt.com/"
              />
            </div>
            <div className="relative hidden lg:inline xl:top-[10%]">
              <Image
                src={IslanderStudentImage}
                alt="Smiling student"
                placeholder="blur"
                credit="Vijeshwar Datt on Unsplash"
                creditHref="https://vijeshdatt.com/"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
