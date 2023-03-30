import { Formik } from "formik";
import cx from "clsx";

import { ContentLayout } from "@/components/Layouts";

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

const SignUpPage = () => {
  return (
    <ContentLayout title="Become a member">
      <div className="grid lg:grid-cols-2 gap-16 xl:gap-28 justify-center">
        <div className="prose max-w-3xl text-lg text-skin-base">
          <h1 className="mb-10 text-5xl leading-tight">
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
          <div className="py-16 px-8 sm:p-16 lg:p-12 xl:p-16">
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                occupation: "",
                country: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
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
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="flex items-center justify-center mt-4 lg:w-full px-8 py-3 bg-skin-primary-muted hover:bg-skin-accent text-skin-inverted hover:text-black rounded-full shadow-md transition-colors"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default SignUpPage;

const TextInput = ({
  className,
  label,
  name,
  ...props
}: React.ComponentProps<"input"> & {
  label: string;
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-base font-medium text-skin-inverted-muted"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id={name}
          name={name}
          type="text"
          className="block w-full py-2 text-skin-inverted bg-transparent outline-none border-b border-gray-500"
          {...props}
        />
      </div>
      <style jsx>{`
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 50px var(--color-bg-inverted) inset !important;
          -webkit-text-fill-color: var(--color-text-inverted);
        }
      `}</style>
    </div>
  );
};

const SelectInput = ({
  label,
  name,
  options,
  ...props
}: React.ComponentProps<"select"> & {
  label: string;
  options: { label: string; value: string }[];
}) => {
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
};
