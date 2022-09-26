import { FC } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { MdOpenInNew, MdPlayCircleOutline } from "react-icons/md";
import cx from "classnames";

import Blueocean from "../../public/blueocean.jpeg";
import Navbar from "../components/Navigation/Navbar";
import { Credit, VideoModal } from "../components/Elements";
import { useExtendedContent, useModal } from "../hooks";

type IReturnProps = {
  title: string;
  header: string;
  signUpLink: string;
  signInLink: string;
  videoURL: string;
  intro: {
    title: string;
    body: string;
  };
};

export const getStaticProps: GetServerSideProps<IReturnProps> = async () => {
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
        body: "...",
      },
    },
  };
};

const HomePage: NextPage<InferGetServerSidePropsType<typeof getStaticProps>> = ({
  title,
  header,
  videoURL,
  signUpLink,
  signInLink,
  intro,
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar
        className="absolute top-0 z-10 theme-nav-transparent"
        socialLinks={{
          facebook: "",
          twitter: "",
          youtube: "",
          email: "",
        }}
      />

      <main>
        <HeroSection
          title={title}
          header={header}
          videoURL={videoURL}
          signUpLink={signUpLink}
          signInLink={signInLink}
        />
        <IntroSection title={intro.title} body={intro.body} />
      </main>

      <footer></footer>
    </div>
  );
};

const HeroSection: FC<{
  title: string;
  header: string;
  signUpLink: string;
  signInLink: string;
  videoURL: string;
}> = ({ title, header, signUpLink, signInLink, videoURL }) => {
  const [isOpen, openModal, closeModal] = useModal(false);

  return (
    <div className="relative h-screen min-h-[640px] overflow-hidden">
      <div className="absolute inset-0 -z-50">
        <Image
          layout="fill"
          objectFit="cover"
          objectPosition="50% 0%"
          unoptimized
          priority
          src={Blueocean}
          alt="Blue ocean"
        />
      </div>
      <Credit credit="Photo by Hoodh Ahmed on Unsplash" />
      <div className="absolute inset-0 opacity-30 bg-black -z-40"></div>

      <VideoModal
        url={videoURL}
        openModal={openModal}
        closeModal={closeModal}
        isOpen={isOpen}
      />

      <div className="flex h-full container mx-auto">
        <div className="mx-auto lg:mx-0 flex flex-col items-center lg:items-start justify-center px-12 sm:px-16 text-white text-center lg:text-left">
          <h1 className="xs:hidden text-[2rem] text-center pb-4 font-light">
            {title}
          </h1>

          <h2 className="mb-4 font-serif font-light text-[1.5rem] xs:text-[2.5rem] md:text-[2.75rem] leading-snug sm:w-[90%] lg:w-[55%] 2xl:w-[40%]">
            {header}
          </h2>

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

          <div className="flex flex-col sm:flex-row items-center my-2 text-gray-200 text-lg">
            <span className="mr-2 font-thin">Already a member?</span>
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

const IntroSection: FC<{ title: string; body: string }> = ({ title, body }) => {
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
              <p className="first-letter:text-5xl">
                We are a growing network of teachers of all levels from the
                wider Pacific region, with a common goal and the will to
                recalibrate Pacific education to optimise students’ learning
                outcomes and empower our generations for global competency and
                well-being. Reflecting the communal lifestyle of the Pacific, we
                work together, share and collaborate to solve problems, and
                conduct research to raise the quality of learning throughout the
                Pacific.
              </p>
              <div
                className={cx(
                  "opacity-0 xs:opacity-100 transition-opacity duration-300",
                  isVisible ? "block opacity-100" : "hidden xs:block"
                )}
              >
                <p>
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
                </p>
              </div>
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
          <div className="hidden lmd:grid xl:grid-cols-2 gap-4 auto-rows-min col-span-2 xl:col-span-1">
            {/* <SmilingFijianImage
              containerClassName="relative"
              credit="Photo by Vijeshwar Datt on Unsplash"
              creditLink="https://vijeshdatt.com/"
            />
            <div className="relative hidden xl:inline top-1/10">
              <StudentPortraitImage
                containerClassName="relative"
                credit="Photo by Vijeshwar Datt on Unsplash"
                creditLink="https://vijeshdatt.com/"
              />
            </div>
            <SmilingStudentImage
              containerClassName="relative lg:hidden xl:inline"
              credit="Photo by Vijeshwar Datt on Unsplash"
              creditLink="https://vijeshdatt.com/"
            />
            <div className="relative hidden lg:inline xl:top-1/10">
              <IslanderStudentImage
                containerClassName="relative"
                credit="Photo by Vijeshwar Datt on Unsplash"
                creditLink="https://vijeshdatt.com/"
              />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
