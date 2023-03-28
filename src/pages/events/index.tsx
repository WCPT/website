import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";

import { getEvents } from "@/lib";

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
    <div>
      <ul>
        {events.map((event) => (
          <li key={event.slug}>
            <Link href={`/events/${event.slug}`}>
              <div>{event.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsIndexPage;
