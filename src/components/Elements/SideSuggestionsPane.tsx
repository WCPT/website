import Link from "next/link";

import {
  displayCourseDate,
  displayEventDate,
  getCourses,
  getEvents,
} from "@/lib";

export const SideSuggestionsPane = ({
  events,
  courses,
}: {
  events: Awaited<ReturnType<typeof getEvents>>;
  courses: Awaited<ReturnType<typeof getCourses>>;
}) => {
  return (
    <aside className="hidden lg:flex flex-col col-span-2 gap-y-12">
      <div className="flex flex-col gap-y-2">
        <h1 className="font-bold">Workshops & Events</h1>
        {events.map((event) => (
          <Link
            key={event.slug}
            href={`/events/${event.slug}`}
            className="group"
          >
            <span className="block group-hover:underline underline-offset-2">
              {event.title}
            </span>
            <span className="flex items-center gap-x-1.5 text-sm text-skin-muted">
              {displayEventDate(event)}
              <div className="inline-block rounded-full w-1 h-1 bg-gray-400" />
              {event.type}
            </span>
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-y-2">
        <h1 className="font-bold">Short Courses</h1>
        {courses.map((course) => (
          <Link
            key={course.slug}
            href={`/courses/${course.slug}`}
            className="group"
          >
            <span className="block group-hover:underline underline-offset-2">
              {course.title}
            </span>
            <span className="flex items-center gap-x-1.5 text-sm text-skin-muted">
              {displayCourseDate(course)}
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default SideSuggestionsPane;
