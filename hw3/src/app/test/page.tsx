import Link from "next/link";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

type TestPageProps = {
    searchParams: {
      // this came from the query string: ?username=madmaxieee
      username?: string;
      handle?: string;
    };
  };

export default async function TestPage({
    searchParams: { username, handle },
  }: TestPageProps) {

    const user = await db
    .select({
      displayName: usersTable.displayName,
      handle: usersTable.handle,
    })
    .from(usersTable)
    .execute();

    return(
        <>
            <p>{user.length}</p>

            <div>
                {user.map((person) => (
                    <li>{person.displayName} {person.handle}</li>
                ))}
            </div>

            
        </>
    );
  }