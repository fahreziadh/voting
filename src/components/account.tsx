"use client";

import { CircleUserRound } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { trpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

const Account = () => {
  const { data, isLoading } = trpc.profile.useQuery();
  const user = data?.user;
  const router = useRouter();

  if (isLoading) {
    return (
      <Button
        variant={"outline"}
        disabled
        size={"icon"}
        className="rounded-full"
      >
        <CircleUserRound size={16} />
      </Button>
    );
  }

  if (!user) {
    return (
      <Button
        onClick={() => router.push("/api/auth/signin")}
        variant={"outline"}
      >
        Login
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="rounded-full">
          {user?.image ? (
            <Image
              src={user.image}
              width={32}
              height={32}
              alt={user.name ?? "user"}
              className="h-full w-full rounded-full"
            />
          ) : (
            <CircleUserRound size={16} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Button
          onClick={() => {
            signOut();
          }}
          className="w-full"
        >
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default Account;
