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
  registrationUrl: string;
  registrationDeadline?: string | null;
  excerpt?: string | null;
  content?: string | null;
};

async function importEvents(): Promise<EventPost[]> {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context("../../content/events", false, /\.md$/)
    .keys()
    .filter((relativePath) => relativePath.startsWith("./"))
    .map((relativePath) => relativePath.substring(2)); // relativePath is "./file.md", so we remove the "./"

  return await Promise.all<EventPost>(
    markdownFiles.map(async (path) => {
      const { attributes, html } = await import(`../../content/events/${path}`);
      return {
        ...attributes,
        content: html ?? null,
        slug: path.substring(0, path.length - 3),
      };
    })
  );
}

export async function getEvents(): Promise<EventPost[]>;
export async function getEvents(options?: {
  publishedOnly?: boolean;
}): Promise<EventPost[]> {
  const { publishedOnly = true } = options ?? {};

  let events = await importEvents();
  if (publishedOnly) {
    events = events.filter((event) => event.published);
  }
  return events.sort(
    (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
  );
}

export async function getEventBySlug(slug: string): Promise<EventPost> {
  const { attributes, html } = await import(`../../content/events/${slug}.md`);
  return {
    ...attributes,
    content: html ?? null,
    slug,
  };
}
