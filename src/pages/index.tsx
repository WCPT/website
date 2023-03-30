import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { differenceInMonths, format } from "date-fns";
import { BsArrowRightCircle, BsArrowRight } from "react-icons/bs";
import cx from "clsx";

import { useExtendedContent, useModal } from "@/hooks";
import { getEvents, getSiteConfig } from "@/lib";
import { getCourses } from "@/lib/courses";
import {
  Image,
  VideoModal,
  FacebookIcon,
  TwitterIcon,
  YoutubeIcon,
  EmailIcon,
  Navbar,
} from "@/components/Elements";

import SmilingFijianImage from "@/images/smiling-fijian.jpeg";
import StudentPortraitImage from "@/images/student-portrait.jpeg";
import SmilingStudentImage from "@/images/smiling-student.jpeg";
import IslanderStudentImage from "@/images/islander-student.jpeg";
import GlobeImage from "@/images/globe.jpeg";

type ServerSideProps = {
  title: string;
  header: string;
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
    lifetimeInMonths: number;
  };
  social: {
    twitter: string;
    facebook: string;
    youtube: string;
    email: string;
  };
  events: EventPost[];
  courses: CoursePost[];
};

type EventPost = Awaited<ReturnType<typeof getEvents>>[number];
type CoursePost = Awaited<ReturnType<typeof getCourses>>[number];

