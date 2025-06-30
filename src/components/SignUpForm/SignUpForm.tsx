"use client";
import React, { useState } from "react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { montserrat } from "@/fonts/fonts";
import { useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";

export function SignupForm() {
  const [formError, setFormError] = useState("");

  const { isLoaded, signUp } = useSignUp();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center p-4">
        <p>Loading...</p>
      </div>
    );
  }

  const handleOAuthSignUp = async (strategy: OAuthStrategy) => {
    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/user/dashboard",
        redirectUrlComplete: "/user/dashboard",
      });
    } catch (err: unknown) {
      const error = err as { errors?: Array<{ message?: string }> };
      setFormError(error.errors?.[0]?.message || `Error signing up with ${strategy}`);
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

      <div className="my-8">
        <div className="flex flex-col space-y-4">
          <button 
            className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button" 
            onClick={() => handleOAuthSignUp("oauth_google")}
          >
            <IconBrandGoogle className="h-4 w-4" />
            <span className="text-sm">Continue with Google</span>
            <BottomGradient />
          </button>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);
