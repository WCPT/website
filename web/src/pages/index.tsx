import React from "react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { MdOpenInNew, MdPlayCircleOutline } from "react-icons/md";
import { differenceInMonths, format } from "date-fns";
import cx from "classnames";

import { Navbar } from "../components/Navigation";
import { VideoModal, SocialMedia, Image } from "../components/Elements";
import { useExtendedContent, useModal, useSocialLinks } from "../hooks";
import { Footer } from "../components/Footer";

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
  events: Array<{
    id: string | number;
    type?: string;
    title: string;
    date: string;
    duration: string;
    registrationUrl?: string;
    registrationDeadline?: string;
  }>;
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

      // Sort by date (descending) and only return 3
      events: [
        {
          id: 1,
          type: "Workshop",
          title: "Advanced Excel - Generate Report Sheets and Graphs",
          date: "2022-07-13T03:30:00.000Z",
          duration: "3.30 - 5.30PM / 17 May - 13 July 2022",
          registrationUrl: "",
        },
      ],
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
  intro,
  stats,
  events,
}) => {
  const socialLinks = useSocialLinks();

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
        <StatsSection
          engagements={stats.engagements}
          participants={stats.participants}
          registered={stats.registered}
          lifetimeInMonths={stats.lifetimeInMonths}
        />
        <EventsSection events={events} />
        <ContactSection
          socialLinks={{
            facebook: socialLinks.facebook,
            twitter: socialLinks.twitter,
            youtube: socialLinks.youtube,
            email: socialLinks.email,
          }}
        />
      </main>

      <Footer />
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
        fixed
        overlayed
        backgroundCover
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
            <div className="flex justify-center">
              <div
                className="group cursor-pointer inline-flex justify-center items-center py-2 px-4 w-60 sm:w-full text-skin-inverted-muted border border-gray-200 hover:border-blue-600 hover:bg-blue-600 transition-all duration-200"
                onClick={openModal}
              >
                <MdPlayCircleOutline className="-ml-1 mr-2 text-xl" />
                <span className="group-hover:text-white text-lg transition-all duration-200">
                  Watch short video
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <a
                className="group cursor-pointer inline-flex justify-center items-center py-2 px-4 w-60 sm:w-full text-skin-inverted-muted border border-gray-200 hover:border-blue-600 hover:bg-blue-600 transition-all duration-200"
                href={signUpLink}
                target="_blank"
                rel="noreferrer"
              >
                <span className="mr-2 group-hover:text-white text-lg transition-all duration-200">
                  Join our community
                </span>
                <MdOpenInNew className="text-xl" />
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

const IntroSection: React.FC<{
  title: string;
  excerpt: string;
  body: string;
}> = ({ title, excerpt, body }) => {
  const { ref, isVisible, toggle } = useExtendedContent();

  return (
    <section ref={ref} className="relative py-16 sm:py-20 bg-skin-base">
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

const StatsSection: React.FC<{
  engagements: string | number;
  registered: string | number;
  participants: string | number;
  lifetimeInMonths: string | number;
}> = ({ engagements, registered, participants, lifetimeInMonths }) => {
  return (
    <section className="relative lg:pt-12 bg-skin-secondary">
      <div className="pt-24 pb-44 bg-skin-secondary">
        <div className="2xl:container mx-auto px-8 sm:px-12">
          <div className="flex flex-col justify-center items-center mb-20">
            <h1 className="sm:mb-8 max-w-2xl text-center text-2xl sm:text-3xl md:text-4xl leading-snug md:leading-snug text-skin-base font-light">
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
      <span className="my-4 text-4xl md:text-5xl md:font-normal text-skin-primary">
        {stat}
      </span>
      <span className="max-w-xs text-2xl leading-normal font-light text-skin-base">
        {text}
      </span>
    </div>
  );
};

const EventsSection: React.FC<{
  events: Array<{
    id: string | number;
    type?: string;
    title: string;
    date: Date | string;
    duration: string;
    registrationUrl?: string;
    registrationDeadline?: string;
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
            <span className="text-lg font-mono tracking-wider text-skin-inverted">
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
          <div className="z-10 grid lg:grid-cols-3 grid-rows-1 gap-4 text-gray-600 overflow-hidden">
            {events.map((event, i) => (
              <EventCard key={i} {...event} href={`/events/${event.id}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const EventCard: React.FC<{
  className?: string;
  type?: string;
  title: string;
  date: Date | string;
  duration: string;
  href: string;
  registrationUrl?: string;
  registrationDeadline?: string;
}> = ({
  className,
  type,
  title,
  date: dateProp,
  duration,
  href,
  registrationDeadline,
}) => {
  const date = React.useMemo(
    () => (typeof dateProp === "string" ? new Date(dateProp) : dateProp),
    [dateProp]
  );

  return (
    <a
      href={href}
      className={cx(
        "group flex flex-col py-8 lg:py-12 2xl:py-16 px-10 2xl:px-12 text-skin-inverted border border-skin-inverted-muted cursor-pointer transition-all duration-200 ease-linear hover:bg-gray-900 hover:border-gray-900 hover:shadow-xl",
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

const ContactSection: React.FC<{
  socialLinks: {
    facebook: string;
    twitter: string;
    youtube: string;
    email: string;
  };
}> = ({ socialLinks }) => {
  return (
    <section className="relative py-12 sm:py-12 bg-white">
      <div className="xl:container mx-auto py-16 px-8 sm:px-12 flex flex-col">
        <h2 className="z-10 font-sans font-black text-3xl sm:text-4xl tracking-tight text-gray-900">
          <span className="block">Want to get in touch?</span>
          <span className="block bg-clip-text text-skin-primary">
            Reach us through social media or email us!
          </span>
        </h2>
        <div className="z-10 mt-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
          <SocialMedia
            themeStyle={2}
            links={{
              facebook: socialLinks.facebook,
              twitter: socialLinks.twitter,
              youtube: socialLinks.youtube,
              email: socialLinks.email,
            }}
          />
        </div>
      </div>
    </section>
  );
};
