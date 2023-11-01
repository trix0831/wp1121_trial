"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { usePathname, useRouter } from "next/navigation";

import { cn, validateUsername } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

type NameInputProps = {
  userNum:number;
}

export default function NameInput({userNum}:NameInputProps) {
    const searchParams = useSearchParams();
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const [usernameError, setUsernameError] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // const user = await db
    // .select({
    //   displayName: usersTable.displayName,
    //   handle: usersTable.handle,
    // })
    // .from(usersTable)
    // .execute();

    const handleSave = () => {
      const username = usernameInputRef.current?.value;
      const handle = userNum.toString()
      const newUsernameError = !validateUsername(username);
      setUsernameError(newUsernameError);
  
      if (newUsernameError) {
        return false;
      }
  
      // when navigating to the same page with different query params, we need to
      // preserve the pathname, so we need to manually construct the url
      // we can use the URLSearchParams api to construct the query string
      // We have to pass in the current query params so that we can preserve the
      // other query params. We can't set new query params directly because the
      // searchParams object returned by useSearchParams is read-only.
      const params = new URLSearchParams(searchParams);
      // validateUsername and validateHandle would return false if the input is
      // invalid, so we can safely use the values here and assert that they are
      // not null or undefined.
      params.set("username", username!);
      params.set("handle", handle!);
      router.push(`${pathname}?${params.toString()}`);
  
      return true;
    };

  return (
    <>
        <div className="grid grid-cols-5 m-3">
          <div className="grid col-span-3 m-1">
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
            onClick={handleSave}
          >
            add user
          </button>

          <button
            className={cn(
              "m-1 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70",
              "disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40",
            )}
            onClick={() => alert('clicked')}
          >
            switch user
          </button>
        </div>  



    </>
  );
}
