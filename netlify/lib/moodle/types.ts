export type MoodleErrorResponse = {
  exception: string;
  errorcode: string;
  message: string;
  debuginfo?: string;
};

export type MoodleResponse<T> = T | MoodleErrorResponse;

export type MoodleUser = {
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

export type CreateUserProps = {
  username: MoodleUser["username"];
  // password: string;
  firstname: MoodleUser["firstname"];
  lastname: MoodleUser["lastname"];
  email: MoodleUser["email"];
  country: MoodleUser["country"];
  occupation: string;
};

export type CreatedUser = {
  id: MoodleUser["id"];
  username: MoodleUser["username"];
};

export type UpdateUserProps = Partial<{
  password: string;
  firstname: MoodleUser["firstname"];
  lastname: MoodleUser["lastname"];
  email: MoodleUser["email"];
  country: MoodleUser["country"];
  occupation: string;
}>;
