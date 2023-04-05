import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";
import { BsArrowLeftCircle } from "react-icons/bs";

import { ContentLayout } from "@/components/Layouts";
import { getEvents, getCourseBySlug, getCourses } from "@/lib";
import { SideSuggestionsPane } from "@/components/Elements";

export const getStaticPaths = async () => {
  const courses = await getCourses();
  return {
    paths: courses.map((course) => ({
      params: {
        slug: course.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = (async ({ params }) => {
  const { slug } = params as { slug: string };
  const course = await getCourseBySlug(slug);

  const allEvents = await getEvents();
  const allCourses = await getCourses();

  return {
    props: {
      course,
      courses: allCourses.slice(0, 5),
      events: allEvents.slice(0, 5),
    },
  };
}) satisfies GetStaticProps<{
  course: Awaited<ReturnType<typeof getCourseBySlug>>;
  courses: Awaited<ReturnType<typeof getCourses>>;
  events: Awaited<ReturnType<typeof getEvents>>;
}>;

export const EventPage = ({
  course,
  events,
  courses,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ContentLayout title={course.title} description={course.excerpt}>
      <Link
        href="/courses"
        className="group flex items-center -mt-4 mb-6 gap-x-2 text-skin-muted hover:text-skin-primary"
      >
        <BsArrowLeftCircle className="text-2xl" />
        <span className="text-base">View list of short courses</span>
      </Link>

      <div className="grid grid-cols-7 gap-x-12">
        <article className="col-span-full lg:col-span-5 text-lg prose prose-li:my-1 max-w-3xl">
          <h1 className="sm:text-5xl !leading-tight mb-10">{course.title}</h1>

          <div className="grid sm:flex items-center gap-y-4 gap-x-6">
            <div className="order-2 sm:order-1">
              {course.registrationUrl ? (
                <Link
                  href={course.registrationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-x-1.5 no-underline px-5 py-3 bg-skin-primary-muted hover:bg-skin-accent text-skin-inverted hover:text-black rounded-full shadow-md transition-colors"
                >
                  <span>Register now</span>
                  <MdOpenInNew className="text-xl" />
                </Link>
              ) : (
                <div className="text-skin-muted">
                  &#x2022; Registration is currently not open
                </div>
              )}
            </div>

            <div className="order-1 sm:order-2">
              {course.registrationDeadline ? (
                <div className="text-xl text-skin-muted">
                  {course.registrationDeadline}
                </div>
              ) : null}
            </div>
          </div>

          {course.content ? (
            <div
              className="mt-16"
              dangerouslySetInnerHTML={{ __html: course.content }}
              itemProp="articleBody"
            />
          ) : null}
        </article>

        <SideSuggestionsPane events={events} courses={courses} />
      </div>
    </ContentLayout>
  );
};

export default EventPage;
