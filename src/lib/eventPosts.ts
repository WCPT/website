type EventPost = {
  id: string | number;
  slug: string;
  published: boolean;
  type: string;
  title: string;
  datetime: Date;
  date?: string | null;
  year: number;
  duration: string;
  registrationUrl?: string | null;
  registrationDeadline?: string | null;
  content?: string | null;
};

export async function getEventPosts(): Promise<EventPost[]> {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context("../../content/events", false, /\.md$/)
    .keys()
    .filter((relativePath) => relativePath.startsWith("./"))
    .map((relativePath) => relativePath.substring(2)); // relativePath is "./file.md", so we remove the "./"

  const events = await Promise.all<EventPost>(
    markdownFiles.map(async (path) => {
      const { attributes, html } = await import(`../../content/events/${path}`);
      return {
        ...attributes,
        content: html ?? null,
        slug: path.substring(0, path.length - 3),
      };
    })
  );

  return events
    .filter((event) => event.published)
    .sort(
      (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
    );
}
