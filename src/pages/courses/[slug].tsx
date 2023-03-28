import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";
import { BsArrowLeftCircle } from "react-icons/bs";
import { format } from "date-fns";

import { ContentLayout } from "@/components/Layouts";
import { getEvents, getCourseBySlug, getCourses } from "@/lib";

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
      courseList: allCourses.slice(0, 5),
      eventList: allEvents.slice(0, 5),
    },
  };
}) satisfies GetStaticProps<{
  course: Awaited<ReturnType<typeof getCourseBySlug>>;
  courseList: Awaited<ReturnType<typeof getCourses>>;
  eventList: Awaited<ReturnType<typeof getEvents>>;
}>;

export const EventPage = ({
  course,
  eventList,
  courseList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ContentLayout title={course.title} description={course.excerpt}>
      <Link
        href="/courses"
        className="group flex items-center mb-6 gap-x-2 text-skin-muted hover:text-skin-base"
      >
        <BsArrowLeftCircle className="text-2xl" />
        <span className="text-lg">View list of short courses</span>
      </Link>

      <div className="grid grid-cols-7 gap-x-12">
        <article className="col-span-full lg:col-span-5 text-lg prose prose-li:my-1 max-w-3xl">
          <h1 className="text-5xl leading-tight mb-10">{course.title}</h1>

          <div className="flex items-center gap-x-6">
            <div>
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

            <div>
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

        <aside className="hidden lg:flex flex-col col-span-2 gap-y-12">
          <div className="flex flex-col gap-y-2">
            <h1 className="font-bold">Workshops & Events</h1>
            {eventList.map((event) => (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="group"
              >
                <span className="block group-hover:underline underline-offset-2">
                  {event.title}
                </span>
                <span className="flex items-center gap-x-1.5 text-sm text-skin-muted">
                  {event.date
                    ? event.date
                    : format(new Date(event.datetime), "d MMM yyyy")}
                  <div className="inline-block rounded-full w-1 h-1 bg-gray-400" />
                  {event.type}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-y-2">
            <h1 className="font-bold">Short Courses</h1>
            {courseList.map((event) => (
              <Link
                key={event.slug}
                href={`/courses/${event.slug}`}
                className="group"
              >
                <span className="block group-hover:underline underline-offset-2">
                  {event.title}
                </span>
                <span className="flex items-center gap-x-1.5 text-sm text-skin-muted">
                  {event.dates}
                </span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </ContentLayout>
  );
};

export default EventPage;
