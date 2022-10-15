import React from "react";
import cx from "classnames";

export const StatsSection: React.FC<{
  engagements: string | number;
  registered: string | number;
  participants: string | number;
  lifetimeInMonths: string | number;
}> = ({ engagements, registered, participants, lifetimeInMonths }) => {
  return (
    <section className="relative lg:pt-12 bg-skin-secondary">
      <div className="pt-24 pb-44 bg-skin-secondary">
        <div className="2xl:container mx-auto px-8 sm:px-12">
          <div className="flex flex-col justify-center items-center mb-20">
            <h1 className="sm:mb-8 max-w-2xl text-center text-2xl sm:text-3xl md:text-4xl leading-snug md:leading-snug text-skin-base font-light">
              We are an active, growing community in the wider Pacific region
            </h1>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-y-16 lg:px-32 xl:px-0">
            <Stat
              className="xl:border-r border-gray-300"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-2 h-20 w-20 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.9"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
              stat={engagements}
              text="Engagements to connect, create and collaborate"
            />
            <Stat
              className="xl:border-r border-gray-300"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-2 h-20 w-20 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.9"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              }
              stat={registered}
              text="Registered members from across the Pacific region"
            />
            <Stat
              className="xl:border-r border-gray-300"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-2 h-20 w-20 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.9"
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              }
              stat={participants}
              text="Participants in professional development events"
            />
            <Stat
              className=""
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-2 h-20 w-20 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.9"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              stat={lifetimeInMonths}
              text={`We are ${lifetimeInMonths} ${
                lifetimeInMonths > 1 ? "months" : "month"
              } old`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat: React.FC<{
  icon: React.ReactNode;
  stat: string | number;
  text: string;
  className?: string;
}> = ({ icon, stat, text, className }) => {
  return (
    <div
      className={cx(
        `flex flex-col items-center px-6 xl:px-8 text-center`,
        className
      )}
    >
      {icon}
      <span className="my-4 text-4xl md:text-5xl md:font-normal text-skin-primary">
        {stat}
      </span>
      <span className="max-w-xs text-2xl leading-normal font-light text-skin-base">
        {text}
      </span>
    </div>
  );
};

export default StatsSection;
