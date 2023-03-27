import React from "react";

export const Logo = ({
  dark,
  ...props
}: React.ComponentProps<"svg"> & { dark?: boolean }) => {
  const colors = dark
    ? { text: "#fff", bg: "#000" }
    : { text: "#000", bg: "#fff" };

  return (
    <svg viewBox="0 0 386 386" {...props}>
      <rect
        fill={colors.bg}
        x="230"
        y="130"
        width="126"
        height="126"
        transform="translate(222 -150) rotate(45)"
      />
      <path
        fill={colors.text}
        d="M298.07,167.05a44.29,44.29,0,0,1,13.17,1.74,25.28,25.28,0,0,1,9.13,4.84,19,19,0,0,1,5.29,7.37,24.7,24.7,0,0,1,1.71,9.28,25.68,25.68,0,0,1-1.79,9.73,19.89,19.89,0,0,1-5.42,7.59,25.43,25.43,0,0,1-9.15,4.94,42.66,42.66,0,0,1-12.93,1.76h-9.71v24.76H273v-72Zm0,35.83q7.21,0,10.56-3.37t3.35-9.23a13.6,13.6,0,0,0-.84-4.89,9.74,9.74,0,0,0-2.56-3.77,11.61,11.61,0,0,0-4.32-2.41,20.2,20.2,0,0,0-6.19-.84h-9.71v24.51Z"
      />
      <rect
        fill={colors.bg}
        x="132"
        y="227"
        width="126"
        height="126"
        transform="translate(262 -53) rotate(45)"
      />
      <path
        fill={colors.text}
        d="M223.58,276.84H201.9v60H186.51v-60H164.83v-12h58.74Z"
      />
      <rect
        fill={colors.bg}
        x="34"
        y="129"
        width="126"
        height="126"
        transform="translate(164 -12) rotate(45)"
      />
      <path
        fill={colors.text}
        d="M149.27,167.06l-23,72H112.41L97.22,192q-.36-1-.72-2.18t-.67-2.53q-.31,1.34-.66,2.53T94.46,192L79.12,239.06H65.22l-23-72H55.15a6,6,0,0,1,3.35.89,4.08,4.08,0,0,1,1.76,2.38l11.5,40.59q.41,1.69.84,3.65t.84,4.14q.46-2.23,1-4.17t1.13-3.62l13.4-40.59a4.74,4.74,0,0,1,1.76-2.26,5.34,5.34,0,0,1,3.3-1h4.5a5.36,5.36,0,0,1,3.25.92,5.59,5.59,0,0,1,1.87,2.36L117,210.92a36.2,36.2,0,0,1,1.13,3.45q.51,1.86,1,3.94.41-2.08.79-3.94t.79-3.45l11.5-40.59a4.25,4.25,0,0,1,1.74-2.28,5.54,5.54,0,0,1,3.32-1Z"
      />
      <rect
        fill={colors.bg}
        x="131"
        y="31"
        width="126"
        height="126"
        transform="translate(124 -110) rotate(45)"
      />
      <path
        fill={colors.text}
        d="M217.15,112.76a2.88,2.88,0,0,1,2.15.89l6.08,6.3a28.85,28.85,0,0,1-11.17,8.44,39.9,39.9,0,0,1-15.87,2.88,38.81,38.81,0,0,1-15-2.75,32.45,32.45,0,0,1-11.3-7.67,33.87,33.87,0,0,1-7.16-11.66,44.29,44.29,0,0,1-1.3-24.94,35.22,35.22,0,0,1,3.5-8.91A34.51,34.51,0,0,1,172.65,68,33.3,33.3,0,0,1,180,62.41a35.88,35.88,0,0,1,8.92-3.52,42.09,42.09,0,0,1,10.3-1.22,41.46,41.46,0,0,1,7.75.69,38.47,38.47,0,0,1,6.83,1.94,31.75,31.75,0,0,1,5.85,3,32.63,32.63,0,0,1,4.83,3.85L219.3,74a4.74,4.74,0,0,1-1.18,1.14,3.36,3.36,0,0,1-1.94.5,4.42,4.42,0,0,1-2.48-.84q-1.25-.84-3.07-1.89A22.61,22.61,0,0,0,206.08,71a23.93,23.93,0,0,0-6.93-.84,21.76,21.76,0,0,0-8.54,1.64,18.53,18.53,0,0,0-6.67,4.74,21.66,21.66,0,0,0-4.32,7.62,31.84,31.84,0,0,0-1.53,10.27,30,30,0,0,0,1.66,10.35,22.55,22.55,0,0,0,4.55,7.67,19.12,19.12,0,0,0,6.75,4.74,21.19,21.19,0,0,0,8.26,1.61,40.93,40.93,0,0,0,4.73-.25,20.14,20.14,0,0,0,3.94-.84,17.64,17.64,0,0,0,3.42-1.54,21,21,0,0,0,3.25-2.38,6.29,6.29,0,0,1,1.18-.74A3,3,0,0,1,217.15,112.76Z"
      />
    </svg>
  );
};

export default Logo;