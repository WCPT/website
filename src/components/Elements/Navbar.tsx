import { useRouter } from "next/router";
import NextLink from "next/link";
import cx from "clsx";

import Logo from "./Logo";
import Container from "./Container";

export const Navbar = () => {
  return (
    <nav>
      <Container className="relative py-6">
        <div className="flex justify-between">
          <NextLink href="/" className="flex items-center">
            <Logo dark className="w-14 h-14 mr-2" />
            <span className="hidden lg:block w-44 md:w-40 text-base font-light font-serif leading-snug">
              Wisdom Community of Pasifika Teachers
            </span>
          </NextLink>
          <div className="hidden md:flex gap-x-6">
            <Link href="https://online.fnu.ac.fj/course/view.php?id=3">
              Community
            </Link>
            <Link href="/events">Workshops & Events</Link>
            <Link href="/courses">Short courses</Link>
            <Link href="/sign-up">Become a member</Link>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;

const Link = ({
  href,
  className,
  children,
  ...props
}: React.ComponentProps<typeof NextLink>) => {
  const router = useRouter();
  const isActive = router.pathname.startsWith(href.toString());

  return (
    <div className="flex items-center">
      <NextLink
        href={href}
        className={cx("link relative py-4 px-1", className, {
          active: isActive,
        })}
        {...props}
      >
        {children}
      </NextLink>
      <style jsx>{`
        div > :global(.link):before {
          content: "";
          position: absolute;
          bottom: 0.25rem;
          left: 0;
          right: 0;
          height: 4px;
          opacity: 0;
          background: var(--color-text-base);
          transition: all 0.25s ease;
        }
        div > :global(.link):hover:before {
          opacity: 1;
        }
        div > :global(.link.active):before {
          background: var(--color-primary);
          opacity: 1;
        }
      `}</style>
    </div>
  );
};
