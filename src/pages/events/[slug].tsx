import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";
import { format } from "date-fns";

import { ContentLayout } from "@/components/Layouts";
import { getEvents, getEventBySlug, getCourses } from "@/lib";

export const getStaticPaths = async () => {
  const events = await getEvents();
  return {
    paths: events.map((event) => ({
      params: {
        slug: event.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = (async ({ params }) => {
  const { slug } = params as { slug: string };
  const event = await getEventBySlug(slug);

  const allEvents = await getEvents();
  const allCourses = await getCourses();

  return {
    props: {
      event,
      eventList: allEvents.slice(0, 5),
      courseList: allCourses.slice(0, 5),
    },
  };
}) satisfies GetStaticProps<{
  event: Awaited<ReturnType<typeof getEventBySlug>>;
  eventList: Awaited<ReturnType<typeof getEvents>>;
  courseList: Awaited<ReturnType<typeof getCourses>>;
}>;

export const EventPage = ({
  event,
  eventList,
  courseList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ContentLayout title={event.title} description={event.excerpt}>
      <div className="grid grid-cols-7 gap-x-12">
        <article className="col-span-full lg:col-span-5 text-lg prose prose-li:my-1 max-w-3xl">
          <h1 className="text-5xl leading-tight mb-10">{event.title}</h1>

          <div className="flex items-center gap-x-6">
            <div>
              {event.registrationUrl ? (
                <Link
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-x-1.5 no-underline px-5 py-3 bg-skin-primary-muted hover:bg-skin-accent text-skin-inverted hover:text-black rounded-full shadow-md transition-colors"
                >
                  <span>Register now</span>
                  <MdOpenInNew className="text-xl" />
                </Link>
              ) : (
                <div>Registration is not yet open</div>
              )}
            </div>

            <div>
              {event.type ? (
                <div className="font-bold">{event.type}</div>
              ) : null}

              <div>{event.duration}</div>
              {event.registrationDeadline ? (
                <div className="text-xl text-skin-muted">
                  {event.registrationDeadline}
                </div>
              ) : null}
            </div>
          </div>

          {event.content ? (
            <div
              className="mt-16"
              dangerouslySetInnerHTML={{ __html: event.content }}
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
