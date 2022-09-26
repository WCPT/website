import React from 'react';

type IProps = {
  credit: string;
};

export const Credit: React.FC<IProps> = ({ credit }) => {
  const [display, toggle] = React.useState(false);
  const toggleCredit = () => toggle((display) => !display);

  return (
    <div
      className='absolute bottom-0 right-0 z-50 px-3 py-1 text-sm xs:text-base text-gray-300 transition-all bg-black hover:text-white bg-opacity-80 cursor-pointer rounded-tl-md text-center'
      onClick={toggleCredit}
    >
      {display ? credit : 'Credit'}
    </div>
  );
};

export default Credit;
