import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import Link from "next/link";

import { ContentLayout } from "../../components/Layouts";
import { useRouterQuery } from "../../hooks";

type IReturnProps = {
  event: {
    id: string | number;
    type?: string;
    title: string;
    date: string;
    duration: string;
    registrationUrl?: string;
    registrationDeadline?: string;
    body: string;
  };
};

export const getServerSideProps: GetServerSideProps<
  IReturnProps
> = async () => {
  return {
    props: {
      event: {
        id: 1,
        type: "Workshop",
        title: "Advanced Excel - Generate Report Sheets and Graphs",
        date: "2022-07-13T03:30:00.000Z",
        duration: "3.30 - 5.30PM / 17 May - 13 July 2022",
        registrationUrl: "#",
        body: "",
      },
    },
  };
};

export const EventPage = ({
  event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const slug = useRouterQuery<string>("slug");

  return (
    <ContentLayout title={`WCPT | {${event.title}}`}>
      <div className="flex flex-col min-h-screen">
        <div className="px-8">
          <section className="container mx-auto mt-12 mb-16 text-lg prose text-skin-base">
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
              <div className="text-xl text-skin-muted">
                {event.registrationDeadline}
              </div>

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

            <div
              className="pt-4"
              dangerouslySetInnerHTML={{ __html: event.body }}
              itemProp="articleBody"
            />

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

            <div>
              <Link href="/" className="text-skin-muted hover:text-skin-base">
                Return to home page
              </Link>
            </div>
          </section>
        </div>
      </div>
    </ContentLayout>
  );
};

export default EventPage;
