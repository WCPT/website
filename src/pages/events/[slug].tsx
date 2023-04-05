import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";
import { BsArrowLeftCircle } from "react-icons/bs";

import { ContentLayout } from "@/components/Layouts";
import { getEvents, getEventBySlug, getCourses } from "@/lib";
import { SideSuggestionsPane } from "@/components/Elements";

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
      events: allEvents.slice(0, 5),
      courses: allCourses.slice(0, 5),
    },
  };
}) satisfies GetStaticProps<{
  event: Awaited<ReturnType<typeof getEventBySlug>>;
  events: Awaited<ReturnType<typeof getEvents>>;
  courses: Awaited<ReturnType<typeof getCourses>>;
}>;

export const EventPage = ({
  event,
  events,
  courses,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ContentLayout title={event.title} description={event.excerpt}>
      <Link
        href="/events"
        className="group flex items-center -mt-4 mb-6 gap-x-2 text-skin-muted hover:text-skin-primary"
      >
        <BsArrowLeftCircle className="text-2xl" />
        <span className="text-base">View list of workshops & events</span>
      </Link>

      <div className="grid grid-cols-7 gap-x-12">
        <article className="col-span-full lg:col-span-5 text-lg prose prose-li:my-1 max-w-3xl">
          <h1 className="sm:text-5xl !leading-tight mb-10">{event.title}</h1>

          <div className="grid sm:flex items-center gap-y-4 gap-x-6">
            <div className="order-2 sm:order-1">
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

            <div className="order-1 sm:order-2">
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

        <SideSuggestionsPane events={events} courses={courses} />
      </div>
    </ContentLayout>
  );
};

export default EventPage;
