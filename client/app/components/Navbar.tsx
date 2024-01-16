"use client";
import React from "react";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex  items-center">
        <span className="text-white text-lg font-bold">My Full Project</span>
        <div className="flex bg-red-300 justify-between w-full space-x-4">
          <ul className="flex space-x-4">
            <li className="text-white">Products</li>
            <li className="text-white">Solutions</li>
          </ul>
          <ul className="flex space-x-4">
            <li className="text-white">Contact</li>
            <li className="text-white">Login</li>
            <li className="text-white">Signup</li>
          </ul>
        </div>
        <span className="text-white  cursor-pointer">&#8801;</span>
      </div>
    </nav>
  );
}

export default Navbar;
