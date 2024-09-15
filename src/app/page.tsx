"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { trpc } from "@/lib/trpc/client";

export default function Home() {
  return (
    <div className="flex flex-col p-6 gap-6">
      <Header />
      <ListVotes />
    </div>
  );
}

const ListVotes = () => {
  const { data: dataProfile, isLoading: isLoadingProfile } =
    trpc.profile.useQuery();
  const { data: dataVotes, isLoading: isLoadingVotes } =
    trpc.listVotesByUser.useQuery();

  if (isLoadingProfile || isLoadingVotes) {
    return <Card className="p-6">Loading...</Card>;
  }

  if (!dataProfile) {
    return (
      <Card className="p-6">
        Please{" "}
        <Link href={"/api/auth/signin"} className="text-blue-500">
          login
        </Link>{" "}
        to see your created votes
      </Card>
    );
  }

  if (!dataVotes || !dataVotes?.length) {
    return <Card className="p-6">No votes found</Card>;
  }

  return (
    <div>
      <h1 className="font-semibold mb-4">Your Votes</h1>
      <div className="grid grid-cols-2 gap-6">
        {dataVotes.map((item) => (
          <Link href={`/${item.id}`} key={item.id}>
            <Card className="hover:border-foreground">
              <CardHeader>{item.title}</CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <Card className="p-6 grid grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Create new Vote</CardTitle>
        </CardHeader>
        <CardContent>
          Crate a new vote for your favourite movie, tv show or book.
        </CardContent>
        <CardFooter>
          <Link href={"/create"} className="w-full">
            <Button className="w-full">Start new Vote</Button>
          </Link>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Join Vote</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Vote ID" />
        </CardContent>
        <CardFooter>
          <Button className="w-full">Join</Button>
        </CardFooter>
      </Card>
    </Card>
  );
};
