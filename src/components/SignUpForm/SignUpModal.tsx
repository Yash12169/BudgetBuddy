"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { SignupForm } from "./SignUpForm";
import { montserrat } from "@/fonts/fonts";

const SignUpModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
       onClick={() => setIsOpen(true)}
          className={`${montserrat}  bg-green-500 px-5 py-2 rounded-lg font-semibold cursor-pointer text-white`}
        >
          <p>Create an Account</p>
        </div>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

const SpringModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg w-full max-w-lg  cursor-default relative overflow-hidden"
          >
            <SignupForm/>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignUpModal;