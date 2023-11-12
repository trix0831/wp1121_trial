import { AiFillDelete, AiFillFileAdd, AiFillFileText } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import { createDocument, deleteDocument, getDocuments } from "./actions";
import { Input } from "@/components/ui/input";

async function Navbar() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;
  const documents = await getDocuments(userId);
  return (
    <nav className="flex w-full flex-col bg-gray-100 pb-10 h-[100vh]">
      <nav className="sticky top-0 flex flex-col items-center justify-between border-b bg-slate-100 pb-2">
        <div className="flex w-full items-center justify-between px-3 py-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">
              Chat
            </h1>
          </div>
            <form
              action={async () => {
                "use server";
                const newDocId = await createDocument(userId);
                revalidatePath("/docs");
                redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${newDocId}`);
              }}
            >
              <button
                type="submit"
                className="flex justify-end gap-2 m-2 hover:bg-slate-300"
              >
                {/* lg:px-14 md:px-6 sm:px-2 */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z" fill="#1C274C"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0574 1.25H11.9426C9.63424 1.24999 7.82519 1.24998 6.41371 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24998 7.82519 1.24999 9.63422 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V11.9426C22.75 9.63423 22.75 7.82519 22.5603 6.41371C22.366 4.96897 21.9607 3.82895 21.0659 2.93414C20.1711 2.03933 19.031 1.63399 17.5863 1.43975C16.1748 1.24998 14.3658 1.24999 12.0574 1.25ZM3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62177 2.75 12 2.75C14.3782 2.75 16.0864 2.75159 17.3864 2.92637C18.6648 3.09825 19.4355 3.42514 20.0052 3.9948C20.5749 4.56445 20.9018 5.33517 21.0736 6.61358C21.2484 7.91356 21.25 9.62177 21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C20.9018 18.6648 20.5749 19.4355 20.0052 20.0052C19.4355 20.5749 18.6648 20.9018 17.3864 21.0736C16.0864 21.2484 14.3782 21.25 12 21.25C9.62177 21.25 7.91356 21.2484 6.61358 21.0736C5.33517 20.9018 4.56445 20.5749 3.9948 20.0052C3.42514 19.4355 3.09825 18.6648 2.92637 17.3864C2.75159 16.0864 2.75 14.3782 2.75 12C2.75 9.62177 2.75159 7.91356 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948Z" fill="#1C274C"/>
                </svg>
              </button>
            </form>
        </div>
      </nav>
      
        <section className="w-11/12 relative flex justify-between items-center">
          <svg width="24" height="24" className="absolute ml-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.44 21.88C20.3399 21.88 21.88 20.3399 21.88 18.44C21.88 16.5401 20.3399 15 18.44 15C16.5401 15 15 16.5401 15 18.44C15 20.3399 16.5401 21.88 18.44 21.88Z" stroke="#64748b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M23.0009 23L20.8809 20.88" stroke="#64748b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21.6201 12.8401C21.8732 12.086 22.0015 11.2955 22 10.5C22 5.81 17.52 2 12 2C6.48 2 2 5.81 2 10.5C2.02247 11.6688 2.30308 12.8182 2.82172 13.8658C3.34035 14.9135 4.0842 15.8335 5 16.5601V19.91C4.99971 20.3202 5.11953 20.7214 5.34467 21.0642C5.5698 21.407 5.89043 21.6765 6.26691 21.8392C6.64338 22.0019 7.05924 22.0508 7.4632 21.9799C7.86715 21.9089 8.24151 21.7213 8.54004 21.4401L11.15 18.9801H12.02" stroke="#64748b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <Input
            placeholder="search user ..."
            className="pl-10 m-2 bg-gray-300 border rounded-2xl hover:bg-gray-200"
            >
          </Input>
        </section>
      

      <section className="flex w-full flex-col pt-3">
        {documents.map((doc, i) => {
          return (
            <div
              key={i}
              className="group flex w-full cursor-pointer items-center justify-between gap-2 text-slate-400 hover:bg-slate-200 "
            >
              <Link
                className="grow px-3 py-1"
                href={`/docs/${doc.document.displayId}`}
              >
                <div className="flex items-center gap-2">
                  <RxAvatar size={32}/>
                  <span className="text-sm font-light ">
                    {doc.document.title}
                  </span>
                </div>
              </Link>

              
              <form
                className="hidden px-2 text-slate-400 hover:text-red-400 group-hover:flex"
                action={async () => {
                  "use server";
                  const docId = doc.document.displayId;
                  await deleteDocument(docId);
                  revalidatePath("/docs");
                  redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs`);
                }}
              >
                <button type={"submit"}>
                  <AiFillDelete size={16} />
                </button>
              </form>
            </div>
          );
        })}
      </section>
    </nav>
  );
}

export default Navbar;
