import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";

import { ContentLayout } from "@/components/Layouts";
import { getEvents, getEventBySlug } from "@/lib";

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
  return {
    props: {
      event,
    },
  };
}) satisfies GetStaticProps<{
  event: Awaited<ReturnType<typeof getEventBySlug>>;
}>;

export const EventPage = ({
  event,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ContentLayout title={event.title} description={event.excerpt}>
      <article className="container mx-auto mt-12 mb-16 text-lg prose text-skin-base">
        {event.type && (
          <h2 className="mb-0 text-skin-muted font-normal text-2xl">
            {event.type}
          </h2>
        )}
        <h1 className="text-4xl leading-tight text-skin-primary">
          {event.title}
        </h1>

        <div>
          <div className="text-xl">{event.duration}</div>
          {event?.registrationDeadline ? (
            <div className="text-xl text-skin-muted">
              {event.registrationDeadline}
            </div>
          ) : null}

          <div className="pt-2">
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="text-white no-underline"
            >
              <button className="my-2 mr-2 px-4 py-2 bg-skin-primary hover:bg-skin-primary-muted rounded shadow-md hover:shadow-sm transition-all">
                Register
              </button>
            </a>
          </div>
        </div>

        {event.content ? (
          <div
            className="pt-4"
            dangerouslySetInnerHTML={{ __html: event.content }}
            itemProp="articleBody"
          />
        ) : null}

        {/* <nav className="grid grid-cols-2 gap-8 mt-16 py-8 border-t border-gray-200">
              <div>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </div>
              <div className="ml-auto">
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </div>
            </nav> */}
      </article>
    </ContentLayout>
  );
};

export default EventPage;
