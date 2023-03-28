import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { format } from "date-fns";

import { getCourses } from "@/lib";
import { ContentLayout } from "@/components/Layouts";

export const getStaticProps = (async () => {
  const courses = await getCourses();
  return {
    props: {
      courses,
    },
  };
}) satisfies GetStaticProps<{}>;

export const EventsIndexPage = ({
  courses,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ContentLayout
      title="Short Courses"
      description="Explore short courses offered for our network of dedicated Pacific educators, committed to enhancing learning outcomes and global competency for students across the region."
    >
      <ul className="grid divide-y">
        {courses.map((course) => (
          <li key={course.slug} className="max-w-3xl">
            <Link
              href={`/courses/${course.slug}`}
              className="flex flex-col group py-4 gap-y-2"
            >
              <h1 className="text-2xl group-hover:text-skin-primary">
                {course.title}
              </h1>
              {course.excerpt ? (
                <div className="text-skin-muted">{course.excerpt}</div>
              ) : null}
              <span className="flex items-center gap-x-1.5 text-skin-muted">
                {format(new Date(course.openingDate), "d MMM yyyy")}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </ContentLayout>
  );
};

export default EventsIndexPage;