export const getStaticProps = (async () => {
  const config = getSiteConfig();
  const [events, courses] = await Promise.all([getEvents(), getCourses()]);

  return {
    props: {
      title: "Learning, sharing, connecting and moving forward together.",
      header:
        "Empowering Pacific educators through collaboration, the Pasifika Teachers network drives optimal student outcomes and global competency. Uniting under SDG4 and PacREF, we thrive in our shared wisdom and professional growth. Join us!",
      videoURL: config.videoURL,
      signInLink: config.signInLink,

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
        engagements: config.engagements,
        registered: config.registered,
        participants: config.participants,
        lifetimeInMonths: differenceInMonths(
          new Date(),
          new Date(config.launched)
        ),
      },

      social: {
        twitter: config.twitter,
        facebook: config.facebook,
        youtube: config.youtube,
        email: config.email,
      },

      events: events.slice(0, 3),
      courses: courses.slice(0, 3),
    },
  };
}) satisfies GetStaticProps<ServerSideProps>;

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  title,
  header,
  videoURL,
  intro,
  stats,
  social,
  events,
  courses,
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <HeroSection title={title} header={header} videoURL={videoURL} />
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
        {/* <CoursesSection courses={courses} /> */}
        <ContactSection
          socialLinks={{
            facebook: social.facebook,
            twitter: social.twitter,
            youtube: social.youtube,
            email: social.email,
          }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

const HeroSection = ({
  title,
  header,
  videoURL,
}: {
  title: string;
  header: string;
  videoURL: string;
}) => {
  const [isOpen, openModal, closeModal] = useModal(false);

  return (
    <div className="bg-skin-secondary min-h-screen">
      <VideoModal
        url={videoURL}
        openModal={openModal}
        closeModal={closeModal}
        isOpen={isOpen}
      />

      <header className="absolute inset-x-0 top-0 z-50">
        <Navbar className="!max-w-screen-2xl" />
      </header>

      <div className="relative isolate">
        <svg
          className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
          />
        </svg>
        <div className="absolute top-0 left-1/2 right-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48">
          <svg
            viewBox="0 0 801 1036"
            aria-hidden="true"
            className="w-[50.0625rem]"
          >
            <path
              fill="url(#70656b7e-db44-4b9b-b7d2-1f06791bed52)"
              fillOpacity=".3"
              d="m282.279 843.371 32.285 192.609-313.61-25.32 281.325-167.289-58.145-346.888c94.5 92.652 277.002 213.246 251.009-45.597C442.651 127.331 248.072 10.369 449.268.891c160.956-7.583 301.235 116.434 351.256 179.39L507.001 307.557l270.983 241.04-495.705 294.774Z"
            />
            <defs>
              <linearGradient
                id="70656b7e-db44-4b9b-b7d2-1f06791bed52"
                x1="508.179"
                x2="-28.677"
                y1="-116.221"
                y2="1091.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="overflow-hidden">
          <Container.Inner className="pb-32 pt-36 sm:pt-60 lg:pt-32">
            <Container.Content className="gap-x-14">
              <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1 className="text-4xl sm:text-6xl sm:leading-[4.2rem] tracking-tight text-gray-900">
                  {title}
                </h1>
                <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                  {header}
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <button
                    onClick={openModal}
                    className="px-3.5 py-2.5 text-skin-inverted hover:text-gray-900 bg-skin-primary-muted hover:bg-skin-accent shadow-sm rounded-full transition-all"
                  >
                    Watch short video
                  </button>
                  <Link
                    href="/sign-up"
                    className="font-semibold leading-6 text-gray-900 hover:text-skin-primary transition-colors"
                  >
                    Sign up <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                  <div className="relative">
                    <Image
                      width={176}
                      height={264}
                      src="/images/1.jpeg"
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
                <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                  <div className="relative">
                    <Image
                      width={176}
                      height={264}
                      src="/images/2.jpeg"
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="relative">
                    <Image
                      width={176}
                      height={264}
                      src="/images/3.jpeg"
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
                <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                  <div className="relative">
                    <Image
                      width={176}
                      height={264}
                      src="/images/4.jpeg"
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="relative">
                    <Image
                      width={176}
                      height={264}
                      src="/images/5.jpeg"
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
              </div>
            </Container.Content>
          </Container.Inner>
        </div>
      </div>
    </div>
  );
};

const IntroSection = ({
  title,
  excerpt,
  body,
}: {
  title: string;
  excerpt: string;
  body: string;
}) => {
  const { ref, isVisible, toggle } = useExtendedContent();

  return (
    <section>
      <Container.Outer ref={ref} className="relative bg-skin-base">
        <Container.Inner className="mb-4">
          <div className="flex justify-center mb-8">
            <h1 className="font-serif sm:mb-8 max-w-3xl text-2xl sm:text-3xl md:text-4xl text-center leading-snug md:leading-snug text-skin-base">
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
                className="rounded-lg"
                src={SmilingFijianImage}
                alt="Smiling student"
                placeholder="blur"
                credit="Vijeshwar Datt on Unsplash"
                creditHref="https://vijeshdatt.com/"
              />
              <div className="relative hidden xl:inline top-[10%]">
                <Image
                  className="rounded-lg"
                  src={StudentPortraitImage}
                  alt="Smiling student"
                  placeholder="blur"
                  credit="Vijeshwar Datt on Unsplash"
                  creditHref="https://vijeshdatt.com/"
                />
              </div>
              <div className="relative lg:hidden xl:inline">
                <Image
                  className="rounded-lg"
                  src={SmilingStudentImage}
                  alt="Smiling student"
                  placeholder="blur"
                  credit="Vijeshwar Datt on Unsplash"
                  creditHref="https://vijeshdatt.com/"
                />
              </div>
              <div className="relative hidden lg:inline xl:top-[10%]">
                <Image
                  className="rounded-lg"
                  src={IslanderStudentImage}
                  alt="Smiling student"
                  placeholder="blur"
                  credit="Vijeshwar Datt on Unsplash"
                  creditHref="https://vijeshdatt.com/"
                />
              </div>
            </div>
          </div>
        </Container.Inner>
      </Container.Outer>
    </section>
  );
};

const StatsSection = ({
  engagements,
  registered,
  participants,
  lifetimeInMonths,
}: {
  engagements: string | number;
  registered: string | number;
  participants: string | number;
  lifetimeInMonths: number;
}) => {
  return (
    <section className="relative">
      <Container.Outer className="bg-skin-secondary">
        <Container.Inner className="mt-4 mb-20">
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
        </Container.Inner>
      </Container.Outer>
    </section>
  );
};

const Stat = ({
  icon,
  stat,
  text,
  className,
}: {
  icon: React.ReactNode;
  stat: string | number;
  text: string;
  className?: string;
}) => {
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

const EventsSection = ({
  events,
}: {
  events: Awaited<ReturnType<typeof getEvents>>;
}) => {
  return (
    <section>
      <Container.Outer className="relative">
        <Image
          backgroundCover
          overlayed="opacity-90 bg-skin-primary"
          alt="Connected globe"
          src={GlobeImage}
          placeholder="blur"
          credit="Background vector created by liuzishan on freepik.com"
          creditHref="https://www.freepik.com/vectors/background"
        />
        <Container.Inner className="my-16">
          <Container.Content>
            <div className="flex flex-col mb-12 lg:mb-0">
              <div className="z-10 flex flex-col mb-16 max-w-lg">
                <div>
                  <Link
                    href="https://twitter.com/hashtag/WCPTevents?src=hashtag_click"
                    className="text-lg tracking-wider text-yellow-400"
                    referrerPolicy="no-referrer"
                    target="_blank"
                  >
                    #WCPTevents
                  </Link>
                </div>
                <h1 className="mt-1 mb-2 sm:mb-4 text-2xl sm:text-3xl md:text-4xl text-skin-inverted">
                  Upcoming Events
                </h1>
                <span className="text-lg text-gray-100">
                  Join us in our virtual events. We carry out workshops and
                  meetups that you can virtually join from anywhere.
                </span>
                {/* <div className="mt-4">
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-x-2 py-2.5 text-skin-inverted hover:text-amber-400 transition-colors"
                  >
                    <span>View all events</span>
                    <BsArrowRight size={18} />
                  </Link>
                </div> */}
              </div>
              <div className="z-10 grid lg:grid-cols-3 grid-rows-1 gap-12 lg:gap-8 xl:gap-10 2xl:gap-12 text-gray-600 overflow-hidden">
                {events.map((event, i) => (
                  <EventCard
                    key={i}
                    {...event}
                    href={`/events/${event.slug}`}
                  />
                ))}
              </div>
            </div>
          </Container.Content>
        </Container.Inner>
      </Container.Outer>
    </section>
  );
};

const EventCard = ({
  className,
  href,
  type,
  title,
  excerpt,
  date,
  datetime,
  year,
}: {
  className?: string;
  href: string;
  type: string;
  title: string;
  excerpt?: string | null;
  date?: string | null;
  datetime: string;
  year: number;
}) => {
  return (
    <a
      href={href}
      className={cx(
        "group flex flex-col rounded-md overflow-hidden",
        className
      )}
    >
      <div className="relative flex justify-between py-8 px-10 border-b border-solid bg-skin-primary-muted">
        <div className="flex flex-col">
          <span className="text-2xl 2xl:text-3xl font-semibold text-skin-inverted">
            {date ? date : format(new Date(datetime), "d MMM yyyy")}
          </span>
          <span className="text-lg uppercase tracking-widest">{year}</span>
          <div className="absolute bottom-0 translate-y-1/2 py-1.5 px-2.5 rounded-md drop-shadow-md bg-skin-base">
            <span className="font-semibold text-skin-muted tracking-wider">
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
            <div className="block text-lg leading-normal text-skin-muted">
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

const ContactSection = ({
  socialLinks,
}: {
  socialLinks: {
    facebook: string;
    twitter: string;
    youtube: string;
    email: string;
  };
}) => {
  return (
    <section className="relative py-12 sm:py-12 bg-white">
      <div className="xl:container mx-auto py-16 px-8 sm:px-12 flex flex-col">
        <h2 className="z-10 font-sans font-black text-4xl sm:text-5xl tracking-tight text-gray-900">
          <div className="">Want to get in touch?</div>
          <div className="bg-clip-text text-skin-primary">
            Reach us through social media or email us!
          </div>
        </h2>
        <div className="z-10 mt-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
          <div className="flex items-center theme-social-gray-bg">
            <FacebookIcon href={socialLinks.facebook} />
            <TwitterIcon href={socialLinks.twitter} />
            <YoutubeIcon href={socialLinks.youtube} />
            <EmailIcon href={socialLinks.email} />
          </div>
        </div>
      </div>
    </section>
  );
};

// const CoursesSection = ({ courses }: { courses: CoursePost[] }) => {
//   return (
//     <div>
//       {courses.map((course) => (
//         <div key={course.id}>{course.title}</div>
//       ))}
//     </div>
//   );
// };

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={cx("relative bg-skin-secondary", className)}>
      <div className="flex flex-col container mx-auto px-8 sm:px-12">
        <div className="z-10 flex flex-col md:flex-row justify-between container mx-auto py-12">
          <div className="flex justify-center items-center my-2">
            <div className="text-center text-gray-900">
              <span>Wisdom Community of Pasifika Teachers &copy; </span>
              <span>{new Date().getFullYear()}</span>
            </div>
          </div>
          <div className="flex justify-center items-center my-2">
            <span className="text-center text-gray-900">
              Supported by Fiji National University
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

type ContainerType = React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;

const ContainerOuter: ContainerType = React.forwardRef(function ContainerOuter(
  { children, className, ...props },
  ref
) {
  return (
    <div ref={ref} className={cx("py-20 sm:py-24", className)} {...props}>
      {children}
    </div>
  );
});

const ContainerInner: ContainerType = React.forwardRef(function ContainerInner(
  { children, className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx("mx-auto max-w-screen-2xl px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
});

const ContainerContent: ContainerType = React.forwardRef(
  function ContainerContent({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          "lg:flex lg:items-center mx-auto lg:mx-0 max-w-2xl lg:max-w-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// @ts-ignore
const Container: ContainerType & {
  Inner: ContainerType;
  Outer: ContainerType;
  Content: ContainerType;
} = React.forwardRef(function Container(
  { children, className, ...props },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <ContainerOuter ref={ref} className={className} {...props}>
      <ContainerInner>{children}</ContainerInner>
    </ContainerOuter>
  );
});

Container.Outer = ContainerOuter;
Container.Inner = ContainerInner;
Container.Content = ContainerContent;
