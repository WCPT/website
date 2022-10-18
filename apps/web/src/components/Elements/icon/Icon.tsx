import React from 'react';
import Link from 'next/link';
import cx from 'classnames';

export const Icon: React.FC<{
  icon: React.ElementType;
  href: string;
  title: string;
  className: string;
}> = ({ icon: IconComponent, href, title, className }) => {
  return (
    <Link href={href}>
      <a title={title} target='_blank' rel='noopener'>
        <IconComponent
          className={cx(
            `mx-1 p-1.5 text-4xl sm:p-2.5 sm:text-5xl rounded-md transition-all duration-300`,
            className,
          )}
        />
      </a>
    </Link>
  );
};

export default Icon;
