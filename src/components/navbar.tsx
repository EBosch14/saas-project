import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import { buttonVariants } from "./ui/button";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-300 bg-white/40 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-gray-300">
          <Link className="flex z-40 font-semibold" href="/">
            <span>ADT.</span>
          </Link>
          {/* {ADD Mobile navbar} */}
          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <Link
                href="/pricing"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}>
                Pricing
              </Link>
              <LoginLink
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}>
                Sign in
              </LoginLink>
              <RegisterLink
                className={buttonVariants({
                  size: "sm",
                })}>
                Get started
              </RegisterLink>
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
