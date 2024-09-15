"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc/client";
import { Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { mutate: submitVote, isPending: isSubmitting } =
    trpc.createVote.useMutation({
      onSuccess(data) {
        if (data.length > 0) {
          router.replace(`/${data[0].id}`);
        }
      },
    });
  const refTitle = useRef<HTMLInputElement>(null);

  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setOptions(["", ""]);
  }, []);

  const removeOption = (index: number) => {
    if (options.length === 2) {
      alert("At least 2 options are required");
      return;
    }
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const addOption = (position: number) => {
    if (options.length === 10) {
      return alert("At most 10 options are allowed");
    }
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions.splice(position + 1, 0, "");
      return newOptions;
    });
  };

  const onSubmit = async () => {
    const title = refTitle.current?.value;
    if (!title) return;
    submitVote({ title, options });
  };

  return (
    <div className="pt-10">
      <Card>
        <CardHeader>
          <CardTitle>Create new Vote</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <Label>Title</Label>
            <Input placeholder="Title" ref={refTitle} />
          </div>
          <Label>Options</Label>
          {options.map((option, i) => {
            return (
              <div key={i} className="flex flex-row items-center gap-2">
                <Input
                  value={option}
                  onChange={(e) => {
                    setOptions((prevOptions) => {
                      const newOptions = [...prevOptions];
                      newOptions[i] = e.target.value;
                      return newOptions;
                    });
                  }}
                  placeholder={`Item ${i + 1}`}
                />
                <Button
                  onClick={() => {
                    removeOption(i);
                  }}
                  size={"icon"}
                  variant={"destructive"}
                >
                  <Trash size={16} />
                </Button>
                <Button
                  onClick={() => {
                    addOption(i);
                  }}
                  size={"icon"}
                  variant={"outline"}
                >
                  <Plus size={16} />
                </Button>
              </div>
            );
          })}
        </CardContent>
        <CardFooter>
          <Button disabled={isSubmitting} onClick={onSubmit}>
            {isSubmitting ? "Saving..." : "Save & Start new Vote"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
