"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { montserrat } from "@/fonts/fonts";
import { SignUpForm } from "../SignUp/signUp";

const SignUpModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <div
          className={`${montserrat}  bg-green-500 px-5 py-2 rounded-lg font-semibold cursor-pointer text-white`}
          onClick={() => setIsOpen(true)}
        >
          <p>Sign up with Google</p>
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
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-[10000] grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className=" rounded-lg w-full max-w-lg cursor-default relative overflow-hidden"
          >
            <SignUpForm/>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignUpModal;