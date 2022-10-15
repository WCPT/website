/*
Welcome to the schema! The schema is the heart of Keystone.

Here we define our 'lists', which will then be used both for the GraphQL
API definition, our database tables, and our Admin UI layout.

Some quick definitions to help out:
A list: A definition of a collection of fields with a name. For the starter
  we have `User`, `Post`, and `Tag` lists.
A field: The individual bits of data on your list, each with its own type.
  you can see some of the lists in what we use below.

*/

// Like the `config` function we use in keystone.ts, we use functions
// for putting in our config so we get useful errors. With typescript,
// we get these even before code runs.
import { list } from "@keystone-6/core";

// We're using some common fields in the starter. Check out https://keystonejs.com/docs/apis/fields#fields-api
// for the full list of fields.
import { text, password, timestamp, select } from "@keystone-6/core/fields";
// The document field is a more complicated field, so it's in its own package
// Keystone aims to have all the base field types, but you can make your own
// custom ones.
import { document } from "@keystone-6/fields-document";

// We are using Typescript, and we want our types experience to be as strict as it can be.
// By providing the Keystone generated `Lists` type to our lists object, we refine
// our types to a stricter subset that is type-aware of other lists in our schema
// that Typescript cannot easily infer.
import { Lists } from ".keystone/types";
import { slugify } from "./lib/util";

// We have a users list, a blogs list, and tags for blog posts, so they can be filtered.
// Each property on the exported object will become the name of a list (a.k.a. the `listKey`),
// with the value being the definition of the list, including the fields.
export const lists: Lists = {
  // Here we define the user list.
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
    },
    ui: {
      listView: {
        initialColumns: ["name", "email"],
      },
    },
  }),
  // Our second list is the Posts list. We've got a few more fields here
  // so we have all the info we need for displaying posts.
  Event: list({
    fields: {
      slug: text({
        isIndexed: "unique",
        isFilterable: true,
        graphql: {
          omit: ["create", "update"],
        },
      }),
      type: select({
        options: [
          { label: "Workshop", value: "Workshop" },
          { label: "Short Course", value: "Short Course" },
          { label: "Event", value: "Event" },
        ],
      }),
      title: text({
        validation: {
          isRequired: true,
        },
      }),
      // Required for sorting
      startDate: timestamp({
        validation: {
          isRequired: true,
        },
      }),
      dates: text({
        validation: {
          isRequired: true,
        },
      }),
      year: text({
        validation: {
          isRequired: true,
        },
      }),
      duration: text(),
      excerpt: text({
        validation: {
          length: {
            max: 300,
          },
        },
        ui: {
          displayMode: "textarea",
        },
      }),
      // The document field can be used for making highly editable content. Check out our
      // guide on the document field https://keystonejs.com/docs/guides/document-fields#how-to-use-document-fields
      // for more information
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      registrationURL: text(),
      registrationDeadline: timestamp(),
      status: select({
        options: [
          { label: "Featured", value: "featured" },
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
        ],
        // We want to make sure new posts start off as a draft when they are created
        defaultValue: "draft",
        // fields also have the ability to configure their appearance in the Admin UI
        ui: {
          displayMode: "segmented-control",
        },
      }),
    },
    hooks: {
      resolveInput: ({ resolvedData, item }) => {
        if (resolvedData.title) {
          return {
            ...resolvedData,
            slug: slugify(resolvedData.title.toString()),
          };
        }
        return resolvedData;
      },
    },
    ui: {
      listView: {
        initialColumns: ["title", "type", "status"],
      },
    },
  }),
};
