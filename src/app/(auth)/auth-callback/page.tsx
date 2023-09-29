"use client";

import { trpc } from "@/app/_trpc/client";
import { Loader2Icon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, isLoading } = trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        router.push(origin ? `/${origin}` : "/dashboard");
      }
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") router.push("/sign-in");
    },
    retry: true,
    retryDelay: 1000,
  });

  return (
    <div className="w-full flex justify-center mt-40">
      <div className="flex flex-col items-center gap-2">
        <Loader2Icon className="h-8 w-8 animate-spin text-gray-800" />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically</p>
      </div>
    </div>
  );
};

export default AuthCallback;
