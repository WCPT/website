import https from "https";
import fetch from "node-fetch";
import qs from "qs";

type MoodleErrorResponse = {
  exception: string;
  errorcode: string;
  message: string;
  debuginfo?: string;
};

type MoodleResponse<T> = T | MoodleErrorResponse;

type MoodleUser = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  department: string;
  firstaccess: 1 | 0;
  lastaccess: 1 | 0;
  auth: "ldap" | "manual";
  suspended: boolean;
  confirmed: boolean;
  lang: string;
  theme: string;
  timezone: string;
  mailformat: 1;
  description: string;
  descriptionformat: number;
  country: string;
  profileimageurlsmall: string;
  profileimageurl: string;
};

type CreateUserProps = {
  username: MoodleUser["username"];
  password: string;
  firstname: MoodleUser["firstname"];
  lastname: MoodleUser["lastname"];
  email: MoodleUser["email"];
  country: MoodleUser["country"];
  occupation: string;
};

type CreatedUser = {
  id: MoodleUser["id"];
  username: MoodleUser["username"];
};

type UpdateUserProps = Partial<{
  password: string;
  firstname: MoodleUser["firstname"];
  lastname: MoodleUser["lastname"];
  email: MoodleUser["email"];
  country: MoodleUser["country"];
  occupation: string;
}>;

/**
 * Represents the moodle API client
 */
export default class Client {
  private wwwroot: string; // The moodle hostname to connect to
  private token: string; // The access token to use
  private httpsAgent: https.Agent;

  constructor({
    wwwroot,
    token,
  }: {
    wwwroot: Client["wwwroot"];
    token: Client["token"];
  }) {
    this.wwwroot = wwwroot;
    this.token = token;
    // to ignore TLS cert verification failure
    this.httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
  }

  async getUserBy(
    key: string,
    value: string | number
  ): Promise<MoodleUser | null> {
    const response = await this.call({
      wsfunction: "core_user_get_users",
      method: "GET",
      args: {
        criteria: [{ key, value }],
      },
    });

    const responseBody = (await response.json()) as MoodleResponse<{
      users: MoodleUser[];
    }>;

    if ("errorcode" in responseBody) {
      throw new Error(responseBody.message);
    }

    if (responseBody.users?.length) {
      return responseBody.users[0];
    }
    return null;
  }

  async enrolUser(
    userId: number,
    courseId: number,
    roleId?: number
  ): Promise<null> {
    const response = await this.call({
      wsfunction: "enrol_manual_enrol_users",
      method: "POST",
      args: {
        enrolments: [
          {
            userid: userId,
            courseid: courseId,
            roleid: roleId !== undefined ? roleId : 5,
          },
        ],
      },
    });

    const responseBody = (await response.json()) as MoodleResponse<null>;

    if (responseBody && "errorcode" in responseBody) {
      throw new Error(responseBody.message);
    }
    return null;
  }

  async createUser({
    occupation,
    ...fields
  }: CreateUserProps): Promise<CreatedUser> {
    const response = await this.call({
      method: "POST",
      wsfunction: "core_user_create_users",
      args: {
        users: [
          {
            description: `occupation: ${occupation}`,
            ...fields,
          },
        ],
      },
    });

    const responseBody = (await response.json()) as MoodleResponse<
      CreatedUser[]
    >;

    if ("errorcode" in responseBody) {
      throw new Error(responseBody.message);
    }
    return responseBody[0];
  }

  async updateUser(userId: number, props: UpdateUserProps): Promise<null> {
    const data: any = {};
    if (props.firstname) data.firstname = props.firstname;
    if (props.lastname) data.lastname = props.lastname;
    if (props.email) data.email = props.email;
    if (props.password) data.password = props.password;
    if (props.country) data.country = props.country;
    if (props.occupation) data.description = `occupation: ${props.occupation}`;

    const response = await this.call({
      wsfunction: "core_user_update_users",
      method: "POST",
      args: {
        users: [
          {
            id: userId,
            ...data,
          },
        ],
      },
    });

    const responseBody = (await response.json()) as MoodleResponse<null>;

    if (responseBody && "errorcode" in responseBody) {
      throw new Error(responseBody.message);
    }
    return null;
  }

  call({
    wsfunction,
    args,
    method = "GET",
  }: {
    wsfunction: string;
    args: Record<string, unknown>;
    method?: "GET" | "POST";
  }) {
    const endpoint = new URL("webservice/rest/server.php", this.wwwroot);
    const params = {
      wstoken: this.token,
      wsfunction: wsfunction,
      moodlewsrestformat: "json",
      ...args,
    };

    if (method === "GET") {
      return fetch(endpoint + "?" + qs.stringify(params), {
        agent: this.httpsAgent,
      });
    } else {
      return fetch(endpoint, {
        agent: this.httpsAgent,
        method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
      });
    }
  }
}
