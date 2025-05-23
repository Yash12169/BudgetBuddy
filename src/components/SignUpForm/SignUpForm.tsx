"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { montserrat } from "@/fonts/fonts";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { OAuthStrategy } from "@clerk/types";

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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      setFormError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Starting signup process...");
      console.log("Signup data:", { firstName, lastName, emailAddress });
      
      const result = await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      console.log("Signup result:", result);

      if (result.status === "complete") {
        console.log("Signup complete, setting active session...");
        await setActive({ session: result.createdSessionId });
        router.push("/user/dashboard");
      } else if (result.status === "needs_verification") {
        console.log("Email verification needed");
        setFormError("Please check your email for verification link");
      } else if (result.status === "missing_requirements") {
        console.log("Missing requirements:", result);
        setFormError("Please fill in all required fields (First name, Last name, Email, and Password)");
      } else {
        console.log("Signup not complete, status:", result.status);
        setFormError(`Signup not complete. Status: ${result.status}`);
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      if (err.errors?.[0]?.code === "form_identifier_exists") {
        setFormError("An account with this email already exists");
      } else if (err.errors?.[0]?.code === "form_password_pwned") {
        setFormError("This password has been compromised. Please choose a different one.");
      } else {
        setFormError(err.errors?.[0]?.message || "An error occurred during sign up");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignUp = async (strategy: OAuthStrategy) => {
    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/user/dashboard",
        redirectUrlComplete: "/user/dashboard",
      });
    } catch (err: any) {
      setFormError(err.errors?.[0]?.message || `Error signing up with ${strategy}`);
    }
  };

  return (
    <div className={`${montserrat} max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-[#FFF8ED] text-[#1c1f58]`}>
      <h2 className="font-semibold text-xl">Welcome to BudgetBuddy</h2>
      <p className="text-sm max-w-sm mt-2">
        Take control of your finances - create your BudgetBuddy account today!
      </p>

      {formError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {formError}
        </div>
      )}

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname" className="text-[#1c1f58]">First name</Label>
            <Input 
              id="firstname" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              placeholder="Peter" 
              type="text" 
              required 
              className="text-[#1c1f58]"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className="text-[#1c1f58]">Last name</Label>
            <Input 
              id="lastname" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              placeholder="Griffin" 
              type="text" 
              required 
              className="text-[#1c1f58]"
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-[#1c1f58]">Email Address</Label>
          <Input 
            id="email" 
            value={emailAddress} 
            onChange={(e) => setEmailAddress(e.target.value)} 
            placeholder="yourname@example.com" 
            type="email" 
            required 
            className="text-[#1c1f58]"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="text-[#1c1f58]">Password</Label>
          <Input 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••" 
            type="password" 
            required 
            className="text-[#1c1f58]"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirmpassword" className="text-[#1c1f58]">Confirm Password</Label>
          <Input 
            id="confirmpassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="••••••••" 
            type="password" 
            required 
            className="text-[#1c1f58]"
          />
        </LabelInputContainer>

        <button 
          className="relative group/btn block bg-green-600 w-full text-white rounded-md h-10 font-semibold shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Sign up →"}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button 
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button" 
            onClick={() => handleOAuthSignUp("oauth_github")}
          >
            <IconBrandGithub className="h-4 w-4" />
            <span className="text-sm">Continue with GitHub</span>
            <BottomGradient />
          </button>
          <button 
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button" 
            onClick={() => handleOAuthSignUp("oauth_google")}
          >
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
