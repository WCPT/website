import { slugify } from "./util";

describe("util", () => {
  it("slugify should convert string to a URL-safe slug", () => {
    [
      [
        "Advanced Excel - Generate Report Sheets and Graphs",
        "advanced-excel-generate-report-sheets-and-graphs",
      ],
      [
        "Advanced Zoom: Using Mobile Phone as a Document Viewer",
        "advanced-zoom-using-mobile-phone-as-a-document-viewer",
      ],
      [
        "Communication Skills for Open, Distance and Flexible Learning",
        "communication-skills-for-open-distance-and-flexible-learning",
      ],
      ["Enhancing Grammar Basics", "enhancing-grammar-basics"],
      ["Excel Basics in the Classroom", "excel-basics-in-the-classroom"],
      [
        "Creating Digital Worksheets via Google Forms",
        "creating-digital-worksheets-via-google-forms",
      ],
      [
        "Grammar Matters - English for Teaching Purposes",
        "grammar-matters-english-for-teaching-purposes",
      ],
      ["Level up your Zoom skills!", "level-up-your-zoom-skills"],
      [
        "Optimising Multimedia for Low-Bandwidth Teaching and Learning",
        "optimising-multimedia-for-low-bandwidth-teaching-and-learning",
      ],
      [
        "Word Processing - Enrich your MS Word skills!",
        "word-processing-enrich-your-ms-word-skills",
      ],
      ["Writing Exam Questions", "writing-exam-questions"],
    ].forEach(([value, expected]) => {
      expect(slugify(value)).toBe(expected);
    });
  });
});
