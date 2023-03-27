import Link from "next/link";

import Logo from "./Logo";
import Container from "./Container";

export const Navbar = () => {
  return (
    <nav className="bg-skin-secondary">
      <Container className="relative py-6">
        <div className="flex justify-around">
          <Link href="/" className="flex items-center">
            <Logo dark className="w-14 h-14 mr-2" />
            <span className="hidden sm:block w-44 md:w-40 text-base font-light font-serif leading-snug">
              Wisdom Community of Pasifika Teachers
            </span>
          </Link>
          <Link
            href="https://online.fnu.ac.fj/course/view.php?id=3"
            className="p-4"
          >
            Community
          </Link>
          <Link href="/events" className="p-4">
            Workshops & Events
          </Link>
          <Link href="/courses" className="p-4">
            Short courses
          </Link>
          <Link href="/signup" className="p-4">
            Become a member
          </Link>
          <div className="w-72" />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
