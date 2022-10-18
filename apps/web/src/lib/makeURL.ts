export function makeURL(path: string) {
  return joinURL(process.env.CMS_URL!, path);
}

function joinURL(baseURL: string, path: string) {
  // Ensure baseURL ends with '/'
  if (!baseURL.endsWith("/")) {
    baseURL += "/";
  }

  // Ensure path doesn't start with '/'
  if (path.startsWith("/")) {
    path = path.slice(1);
  }

  return new URL(path, baseURL).href;
}
