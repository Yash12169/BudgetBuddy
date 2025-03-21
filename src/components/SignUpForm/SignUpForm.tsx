"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { montserrat } from "@/fonts/fonts";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center p-4">
        <p>Loading...</p>
      </div>
    );
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUp.create({
        firstName,
        emailAddress,
        password,
      });

      console.log("Signup result:", result);

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/user/dashboard");
      } else {
        setFormError("Something went wrong with signup. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setFormError(err.errors?.[0]?.message || "An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignUp = async (provider) => {
    try {
      await signUp.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err) {
      console.error(err);
      setFormError(`Error signing up with ${provider}`);
    }
  };

  return (
    <div className={`${montserrat} max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-[#FFF8ED] text-[#1c1f58]`}>
      <h2 className="font-semibold text-xl">Welcome to BudgetBuddy</h2>
      <p className="text-sm max-w-sm mt-2">
        Take control of your finances - create your BudgetBuddy account today!
      </p>

      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
          {formError}
        </div>
      )}

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Peter" type="text" required />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Griffin" type="text" required />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} placeholder="yourname@example.com" type="email" required />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" required />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirmpassword">Confirm Password</Label>
          <Input id="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" type="password" required />
        </LabelInputContainer>

        <button className="relative block bg-green-600 w-full text-white rounded-md h-10 font-semibold shadow-input" type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Sign up →"}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button className="relative flex space-x-2 items-center justify-start px-4 w-full rounded-md h-10 font-medium shadow-input bg-gray-50" type="button" onClick={() => handleOAuthSignUp("oauth_github")}>
            <IconBrandGithub className="h-4 w-4" />
            <span className="text-sm">Continue with GitHub</span>
            <BottomGradient />
          </button>
          <button className="relative flex space-x-2 items-center justify-start px-4 w-full rounded-md h-10 font-medium shadow-input bg-gray-50" type="button" onClick={() => handleOAuthSignUp("oauth_google")}>
            <IconBrandGoogle className="h-4 w-4" />
            <span className="text-sm">Continue with Google</span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>
);
