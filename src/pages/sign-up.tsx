import React from "react";
import cx from "clsx";
import axios from "axios";
import { Formik, FormikErrors, FormikTouched } from "formik";
import { HiXCircle, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

import { ContentLayout } from "@/components/Layouts";
import { userRegistrationSchema } from "@/lib";

const occupations = [
  { label: "Select occupation", value: "" },
  {
    label: "Teacher - Early Child Education",
    value: "teacher:ECE",
  },
  { label: "Teacher - Primary", value: "teacher:primary" },
  { label: "Teacher - Secondary", value: "teacher:secondary" },
  { label: "Teacher - Tertiary", value: "teacher:tertiary" },
  { label: "Other", value: "other" },
];

const countries = [
  { label: "Select country", value: "" },
  { label: "American Samoa", value: "AS" },
  { label: "Cook Islands", value: "CK" },
  { label: "Fiji", value: "FJ" },
  { label: "French Polynesia", value: "PF" },
  { label: "Guam", value: "GU" },
  { label: "Kiribati", value: "KI" },
  { label: "Marshall Islands", value: "MH" },
  { label: "Micronesia, Federated States of", value: "FM" },
  { label: "Nauru", value: "NR" },
  { label: "New Caledonia", value: "NC" },
  { label: "Niue", value: "NU" },
  { label: "Northern Mariana Islands", value: "MP" },
  { label: "Palau", value: "PW" },
  { label: "Papua New Guinea", value: "PG" },
  { label: "Pitcairn", value: "PN" },
  { label: "Samoa", value: "WS" },
  { label: "Solomon Islands", value: "SB" },
  { label: "Tokelau", value: "TK" },
  { label: "Tonga", value: "TO" },
  { label: "Tuvalu", value: "TV" },
  { label: "Vanuatu", value: "VU" },
  { label: "Wallis and Futuna", value: "WF" },
].sort((a, b) => (a.label > b.label ? 1 : -1));

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  occupation: "",
  country: "",
};

