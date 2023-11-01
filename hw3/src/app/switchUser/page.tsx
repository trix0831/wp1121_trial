import Link from "next/link";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { Separator } from "@radix-ui/react-separator";

type SwitchUserPageProps = {
      // this came from the query string: ?username=madmaxieee
      username?: string;
      handle?: string;
  };

export default async function TestPage(
    { username, handle }: SwitchUserPageProps) {

    const user = await db
    .select({
      displayName: usersTable.displayName,
      handle: usersTable.handle,
      id: usersTable.id,
    })
    .from(usersTable)
    .execute();

    return(
        <>
            <p>Click on the user you want to switch to.</p>
            
            <div>
                {user.map((person) => (
                    <li className="m-5">
                        <Link
                            className="w-full px-4 pt-3 transition-colors hover:bg-gray-75"
                            href={{
                                pathname: "/",
                                query: {
                                username: person.displayName, // Pass the username from the user object
                                handle: person.handle, // Pass the handle from the user object
                                },
                            }}
                            >
                                {person.displayName}
                        </Link>
                    </li>
                ))}
            </div>

            
        </>
    );
  }