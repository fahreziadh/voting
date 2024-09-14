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

export default async function Home() {
  return (
    <div className="flex flex-row items-center justify-center h-screen gap-4">
      <Card className="h-[200px] w-[300px]">
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
      <Card className="h-[200px] w-[300px]">
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
    </div>
  );
}
