import React from "react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import NextImage from "next/image";
import { MdOpenInNew, MdPlayCircleOutline } from "react-icons/md";
import cx from "classnames";
import { differenceInMonths, format } from "date-fns";

import { Navbar } from "../components/Navigation";
import { Credit, VideoModal, SocialMedia, Image } from "../components/Elements";
import { useExtendedContent, useModal } from "../hooks";

import Blueocean from "../../public/blueocean.jpeg";
import SmilingFijianImage from "../../public/smiling-fijian.jpeg";
import StudentPortraitImage from "../../public/student-portrait.jpeg";
import SmilingStudentImage from "../../public/smiling-student.jpeg";
import IslanderStudentImage from "../../public/islander-student.jpeg";
import GlobeImage from "../../public/globe.jpg";

type IReturnProps = {
  title: string;
  header: string;
  signUpLink: string;
  signInLink: string;
  videoURL: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    youtube: string;
    email: string;
  };
  intro: {
    title: string;
    excerpt: string;
    body: string;
  };
  stats: {
    engagements: string | number;
    registered: string | number;
    participants: string | number;
    lifetimeInMonths: string | number;
  };
};

export const getServerSideProps: GetServerSideProps<
  IReturnProps
> = async () => {
  const launched = "2021-06-17T00:00:00.000Z";

  return {
    props: {
      title: "Wisdom Community of Pasifika Teachers",
      header: "Learning, sharing, connecting and moving forward together.",
      videoURL: "https://www.youtube.com/embed/zNp_l9RQSJk",
      signInLink: "https://online.fnu.ac.fj/course/view.php?id=3",
      signUpLink: "https://clte.fnu.ac.fj/talanoakaro",

      socialLinks: {
        facebook: "",
        twitter: "",
        youtube: "",
        email: "",
      },

      intro: {
        title:
          "Recalibrating Pacific education to empower our generations for global competency",
        excerpt: `We are a growing network of teachers of all levels from the
        wider Pacific region, with a common goal and the will to
        recalibrate Pacific education to optimise students’ learning
        outcomes and empower our generations for global competency and
        well-being. Reflecting the communal lifestyle of the Pacific, we
        work together, share and collaborate to solve problems, and
        conduct research to raise the quality of learning throughout the
        Pacific.`,
        body: `<p>
            Our work is guided by the Sustainable Development Goal 4
            (SDG4) and the Pacific Regional Education Framework (PacREF).
            As the Wisdom Community (WisCom) for teachers, we aspire to
            contribute and work towards achieving the SDG4 and PacREF 2030
            targets. Through our online communication and collaboration
            platform, ‘Please Talanoa Karo, Pasifika!’, our members engage
            in constructive discourse and reflect on topics of significant
            importance to teaching and learning in the Pacific context.
          </p>
          <p>
            We firmly believe in our members' professional growth and
            evolution; our continuing professional development niches span
            various topics, from learning design to teaching best
            practices to the classroom and beyond. Our professional
            development sessions enhance our members’ skills and knowledge
            for sustainable student learning outcomes. We also have
            established a trusted network of teaching experts who can
            guide community members with special needs and those in need,
            especially during an unexpected event or crisis.
          </p>
          <p>
            With the WisCom in place, we, the Pasifika Teachers, work and
            strive together to prosper and professionally grow by
            convening in a sustained way. If you are a Pasifika Teacher
            and yet to connect with us, we encourage you to register on
            our ‘Please Talanoa Karo, Pasifika!’ platform. Registration is
            free; just bring your Pacific Islander spirit! Join us, and
            let’s learn, share, connect and move forward together.
          </p>`,
      },

      stats: {
        engagements: "7000+",
        registered: "3140+",
        participants: "5186+",
        lifetimeInMonths: differenceInMonths(new Date(), new Date(launched)),
      },
    },
  };
};

const HomePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({
  title,
  header,
  videoURL,
  signUpLink,
  signInLink,
  socialLinks,
  intro,
  stats,
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar
        themeStyle={1}
        className="absolute top-0 z-10"
        itemsRight={
          <SocialMedia
            themeStyle={1}
            links={{
              facebook: socialLinks.facebook,
              twitter: socialLinks.twitter,
              youtube: socialLinks.youtube,
              email: socialLinks.email,
            }}
          />
        }
      />

      <main>
        <HeroSection
          title={title}
          header={header}
          videoURL={videoURL}
          signUpLink={signUpLink}
          signInLink={signInLink}
        />
        <IntroSection
          title={intro.title}
          excerpt={intro.excerpt}
          body={intro.body}
        />
        <StatSection
          engagements={stats.engagements}
          participants={stats.participants}
          registered={stats.registered}
          lifetimeInMonths={stats.lifetimeInMonths}
        />
        <EventsSection events={[]} />
      </main>

      <footer></footer>
    </div>
  );
};

export default HomePage;

