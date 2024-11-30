"use client";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
function Header({user,profileInfo}) {
  const menuItems = [
    {
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "Login",
      path: "/sign-in",
      show: !user,
    },
    {
      label: "Register",
      path: "/sign-up",
      show: !user,
    },
    {
      label:"Feed",
      path:"/feed",
      show: profileInfo,
    },
    {
      label: "Jobs",
      path: "/jobs",
      show: user,
    },
    {
      label:"Membership",
      path:"/membership",
      show: user,
    },
    {
      label: "Account",
      path: "/account",
      show: user,
    }
  ];

  return (
    <div>
      <header className="flex h-16 w-full shrink-0 items-center">
        {/* For mobile screens  */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden">
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toggle Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link className="mr-6 hidden lg:flex" href={"#"}>
              <h3>JOBSCO</h3>
            </Link>
            <div className="grid gap-2 py-6">
              {menuItems.map((menuItems,index) =>
                menuItems.show ? (
                  <Link
                    href={menuItems.path}
                    onClick={()=>sessionStorage.removeItem('filterParams')}
                    key={index}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                  >
                    {menuItems.label}
                  </Link>
                ) : null
              )}
            {/* Component provided by clerk to sign out */}
          <UserButton afterSignOutUrl="/"/>
            </div>
          </SheetContent>
        </Sheet>
        {/* For larger screens  */}
        <Link className="hidden lg:flex mr-6" href={'#'}>JOBSCO</Link>
        <nav className="ml-auto hidden lg:flex gap-6">
          {
            menuItems.map((menuItems, index) =>
              menuItems.show ? (
                <Link
                  href={menuItems.path}
                  key={index}
                  className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4  py-2 text-sm font-medium"
                >
                  {menuItems.label}
                </Link>
              ) : null
            )
          }
          {/* Component provided by clerk to sign out */}
          <UserButton afterSignOutUrl="/"/> 
        </nav>
      </header>
    </div>
  );
}
export default Header;
