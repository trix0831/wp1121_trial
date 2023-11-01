"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

export default function NameInput() {
    const searchParams = useSearchParams();
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const [usernameError, setUsernameError] = useState(false);

  return (
    <>
        <div className="grid grid-cols-3 m-3">
          <div className="grid col-span-2 m-1">
            <Input
                placeholder="Enter new user name"
                defaultValue={searchParams.get("username") ?? ""}
                className={cn(usernameError && "border-red-500", "col-span-3")}
                ref={usernameInputRef}
                />{usernameError && (
                    <p className="col-span-3 col-start-2 text-xs text-red-500">
                      Invalid username, use only{" "}
                      <span className="font-mono">[a-z0-9 ]</span>, must be between 1
                      and 50 characters long.
                    </p>
                  )}
          </div>
          <button
            className={cn(
              "m-1 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70",
              "disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40",
            )}
            onClick={() => alert('clicked')}
          >
            switch
          </button>
        </div>  



    </>
  );
}
