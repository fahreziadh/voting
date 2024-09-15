"use client";
import { trpc } from "@/lib/trpc/client";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = trpc.getVote.useQuery({ id: params.id });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>{JSON.stringify(data)}</div>;
};

export default Page;