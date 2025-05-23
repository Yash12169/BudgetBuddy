"use server";

import { auth } from "@clerk/nextjs";

export async function handleSignOut() {
    const { signOut } = auth();
    await signOut();
}