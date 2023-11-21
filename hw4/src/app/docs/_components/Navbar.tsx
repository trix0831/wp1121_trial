import { AiFillDelete} from "react-icons/ai";

import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import { deleteDocument, getDocuments } from "./actions";
import { Input } from "@/components/ui/input";

import CreateDialog from "../[docId]/_components/CreateDialog";
import SearchBar from "../[docId]/_components/SearchBar";

type NavbarProps = {
  sp:string;
}

async function Navbar({sp}:NavbarProps) {
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

          <CreateDialog/>
        </div>
      </nav>
      
        <section className="w-11/12 relative flex justify-between items-center">
          <svg width="24" height="24" className="absolute ml-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.44 21.88C20.3399 21.88 21.88 20.3399 21.88 18.44C21.88 16.5401 20.3399 15 18.44 15C16.5401 15 15 16.5401 15 18.44C15 20.3399 16.5401 21.88 18.44 21.88Z" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23.0009 23L20.8809 20.88" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21.6201 12.8401C21.8732 12.086 22.0015 11.2955 22 10.5C22 5.81 17.52 2 12 2C6.48 2 2 5.81 2 10.5C2.02247 11.6688 2.30308 12.8182 2.82172 13.8658C3.34035 14.9135 4.0842 15.8335 5 16.5601V19.91C4.99971 20.3202 5.11953 20.7214 5.34467 21.0642C5.5698 21.407 5.89043 21.6765 6.26691 21.8392C6.64338 22.0019 7.05924 22.0508 7.4632 21.9799C7.86715 21.9089 8.24151 21.7213 8.54004 21.4401L11.15 18.9801H12.02" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          <SearchBar/>
          
        </section>
      

      <section className="flex w-full flex-col pt-3">
      {documents.map((doc, i) => {
          if(!sp) {
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
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="9" r="3" stroke="#000000" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="10" stroke="#000000" strokeWidth="1.5"/>
                      <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span className="text-sm font-semibold text-black">
                      {sp}
                    </span>
                  </div>
                </Link>

                <form
                  className="hidden px-2 text-slate-400 hover:text-red-400 group-hover:flex"
                  onSubmit={async (e) => {
                    "use server";
                    e.preventDefault();
                    
                    const docId = doc.document.displayId;
                    await deleteDocument(docId);
                    revalidatePath("/docs");
                    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs`);
                  }}
                >
                  <button type="submit">
                    <AiFillDelete size={16} />
                  </button>
                </form>
              </div>
            );
          }

          else if (doc.document.title.includes(sp)) {
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
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="9" r="3" stroke="#000000" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="10" stroke="#000000" strokeWidth="1.5"/>
                      <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span className="text-sm font-semibold text-black">
                      {doc.document.title}
                    </span>
                  </div>
                </Link>

                <form
                  className="hidden px-2 text-slate-400 hover:text-red-400 group-hover:flex"
                  onSubmit={async (e) => {
                    "use server";
                    e.preventDefault();
                    
                    const docId = doc.document.displayId;
                    await deleteDocument(docId);
                    revalidatePath("/docs");
                    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs`);
                  }}
                >
                  <button type="submit">
                    <AiFillDelete size={16} />
                  </button>
                </form>
              </div>
            );
          }
        })}
      </section>
    </nav>
  );
}

export default Navbar;
