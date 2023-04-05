import https from "https";
import fetch from "node-fetch";
import qs from "qs";

import {
  CreateUserProps,
  CreatedUser,
  MoodleResponse,
  MoodleUser,
  UpdateUserProps,
} from "./types";

/**
 * Represents the moodle API client
 */
export default class Client {
  private wwwroot: string; // The moodle hostname to connect to
  private token: string; // The access token to use
  private endpoint: URL; // The Moodle API endpoint to use
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
    this.endpoint = new URL("webservice/rest/server.php", this.wwwroot);
    // to ignore TLS cert verification failure
    this.httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
  }

  async getUserBy(
    key: "username" | "email",
    value: string | number
  ): Promise<MoodleUser | null> {
    const response = await this.get("core_user_get_users", {
      criteria: [{ key, value }],
    });

    const responseBody = (await response.json()) as MoodleResponse<{
      users: MoodleUser[];
    }>;

    if ("errorcode" in responseBody) {
      console.error(responseBody);
      throw new Error(responseBody.message);
    }

    if (responseBody.users?.length) {
      return responseBody.users[0];
    }
    return null;
  }

  async isUsernameAvailable(username: string) {
    const user = await this.getUserBy("username", username);
    return user === null;
  }

  async isUsernameTaken(username: string) {
    return !(await this.isUsernameAvailable(username));
  }

  async enrolUser(
    userId: number,
    courseId: number,
    roleId?: number
  ): Promise<null> {
    const response = await this.post("enrol_manual_enrol_users", {
      enrolments: [
        {
          userid: userId,
          courseid: courseId,
          roleid: roleId !== undefined ? roleId : 5,
        },
      ],
    });

    const responseBody = (await response.json()) as MoodleResponse<null>;

    if (responseBody && "errorcode" in responseBody) {
      console.error(responseBody);
      throw new Error(responseBody.message);
    }
    return null;
  }

  async createUser({
    occupation,
    ...fields
  }: CreateUserProps): Promise<CreatedUser> {
    const response = await this.post("core_user_create_users", {
      users: [
        {
          description: `occupation: ${occupation}`,
          ...fields,
          preferences: [{ type: "auth_forcepasswordchange", value: 1 }],
        },
      ],
    });

    const responseBody = (await response.json()) as MoodleResponse<
      CreatedUser[]
    >;

    if ("errorcode" in responseBody) {
      console.error(responseBody);
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

    const response = await this.post("core_user_update_users", {
      users: [
        {
          id: userId,
          ...data,
        },
      ],
    });

    const responseBody = (await response.json()) as MoodleResponse<null>;

    if (responseBody && "errorcode" in responseBody) {
      console.error(responseBody);
      throw new Error(responseBody.message);
    }
    return null;
  }

  get(wsfunction: string, args: Record<string, unknown>) {
    const params = {
      wstoken: this.token,
      wsfunction: wsfunction,
      moodlewsrestformat: "json",
      ...args,
    };

    return fetch(this.endpoint + "?" + qs.stringify(params), {
      agent: this.httpsAgent,
    });
  }

  post(wsfunction: string, args: Record<string, unknown>) {
    const params = {
      wstoken: this.token,
      wsfunction: wsfunction,
      moodlewsrestformat: "json",
      ...args,
    };

    return fetch(this.endpoint, {
      agent: this.httpsAgent,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify(params),
    });
  }
}