export default function SignUpPage() {
  const [signedUpUser, setSignedUpUser] = React.useState<{
    email: string;
  } | null>(null);
  const [signUpError, setSignUpError] = React.useState<string>();

  return (
    <ContentLayout title="Become a member">
      <div className="grid lg:grid-cols-2 gap-16 xl:gap-28 justify-center">
        <div className="prose max-w-3xl text-lg text-skin-base">
          <h1 className="mb-10 text-5xl leading-tight font-normal">
            Empowering teachers in the Pacific region
          </h1>
          <p>
            WCPT is dedicated to empowering teachers in the Pacific region. One
            of its services is <i>Please Talanoa Karo, Pasifika!</i> — an
            engagement platform in Fiji National University’s Moodle, that
            enables members to collaborate and share experiences, information,
            resources, and ideas. Registering with WCPT automatically grants you
            access to <i>Please Talanoa Karo, Pasifika!</i>
          </p>
          <p>
            To become a member of WCPT, register by filling in the details in
            the form.
          </p>
        </div>
        <div className="-mx-8 sm:mx-0 sm:max-w-3xl bg-skin-inverted sm:rounded-md">
          {signedUpUser ? (
            <div className="text-skin-inverted">
              <div className="py-16 px-8 sm:p-16 lg:p-12 xl:p-16">
                <h2 className="text-2xl font-semibold mb-4">
                  Congratulations!
                  <br />
                  Your registration is confirmed.
                </h2>
                <p className="text-lg">
                  Please check your email{" "}
                  <span className="text-blue-400">{signedUpUser.email}</span> to
                  find the instructions to access{" "}
                  <strong>Please Talanoa Karo, Pasifika!</strong> on Moodle.
                </p>
              </div>
            </div>
          ) : (
            <div className="py-16 px-8 sm:p-16 lg:p-12 xl:p-16">
              <Formik
                initialValues={initialValues}
                validationSchema={userRegistrationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  axios
                    .post("/api/register-user", values)
                    .then((response) => {
                      if (response.status === 200) {
                        resetForm();
                        setSignedUpUser(response.data.user);
                      }
                    })
                    .catch(({ response }) => {
                      console.error(response.data);
                      setSignUpError(response.data.message);
                    })
                    .finally(() => {
                      setSubmitting(false);
                    });
                }}
              >
                {({
                  isValid,
                  errors,
                  touched,
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  submitCount,
                }) => (
                  <form
                    className="grid md:grid-cols-2 gap-6 lg:flex lg:flex-col"
                    onSubmit={handleSubmit}
                  >
                    <TextInput
                      name="firstname"
                      label="First name"
                      autoComplete="given-name"
                      placeholder="John"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstname}
                      required
                    />
                    <TextInput
                      name="lastname"
                      label="Last name"
                      autoComplete="family-name"
                      placeholder="Smith"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastname}
                      required
                    />
                    <TextInput
                      className="md:col-span-2"
                      name="email"
                      type="email"
                      label="Email"
                      autoComplete="email"
                      placeholder="johnsmith@example.com"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      required
                    />
                    {/* <TextInput
                    className="md:col-span-2"
                    name="password"
                    type="password"
                    label="Password"
                    autoComplete="password"
                    placeholder="********"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    required
                  /> */}
                    <SelectInput
                      name="occupation"
                      label="Occupation"
                      options={occupations}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.occupation}
                      required
                    />
                    <SelectInput
                      name="country"
                      label="Country"
                      options={countries}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.country}
                      required
                    />

                    {!isValid && submitCount > 0 ? (
                      <ErrorMessage errors={errors} touched={touched} />
                    ) : null}
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className={cx(
                          "flex items-center justify-center mt-4 lg:w-full px-8 py-3 bg-skin-primary-muted hover:bg-skin-accent text-skin-inverted hover:text-black rounded-full shadow-md transition-colors",
                          isSubmitting && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>

                      {signUpError ? (
                        <div className="mt-6 rounded-md bg-red-50 p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <HiXCircle
                                className="h-5 w-5 text-red-400"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-red-800">
                                {signUpError}
                              </h3>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </div>
    </ContentLayout>
  );
}

function TextInput({
  className,
  label,
  name,
  type,
  ...props
}: React.ComponentProps<"input"> & {
  label: string;
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [fieldType, setFieldType] = React.useState(type);

  React.useEffect(() => {
    if (type === "password") {
      if (showPassword) {
        setFieldType("text");
      } else {
        setFieldType(type);
      }
    }
  }, [showPassword]);

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-base font-medium text-skin-inverted-muted"
      >
        {label}
      </label>
      <div className="flex mt-1">
        <input
          id={name}
          name={name}
          type={fieldType}
          className="block w-full py-2 text-skin-inverted bg-transparent outline-none border-b border-gray-500"
          {...props}
        />
        {type === "password" ? (
          <button type="button" className="text-skin-inverted-muted">
            {showPassword ? (
              <HiOutlineEyeOff
                className="w-6 h-6 m-2"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <HiOutlineEye
                className="w-6 h-6 m-2"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </button>
        ) : null}
      </div>
      <style jsx>{`
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 50px var(--color-bg-inverted) inset !important;
          -webkit-text-fill-color: var(--color-text-inverted);
        }
      `}</style>
    </div>
  );
}

function SelectInput({
  label,
  name,
  options,
  ...props
}: React.ComponentProps<"select"> & {
  label: string;
  options: { label: string; value: string }[];
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-base font-medium text-skin-inverted-muted"
      >
        {label}
      </label>
      <div className="mt-1">
        <select
          id={name}
          name={name}
          className={cx(
            "block w-full py-2 bg-transparent outline-none border-b border-gray-500 cursor-pointer",
            props.value === "" ? "text-gray-400" : "text-skin-inverted"
          )}
          {...props}
        >
          {options.map(({ value, label }) => (
            <option
              key={value}
              value={value}
              disabled={value === ""}
              hidden={value === ""}
            >
              {label}
            </option>
          ))}
        </select>
      </div>
      <style jsx>{`
        select:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 50px var(--color-bg-inverted) inset !important;
          -webkit-text-fill-color: var(--color-text-inverted);
        }
      `}</style>
    </div>
  );
}

function ErrorMessage({
  errors,
  touched,
}: {
  errors: FormikErrors<typeof initialValues>;
  touched: FormikTouched<typeof initialValues>;
}) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <HiXCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            There was an error with your submission
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="list-disc space-y-1 pl-5">
              {errors.firstname && touched.firstname ? (
                <li>{errors.firstname}</li>
              ) : null}
              {errors.lastname && touched.lastname ? (
                <li>{errors.lastname}</li>
              ) : null}
              {errors.email && touched.email ? <li>{errors.email}</li> : null}
              {errors.country && touched.country ? (
                <li>{errors.country}</li>
              ) : null}
              {errors.occupation && touched.occupation ? (
                <li>{errors.occupation}</li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
