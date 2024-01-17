"use client";
import React, { useState } from "react";
import { Login, SignUp } from "./components/Users";

export default function Page(props: any) {
  const lang: string | null = props.searchParams?.type || null;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <Form type={lang} />
      </div>
    </div>
  );
}

function Form({ type }: any) {
  const [toggleType, setToggleType] = useState(type);
  return (
    <>
      <div className="flex justify-around border-b">
        <div
          onClick={() => setToggleType("0")}
          className={`w-1/2 py-3 text-center cursor-pointer ${
            toggleType === "0" ? "bg-gray-300" : ""
          }`}
        >
          Login
        </div>
        <div
          onClick={() => setToggleType("1")}
          className={`w-1/2 py-3 text-center cursor-pointer ${
            toggleType === "1" ? "bg-gray-300" : ""
          }`}
        >
          Sign Up
        </div>
      </div>
      <div className="p-6">{toggleType === "0" ? <Login /> : <SignUp />}</div>
    </>
  );
}