const HeroSection: React.FC<{
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
        overlayed
        backgroundCover
        layout="fill"
        objectFit="cover"
        objectPosition="50% 0%"
        placeholder="blur"
        priority
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

      <div className="flex h-full container mx-auto">
        <div className="mx-auto lg:mx-0 flex flex-col items-center lg:items-start justify-center px-12 sm:px-16 text-white text-center lg:text-left">
          {/* For mobile */}
          <div className="xs:hidden">
            <h1 className="pb-4 text-[1.8rem] leading-snug text-center">
              {title}
            </h1>

            <h2 className="mb-4 font-serif font-light text-[1.2rem] leading-snug opacity-90">
              {header}
            </h2>
          </div>

          {/* For tablet and desktop */}
          <div className="hidden xs:block sm:w-[500px] lg:w-[520px]">
            <h2 className="mb-4 font-serif font-light text-[2.5rem] leading-snug">
              {header}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:flex sm:flex-row my-4">
            <div className="flex justify-center">
              <div
                className="group cursor-pointer inline-flex justify-center items-center py-2 px-4 w-60 xs:w-full border border-gray-200 hover:border-blue-600 hover:bg-blue-600 transition-all duration-200"
                onClick={openModal}
              >
                <MdPlayCircleOutline className="-ml-1 mr-2 text-xl" />
                <span className="text-gray-200 group-hover:text-white text-lg transition-all duration-200">
                  Watch short video
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <a
                className="group cursor-pointer inline-flex justify-center items-center py-2 px-4 w-60 xs:w-full border border-gray-200 hover:border-blue-600 hover:bg-blue-600 transition-all duration-200"
                href={signUpLink}
                target="_blank"
                rel="noreferrer"
              >
                <span className="mr-2 text-gray-200 group-hover:text-white text-lg transition-all duration-200">
                  Join our community
                </span>
                <MdOpenInNew className="text-xl" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center mt-6 sm:my-2 text-gray-200 text-lg">
            <span className="sm:mr-2 font-thin">Already a member?</span>
            <a
              href={signInLink}
              className="hover:underline text-yellow-300 font-thin transition-all"
            >
              Sign in here!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const IntroSection: React.FC<{
  title: string;
  excerpt: string;
  body: string;
}> = ({ title, excerpt, body }) => {
  const { ref, isVisible, toggle } = useExtendedContent();

  return (
    <section ref={ref} className="relative py-16 sm:py-20 bg-white">
      <div className="xl:container mx-auto px-8 xs:px-12 sm:px-16">
        <div className="flex justify-center mb-8">
          <h1 className="font-serif xs:mb-8 max-w-3xl text-2xl xs:text-3xl md:text-4xl text-center leading-snug md:leading-snug text-gray-500">
            {title}
          </h1>
        </div>
        <div className="grid lmd:grid-cols-5 xl:grid-cols-2 gap-8">
          <div className="lmd:col-span-3 xl:col-span-1">
            <div className="prose max-w-none lg:pr-6 text-lg lg:text-xl text-gray-600">
              <p
                className="first-letter:text-5xl"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
              <div
                className={cx(
                  "opacity-0 xs:opacity-100 transition-opacity duration-300",
                  isVisible ? "block opacity-100" : "hidden xs:block"
                )}
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </div>

            <div className="block xs:hidden">
              <span
                className="inline-block px-2 py-1.5 xs:p-2 rounded-sm text-blue-500 border border-blue-500 cursor-pointer"
                onClick={toggle}
              >
                {isVisible ? "Show less" : "Show more"}
              </span>
            </div>
          </div>
          <div className="hidden relative lmd:grid xl:grid-cols-2 gap-4 auto-rows-min col-span-2 xl:col-span-1">
            <Image
              layout="responsive"
              objectFit="cover"
              src={SmilingFijianImage}
              alt="Smiling student"
              placeholder="blur"
              credit="Vijeshwar Datt on Unsplash"
              creditHref="https://vijeshdatt.com/"
            />
            <div className="relative hidden xl:inline top-[10%]">
              <Image
                layout="responsive"
                objectFit="cover"
                src={StudentPortraitImage}
                alt="Smiling student"
                placeholder="blur"
                credit="Vijeshwar Datt on Unsplash"
                creditHref="https://vijeshdatt.com/"
              />
            </div>
            <div className="relative lg:hidden xl:inline">
              <Image
                layout="responsive"
                objectFit="cover"
                src={SmilingStudentImage}
                alt="Smiling student"
                placeholder="blur"
                credit="Vijeshwar Datt on Unsplash"
                creditHref="https://vijeshdatt.com/"
              />
            </div>
            <div className="relative hidden lg:inline xl:top-[10%]">
              <Image
                layout="responsive"
                objectFit="cover"
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

const StatSection: React.FC<{
  engagements: string | number;
  registered: string | number;
  participants: string | number;
  lifetimeInMonths: string | number;
}> = ({ engagements, registered, participants, lifetimeInMonths }) => {
  return (
    <section className="relative lg:pt-12">
      <div className="pt-24 pb-44 bg-shaded">
        <div className="2xl:container mx-auto px-8 xs:px-12 sm:px-16">
          <div className="flex flex-col justify-center items-center mb-20">
            <h1 className="xs:mb-8 max-w-2xl text-center text-2xl xs:text-3xl md:text-4xl leading-snug md:leading-snug text-gray-700 font-light">
              We are an active, growing community in the wider Pacific region
            </h1>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-y-16 lg:px-32 xl:px-0">
            <Stat
              className="xl:border-r border-gray-300"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-2 h-20 w-20 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.9"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
              stat={engagements}
              text="Engagements to connect, create and collaborate"
            />
            <Stat
              className="xl:border-r border-gray-300"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-2 h-20 w-20 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.9"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              }
              stat={registered}
              text="Registered members from across the Pacific region"
            />
            <Stat
              className="xl:border-r border-gray-300"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-2 h-20 w-20 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.9"
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              }
              stat={participants}
              text="Participants in professional development events"
            />
            <Stat
              className=""
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-2 h-20 w-20 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.9"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              stat={lifetimeInMonths}
              text={`We are ${lifetimeInMonths} ${
                lifetimeInMonths > 1 ? "months" : "month"
              } old`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat: React.FC<{
  icon: React.ReactNode;
  stat: string | number;
  text: string;
  className?: string;
}> = ({ icon, stat, text, className }) => {
  return (
    <div
      className={cx(
        `flex flex-col items-center px-6 xl:px-8 text-center`,
        className
      )}
    >
      {icon}
      <span className="my-4 text-4xl md:text-5xl md:font-normal text-accent">
        {stat}
      </span>
      <span className="max-w-xs text-2xl leading-normal font-light text-gray-900">
        {text}
      </span>
    </div>
  );
};

const EventsSection: React.FC<{
  events: Array<{
    type: string;
    title: string;
    date: Date;
    duration: string;
    order: number;
    registrationDeadline: string;
    slug: string;
  }>;
}> = ({ events }) => {
  return (
    <section className="relative py-12 xs:py-16 sm:pb-36">
      <NextImage
        layout="fill"
        objectFit="cover"
        objectPosition="50% 0%"
        src={GlobeImage}
        alt="Connected world"
      />
      {/* <Image
        containerClassName="absolute inset-0"
        overlayClassName="z-10 opacity-80 bg-accent"
        alt="Vector image depicting a connected globe"
        src={GlobeImage}
        layout="fill"
        objectFit="cover"
        objectPosition="0% 0%"
        placeholder="blur"
        credit="Background vector created by liuzishan on freepik.com"
        creditLink="https://www.freepik.com/vectors/background"
      /> */}
      <div className="xl:container mx-auto">
        <div className="flex flex-col mb-12 lg:mb-0 px-8 xs:px-12 sm:px-16">
          <div className="z-10 flex flex-col my-16 max-w-lg text-white">
            <span className="text-lg font-mono tracking-wider">
              #WCPTevents
            </span>
            <h1 className="mt-1 mb-2 xs:mb-4 text-2xl xs:text-3xl md:text-4xl text-white">
              Upcoming Events
            </h1>
            <span className="text-lg opacity-90">
              Join us in our virtual events. We carry out workshops and meetups
              that you can virtually join from anywhere.
            </span>
          </div>
          <div className="z-10 grid lg:grid-cols-3 grid-rows-1 gap-4 text-gray-600 overflow-hidden">
            {events.map((event, i) => (
              <EventCard key={i} {...event} href={event.slug} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const EventCard: React.FC<{
  className?: string;
  type: string | null;
  title: string;
  date: Date;
  duration: string;
  href: string;
  registrationDeadline: string | null;
}> = ({
  className,
  type,
  title,
  date,
  duration,
  href,
  registrationDeadline,
}) => {
  return (
    <a
      href={href}
      className={cx(
        "group flex flex-col py-8 lg:py-12 2xl:py-16 px-10 2xl:px-12 text-gray-100 border border-gray-300 cursor-pointer transition-all duration-200 ease-linear hover:bg-gray-900 hover:border-gray-900 hover:shadow-xl",
        className
      )}
    >
      <span className="text-4xl 2xl:text-5xl font-light leading-tight tracking-wide">
        {format(date, "dd")}
      </span>
      <span className="2xl:text-lg uppercase tracking-widest">
        {format(date, "MMMM")}
      </span>
      <span className="mt-8 2xl:mt-12 mb-6 2xl:mb-8 text-xl 2xl:text-2xl leading-snug font-light">
        {type && `${type} -`} {title}
      </span>
      <div className="flex flex-col mt-auto mb-2 text-lg 2xl:text-xl font-light leading-snug">
        <span>{duration}</span>
        {registrationDeadline && <span>{registrationDeadline}</span>}
        <span className="font-normal text-base xl:text-lg group-hover:underline">
          View details
        </span>
      </div>
    </a>
  );
};
