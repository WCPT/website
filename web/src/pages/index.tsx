import React from "react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { differenceInMonths } from "date-fns";
import { request, gql } from "graphql-request";

import { useSocialLinks } from "@/hooks";
import { Navbar } from "@/components/Navigation";
import { SocialMedia } from "@/components/Elements";
import { Footer } from "@/components/Footer";

import {
  HeroSection,
  IntroSection,
  StatsSection,
  EventsSection,
  ContactSection,
} from "@/modules/pages/index/components";

const query = gql`
  {
    events(
      where: { status: { equals: "featured" } }
      orderBy: { startDate: asc }
      take: 3
    ) {
      id
      title
      slug
      type
      dates
      year
      excerpt
      # duration
      # registrationURL
      # registrationDeadline
      # content {
      #   document
      # }
    }
  }
`;

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
    slug: string;
    type: string;
    title: string;
    excerpt?: string;
    dates: string;
    year: number;
    // duration: string;
    // registrationUrl?: string;
    // registrationDeadline?: string;
  }>;
};

export const getServerSideProps: GetServerSideProps<
  IReturnProps
> = async () => {
  const { events } = await request("http://localhost:3000/api/graphql", query);

  // [
  //   {
  //     type: "Workshop",
  //     title: "Advanced Zoom: Using Mobile Phone as a Document Viewer",
  //     excerpt:
  //       "Having mastered your basic Excel skills in creating a master marksheet, you can now level up your Excel skills",
  //     dates: "5 October",
  //     year: 2022,
  //   },
  //   {
  //     type: "Short course",
  //     title:
  //       "Communication Skills for Open, Distance and Flexible Learning",
  //     excerpt:
  //       "Having mastered your basic Excel skills in creating a master marksheet, you can now level up your Excel skills",
  //     dates: "3 - 30 January",
  //     year: 2022,
  //   },
  // ]

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
      events,
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
