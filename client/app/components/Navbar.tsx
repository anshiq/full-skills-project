"use client";
import { axiosFetch, axiosFetchAuth } from "@/lib/axiosConfig";
import React, { useEffect, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
function Navbar() {
  const [toggleNav, setToggleNav] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && user === null) {
      axiosFetchAuth(token)
        .get("/api")
        .then((data) => {
          if (data.data.success) {
            setUser(data.data.data);
          }
        });
    }
  }, []);
  return (
    <nav className="bg-gray-800 mob:p-4 p-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-white text-lg font-bold w-[11rem]">
          My Full Project
        </span>
        <div
          className={
            "flex gap-2 bg-gray-800 w-full absolute flex-col p-2 mob:p-0 mob:gap-0 mob:flex-row mob:justify-between mob:static mob:top-auto" +
            (toggleNav
              ? " top-10 transition-top"
              : " top-[-11rem] transition-top")
            // (toggleNav ? " top-7" : " top-[-11rem]")
          }
        >
          <ul className="flex mob:space-x-4 mob:gap-0 gap-2 flex-col mob:flex-row ">
            <li className="text-white">Products</li>
            <li className="text-white">Solutions</li>
          </ul>
          <ul className="flex mob:space-x-4 mob:gap-0 gap-2 flex-col mob:flex-row ">
            <li className="text-white">Contact</li>
            <li onClick={() => setToggleNav(!toggleNav)} className="text-white">
              {!user ? (
                <a href="/user?type=0"> Login</a>
              ) : (
                <>
                  <User data={user} />
                </>
              )}
            </li>
            <li onClick={() => setToggleNav(!toggleNav)} className="text-white">
              {!user ? (
                <a href="/user?type=1">Signup </a>
              ) : (
                <button className="p-2 bg-red-300">Logout</button>
              )}
            </li>
          </ul>
        </div>
        <span
          onClick={() => {
            setToggleNav(!toggleNav);
          }}
          className="text-white flex mob:hidden items-center text-4xl justify-center cursor-pointer"
        >
          &#8801;
        </span>
      </div>
    </nav>
  );
}
const User = ({ data }: any) => {
  console.log(data);
  return <div>
        kohi</div>;
};
export default Navbar;
