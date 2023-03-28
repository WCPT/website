type CoursePost = {
  id: string | number;
  slug: string;
  published: boolean;
  title: string;
  openingDate: Date;
  closingDate?: Date | null;
  dates?: string | null; // to be deprecated
  registrationUrl?: string | null;
  registrationDeadline?: string | null;
  excerpt?: string | null;
  content?: string | null;
};

export async function importCourses(): Promise<CoursePost[]> {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context("../../content/courses", false, /\.md$/)
    .keys()
    .filter((relativePath) => relativePath.startsWith("./"))
    .map((relativePath) => relativePath.substring(2)); // relativePath is "./file.md", so we remove the "./"

  return await Promise.all<CoursePost>(
    markdownFiles.map(async (path) => {
      const { attributes, html } = await import(
        `../../content/courses/${path}`
      );
      return {
        ...attributes,
        content: html ?? null,
        slug: path.substring(0, path.length - 3),
      };
    })
  );
}

export async function getCourses(): Promise<CoursePost[]>;
export async function getCourses(options?: {
  publishedOnly?: boolean;
}): Promise<CoursePost[]> {
  const { publishedOnly = true } = options ?? {};

  let courses = await importCourses();
  if (publishedOnly) {
    courses = courses.filter((course) => course.published);
  }
  return courses.sort(
    (a, b) =>
      new Date(b.openingDate).getTime() - new Date(a.openingDate).getTime()
  );
}

export async function getCourseBySlug(slug: string): Promise<CoursePost> {
  const { attributes, html } = await import(`../../content/courses/${slug}.md`);
  return {
    ...attributes,
    content: html ?? null,
    slug,
  };
}
