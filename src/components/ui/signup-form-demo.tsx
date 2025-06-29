"use client";
import React from "react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { OAuthStrategy } from "@clerk/types";

export default function SignupFormDemo() {
  const [formError, setFormError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  const handleOAuthSignUp = async (strategy: OAuthStrategy) => {
    if (!isLoaded) return;
    
    setIsLoading(true);
    setFormError("");
    
    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/user/dashboard",
        redirectUrlComplete: "/user/dashboard",
      });
    } catch (err: unknown) {
      const error = err as { errors?: Array<{ message?: string }> };
      setFormError(error.errors?.[0]?.message || `Error signing up with ${strategy}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to BudgetBuddy
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Take control of your finances - create your BudgetBuddy account today!
      </p>

      {formError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {formError}
        </div>
      )}

      <div className="my-8">
        <button
          className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          onClick={() => handleOAuthSignUp("oauth_google")}
          disabled={isLoading}
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            {isLoading ? "Signing up..." : "Continue with Google"}
          </span>
          <BottomGradient />
        </button>
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
