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
import { Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [options, setOptions] = useState<
    {
      id: string;
      item: string;
    }[]
  >([]);

  useEffect(() => {
    setOptions([
      { id: crypto.randomUUID(), item: "" },
      { id: crypto.randomUUID(), item: "" },
    ]);
  }, []);

  const removeOption = (id: string) => {
    if (!id) return;
    if (options.length === 2) {
      alert("At least 2 options are required");
      return;
    }
    setOptions((prevOptions) => {
      return prevOptions.filter((option) => option.id !== id);
    });
  };

  const addOption = (position: number) => {
    if (options.length === 10) {
        return alert("At most 10 options are allowed");
    }
    setOptions((prevOptions)=>{
        const newOptions = [...prevOptions];
        newOptions.splice(position+1, 0, {id: crypto.randomUUID(), item: ""})
        return newOptions
    })
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
            <Input placeholder="Title" />
          </div>
          <Label>Options</Label>
          {options.map((option, i) => {
            return (
              <div key={option.id} className="flex flex-row items-center gap-2">
                <Input
                  value={option.item}
                  onChange={(e) => {
                    setOptions((prevOptions) => {
                      const newOptions = [...prevOptions];
                      newOptions[i].item = e.target.value;
                      return newOptions;
                    });
                  }}
                  placeholder={`Item ${i + 1}`}
                />
                <Button
                  onClick={() => {
                    removeOption(option.id);
                  }}
                  size={"icon"}
                  variant={"destructive"}
                >
                  <Trash size={16} />
                </Button>
                <Button onClick={()=>{
                    addOption(i)
                }} size={"icon"} variant={"outline"}>
                  <Plus size={16} />
                </Button>
              </div>
            );
          })}
        </CardContent>
        <CardFooter>
          <Button>Save & Start new Vote</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
