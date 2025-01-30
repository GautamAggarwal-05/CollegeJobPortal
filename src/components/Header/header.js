"use client";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { AlignJustify, Moon } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import{useTheme} from "next-themes"
function Header({profileInfo,user}) {
  const {theme,setTheme} = useTheme()
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
      label:"Companies",
      path:"/companies",
      show: profileInfo?.role==='student',
    },
    {
      label: "Jobs",
      path: "/jobs",
      show: profileInfo,
    },
    {
      label: "Account",
      path: "/account",
      show: profileInfo,
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
            {/* Add a visually hidden DialogTitle for accessibility */}
          <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
          <Link
            className="text-black lg:flex mr-6 text-4xl font-bold"
            href={'#'}>
            JOBSCO
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
              <Moon
                className="cursor-pointer mb-4"
                fill={theme === 'dark'?'light':'dark'}
                onClick={()=>setTheme(theme==='light'?'dark':'light')}
                />
            {/* Component provided by clerk to sign out */}
          <UserButton afterSignOutUrl="/"/>
            </div>
          </SheetContent>
        </Sheet>
        {/* For larger screens  */}
        <Link className="hidden lg:flex mr-6 text-4xl font-bold" href={'#'}>JOBSCO</Link>
        <nav className="ml-auto hidden lg:flex gap-6 items-center">
          {
            menuItems.map((menuItems, index) =>
              menuItems.show ? (
                <Link
                  href={menuItems.path}
                  key={index}
                  className="group inline-flex h-9 w-max items-center rounded-md  px-4  py-2 text-sm font-medium"
                >
                  {menuItems.label}
                </Link>
              ) : null
            )
          }
          <Moon
          className="cursor-pointer"
          fill={theme === 'dark'?'light':'dark'}
          onClick={()=>setTheme(theme==='light'?'dark':'light')}
          />
          {/* Component provided by clerk to sign out */}
          <UserButton afterSignOutUrl="/"/> 
        </nav>
      </header>
    </div>
  );
}
export default Header;
