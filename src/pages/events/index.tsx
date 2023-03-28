import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { format } from "date-fns";

import { getEvents } from "@/lib";
import { ContentLayout } from "@/components/Layouts";

export const getStaticProps = (async () => {
  const events = await getEvents();
  return {
    props: {
      events,
    },
  };
}) satisfies GetStaticProps<{}>;

export const EventsIndexPage = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ContentLayout
      title="Workshops & Events"
      description="Discover a diverse range of engaging workshops and events designed to inspire, educate, and connect. Join us to learn new skills, expand your network, and spark creativity."
    >
      <ul className="grid divide-y">
        {events.map((event) => (
          <li key={event.slug} className="max-w-3xl">
            <Link href={`/events/${event.slug}`} className="block group py-4">
              <h1 className="text-2xl group-hover:text-skin-primary">
                {event.title}
              </h1>
              <span className="flex items-center gap-x-1.5 text-skin-muted">
                {event.date
                  ? event.date
                  : format(new Date(event.datetime), "d MMM yyyy")}
                <div className="inline-block rounded-full w-1 h-1 bg-gray-400" />
                {event.type}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </ContentLayout>
  );
};

export default EventsIndexPage;
