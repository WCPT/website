import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdClose, MdMenu } from "react-icons/md";
import cx from "clsx";

import Logo from "./Logo";
import Container from "./Container";

const links = [
  {
    href: "https://online.fnu.ac.fj/course/view.php?id=3",
    label: "Please Talanoa Karo, Pasifika!",
    newTab: true,
  },
  { href: "/events", label: "Workshops & Events" },
  { href: "/courses", label: "Short courses" },
  { href: "/sign-up", label: "Become a member" },
];

export const Navbar = ({ className }: { className?: string }) => {
  const [isMobileMenuVisible, setMobileMenuVisible] = React.useState(false);

  const toggleMobileMenu = () => setMobileMenuVisible(!isMobileMenuVisible);

  return (
    <nav>
      <Container className={cx("relative py-6", className)}>
        <div className="flex justify-between">
          <Link href="/" className="flex items-center">
            <Logo dark className="w-14 h-14 mr-2" />
            <span className="block w-40 md:w-40 text-base font-light font-serif leading-snug">
              Wisdom Community of Pasifika Teachers
            </span>
          </Link>
          {/* Desktop */}
          <div className="hidden lg:flex gap-x-6">
            {links.map(({ href, label, newTab }) => (
              <DesktopLink
                key={href}
                href={href}
                target={newTab ? "_blank" : "_self"}
                referrerPolicy="no-referrer"
              >
                {label}
              </DesktopLink>
            ))}
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden justify-center items-center">
            <MenuButton icon={MdMenu} onClick={toggleMobileMenu} />
            <div
              className={cx(
                "fixed inset-0 min-h-screen bg-skin-inverted transition-opacity duration-200",
                isMobileMenuVisible
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              )}
            >
              <Container className="relative flex flex-col py-6 h-full">
                <div className="flex justify-between items-center">
                  <Link href="/" className="flex items-center">
                    <Logo className="w-14 h-14 mr-2" />
                    <span className="block w-40 md:w-40 text-base text-skin-inverted font-light font-serif leading-snug">
                      Wisdom Community of Pasifika Teachers
                    </span>
                  </Link>
                  <div>
                    <MenuButton
                      icon={MdClose}
                      className="text-gray-300"
                      onClick={toggleMobileMenu}
                    />
                  </div>
                </div>

                <div className="flex flex-col my-16 divide-y divide-stone-600">
                  {links.map(({ href, label }) => (
                    <MobileLink key={href} href={href}>
                      {label}
                    </MobileLink>
                  ))}
                </div>

                <div className="mt-auto mx-auto py-4 text-skin-inverted-muted text-sm">
                  Supported by Fiji National University
                </div>
              </Container>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;

const MenuButton = ({
  icon: Icon,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  icon: React.ElementType;
}) => {
  return (
    <button
      type="button"
      className={cx("p-2 rounded-md", className)}
      {...props}
    >
      <Icon size={32} />
    </button>
  );
};

const DesktopLink = ({
  href,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Link>) => {
  const router = useRouter();
  const isActive = router.pathname.startsWith(href.toString());

  return (
    <div className="flex items-center">
      <Link
        href={href}
        className={cx("link relative py-4 px-1", className, {
          active: isActive,
        })}
        {...props}
      >
        {children}
      </Link>
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

const MobileLink = ({
  href,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Link>) => {
  const router = useRouter();
  const isActive = router.pathname.startsWith(href.toString());

  return (
    <div className="flex flex-col">
      <Link
        href={href}
        className={cx(
          "link py-4 text-skin-inverted text-xl font-serif",
          className,
          {
            active: isActive,
          }
        )}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
};
