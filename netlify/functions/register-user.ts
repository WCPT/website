import { HandlerEvent, HandlerContext } from "@netlify/functions";
import sendgrid from "@sendgrid/mail";
import * as yup from "yup";
import ejs from "ejs";
// import { Redis } from "@upstash/redis";

import { userRegistrationSchema } from "../../src/lib/validationSchema";
import MoodleClient from "../lib/moodle/client";
import generatePassword from "../lib/generatePassword";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

const COURSE_ID = Number(process.env.COURSE_ID);

const moodleClient = new MoodleClient({
  wwwroot: process.env.MOODLE_URL!,
  token: process.env.MOODLE_API_KEY!,
});

// const redis = new Redis({
//   url: "https://subtle-tomcat-40219.upstash.io",
//   token: "********",
// });

const emailTemplate = `
<div>
  <p>Dear <%= firstname %>,</p>
  <p>Congratulations! Your registration is confirmed.</p>
  <p>Thank you for your interest in Wisdom Community of Pasifika Teachers (WCPT)!</p>
  <p>
    You may now access WCPT's online discussion platform, "Please Talanoa Karo, Pasifika!" in Moodle <a href="<%= process.env.MOODLE_URL %>course/view.php?id=<%= process.env.COURSE_ID %>">here</a>, using
    <% if (locals.username && locals.password) { %>
      the following credentials:
      <p>
        <div>username: <%= username %></div>
        <div>password: <%= password %></div>
      </p>
    <% } else { %>
      your usual Moodle credentials.
    <% } %>
  </p>
  <p>This online discussion platform hosts various forums on topics related to teaching experiences. Please feel free to share your experiences and ideas in the forums. You can also use these forums to request or offer assistance.</p>
  <p>Please be sure to review the forum etiquette guidelines before posting.</p>
  <p>If you have any questions, please don't hesitate to email us at <a href="mailto:pasifikateachers@gmail.com">pasifikateachers@gmail.com</a></p>
  <p>
    <div>Best regards,</div>
    <div>Team WCPT.</div>
    <div>
      <a href="https://pasifikateachers.org">Our website</a>
    </div>
  </p>
</div>
`;

type RequestBody = {
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  occupation: string;
};

export async function handler(event: HandlerEvent, _context: HandlerContext) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: "Method not allowed",
      }),
    };
  }

  const body: RequestBody = JSON.parse(event.body!);
  try {
    await userRegistrationSchema.validate(body);
  } catch (e: unknown) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid request body",
        errors: (e as yup.ValidationError).errors,
      }),
    };
  }

  const user = await registerUser(body);
  try {
    // Important to ensure that the email is sent

    // If the email fails to send:
    //  - the user will be registered but not get the credentials to access the course
    //  - the user may not be aware how and where to access the course

    // Cases where it might fail:
    // - Sendgrid is down
    // - Netlify's network is down
    // - Sendgrid's network is down

    // However, both are unlikely to happen based on their SLAs,
    // so stick to console.error just to log errors for now
    await sendWelcomeEmail(user);
  } catch (e) {
    console.error(
      "Error while trying to send welcome email",
      JSON.stringify({ error: e, user })
    );
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      user,
    }),
  };
}

async function registerUser(body: RequestBody) {
  const fields = mapUserFields({
    ...body,
    password: generatePassword({
      numbers: true,
      symbols: true,
      lowercase: true,
      uppercase: true,
    }),
  });

  // Check if user already exists
  const existingUser = await moodleClient.getUserBy("email", fields.email);
  if (existingUser) {
    await moodleClient.enrolUser(existingUser.id, COURSE_ID);
    return { ...fields, ...existingUser, userCreated: false };
  } else {
    // Ensure username is unique
    if (await moodleClient.isUsernameTaken(fields.username)) {
      // If username is taken, append a random digits to the end of the username
      // Rotate digits until a unique username is found
      while (true) {
        const username = appendUniqueToken(fields.username);
        if (await moodleClient.isUsernameAvailable(username)) {
          fields.username = username;
          break;
        }
      }
    }
    const createdUser = await moodleClient.createUser(fields);
    await moodleClient.enrolUser(createdUser.id, COURSE_ID);
    return { ...fields, ...createdUser, userCreated: true };
  }
}

async function sendWelcomeEmail(
  user: Awaited<ReturnType<typeof registerUser>>
) {
  if (user.userCreated) {
    return await sendgrid.send({
      to: user.email,
      from: "no-reply@pasifikateachers.org",
      subject: "Welcome to Wisdom Community of Pasifika Teachers!",
      html: ejs.render(emailTemplate, {
        firstname: user.firstname,
        username: user.username,
        password: user.password,
      }),
    });
  }
  return await sendgrid.send({
    to: user.email,
    from: "no-reply@pasifikateachers.org",
    subject: "Welcome to Wisdom Community of Pasifika Teachers!",
    html: ejs.render(emailTemplate, { firstname: user.firstname }),
  });
}

function mapUserFields({
  firstname,
  lastname,
  email,
  password,
  country,
  occupation,
}: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  country: string;
  occupation: string;
}) {
  return {
    username: makeUsername(firstname, lastname),
    password,
    firstname: firstname.trim(),
    lastname: removeSpaces(lastname),
    email: removeSpaces(email),
    country: removeSpaces(country),
    occupation: occupation.trim(),
  };
}

// Removes all white space characters: [ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]
function removeSpaces(str: string) {
  return str.replace(/\s/g, "");
}

function removeNonAlphanumeric(str: string) {
  return str.replace(/[^\w]/g, "");
}

function makeUsername(firstname: string, lastname: string) {
  return removeSpaces(
    `${removeNonAlphanumeric(firstname)}.${removeNonAlphanumeric(
      lastname
    )}`.toLowerCase()
  );
}

function appendUniqueToken(username: string, length: number = 2) {
  const digits = `${Math.floor(Math.random() * Math.pow(10, length))}`;
  return username + digits.padStart(length, "0");
}
