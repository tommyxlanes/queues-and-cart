"use client";

import { useActionState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

const initialState = null;

export function NewsletterForm() {
  const [state, action, isPending] = useActionState(
    subscribeToNewsletter,
    initialState,
  );

  if (state?.status === "success") {
    return <p className="text-green-600">✅ Thanks for subscribing!</p>;
  }

  return (
    <div className="flex justify-center p-8 bg-gray-200 mt-auto z-10">
      <form action={action} className="flex gap-2 max-w-sm">
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          className="flex-1 border rounded px-3 py-2"
          disabled={isPending}
        />

        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer hover:bg-gray-900 bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isPending ? "Joining…" : "Subscribe"}
        </button>

        {state?.status === "error" && (
          <p className="text-red-500 text-sm mt-1">{state.message}</p>
        )}
      </form>
    </div>
  );
}
