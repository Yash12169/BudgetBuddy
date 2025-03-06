"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { montserrat } from "@/fonts/fonts";
import { Island_Moments } from "next/font/google";
import { Route } from "lucide-react";

export function SignupForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={`${montserrat} max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-[#FFF8ED] text-[#1c1f58]`}
    >
      <h2 className="font-semibold text-xl">Welcome to BudgetBuddy</h2>
      <p className=" text-sm max-w-sm mt-2 ">
        Take control of your finances create your BudgetBuddy account today!
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 text-[#1c1f58]">
          <LabelInputContainer>
            <Label htmlFor="firstname" className="text-[#1c1f58]">
              First name
            </Label>
            <Input
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Peter"
              type="text"
              className="text-[#1c1f58]"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className="text-[#1c1f58]">
              Last name
            </Label>
            <Input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              id="lastname"
              className="text-[#1c1f58]"
              placeholder="Griffin"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-[#1c1f58]">
            Email Address
          </Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-[#1c1f58]"
            placeholder="projectmayhem@fc.com"
            type="email"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="text-[#1c1f58]">
            Password
          </Label>
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-[#1c1f58]"
            placeholder="••••••••"
            type="password"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8 ">
          <Label htmlFor="confirmpassword" className="text-[#1c1f58] ">
            Confirm Password
          </Label>
          <Input
            id="confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="text-[#1c1f58] "
            type="password"
          />
        </LabelInputContainer>

        <button
          className="relative group/btn block bg-green-600 w-full text-white rounded-md h-10 font-semibold shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full  rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <div id="clerk-captcha" />
            <IconBrandGithub className="h-4 w-4 " />
            <span className=" text-sm">GitHub</span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full  rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 " />
            <span className="text-sm">Google</span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
