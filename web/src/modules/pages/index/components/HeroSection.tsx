import React from "react";
import { MdOpenInNew, MdPlayCircleOutline } from "react-icons/md";

import { useModal } from "@/hooks";
import { Image, VideoModal } from "@/components/Elements";
import Blueocean from "../assets/blueocean.jpeg";

export const HeroSection: React.FC<{
  title: string;
  header: string;
  signUpLink: string;
  signInLink: string;
  videoURL: string;
}> = ({ title, header, signUpLink, signInLink, videoURL }) => {
  const [isOpen, openModal, closeModal] = useModal(false);

  return (
    <div className="relative h-screen min-h-[640px] overflow-hidden">
      <Image
        fixed
        backgroundCover
        priority
        className="object-center"
        overlayed="opacity-10 bg-black"
        placeholder="blur"
        src={Blueocean}
        alt="Blue ocean"
        credit="Photo by Hoodh Ahmed on Unsplash"
      />

      <VideoModal
        url={videoURL}
        openModal={openModal}
        closeModal={closeModal}
        isOpen={isOpen}
      />

      <div className="flex h-full xl:container mx-auto">
        <div className="mx-auto lg:mx-0 flex flex-col items-center lg:items-start justify-center px-12 text-center lg:text-left">
          {/* For mobile */}
          <div className="block sm:hidden">
            <h1 className="pb-4 text-[1.8rem] leading-snug text-center text-skin-inverted">
              {title}
            </h1>

            <h2 className="mb-4 font-light text-[1.2rem] leading-snug opacity-90 text-skin-inverted">
              {header}
            </h2>
          </div>

          {/* For tablet and desktop */}
          <div className="hidden sm:block sm:w-[500px] lg:w-[520px]">
            <h2 className="mb-4 font-serif font-light text-[2.5rem] leading-snug text-skin-inverted">
              {header}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:flex sm:flex-row my-4">
            <div className="flex justify-center group">
              <div
                className="cursor-pointer inline-flex justify-center items-center py-2 px-4 w-60 sm:w-full text-skin-inverted-muted border border-blue-600 bg-blue-600"
                onClick={openModal}
              >
                <MdPlayCircleOutline className="-ml-1 mr-2 text-xl text-gray-200 group-hover:text-white" />
                <span className="text-gray-200 group-hover:text-white">
                  Watch short video
                </span>
              </div>
            </div>

            <div className="flex justify-center group">
              <a
                className="cursor-pointer inline-flex justify-center items-center py-2 px-4 w-60 sm:w-full text-skin-inverted-muted border border-gray-200 group-hover:border-white"
                href={signUpLink}
                target="_blank"
                rel="noreferrer"
              >
                <span className="mr-2 text-gray-200 group-hover:text-white">
                  Join our community
                </span>
                <MdOpenInNew className="text-xl group-hover:text-white" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center mt-6 sm:my-2 text-skin-inverted-muted text-lg">
            <span className="sm:mr-2 font-thin">Already a member?</span>
            <a
              href={signInLink}
              className="underline underline-offset-4 text-skin-accent font-thin transition-all"
            >
              Sign in here!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
