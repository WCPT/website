export function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replaceAll(/[^A-Za-z0-9_\s\-]/g, "")
    .replaceAll(/(\s+)|(_+)/g, "-")
    .replaceAll(/\-+/g, "-");
}
