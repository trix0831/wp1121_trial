import { AiFillDelete, AiFillFileAdd, AiFillFileText } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import { createDocument, deleteDocument, getDocuments } from "./actions";

async function Sidebar() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;
  const documents = await getDocuments(userId);
  return (
    <nav className="flex w-full flex-col overflow-y-scroll bg-slate-100 pb-10">
      <nav className="sticky top-0 flex flex-col items-center justify-between border-b bg-slate-100 pb-2">
        <div className="flex w-full items-center justify-between px-3 py-1">
          <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 1024 1024" id="facebook-messenger"><defs><radialGradient id="a" cx="19.247%" cy="99.465%" r="108.96%" fx="19.247%" fy="99.465%"><stop offset="0%" stop-color="#09F"></stop><stop offset="60.975%" stop-color="#A033FF"></stop><stop offset="93.482%" stop-color="#FF5280"></stop><stop offset="100%" stop-color="#FF7061"></stop></radialGradient></defs><g fill="none" fill-rule="evenodd"><rect width="1024" height="1024" fill="none"></rect><path fill="url(#a)" d="M512,122 C286.668,122 112,287.056 112,510 C112,626.6144 159.792,727.3824 237.6224,796.984 C244.156,802.832 248.1,811.024 248.368,819.792 L250.5464,890.944 C251.2424,913.64 274.6856,928.408 295.4536,919.24 L374.848,884.192 C381.5784,881.224 389.12,880.672 396.212,882.624 C432.696,892.656 471.5264,898 512,898 C737.332,898 912,732.944 912,510 C912,287.056 737.332,122 512,122 Z"></path><path fill="#FFF" d="M271.8016,623.4688 L389.3016,437.0528 C407.992,407.3968 448.016,400.0128 476.06,421.0448 L569.5136,491.1352 C578.088,497.5672 589.8856,497.5328 598.424,491.0528 L724.6376,395.2648 C741.484,382.4808 763.4736,402.6408 752.2,420.5312 L634.7,606.9488 C616.008,636.6032 575.984,643.9888 547.9416,622.9552 L454.4856,552.8632 C445.912,546.4328 434.1136,546.4672 425.576,552.9472 L299.3616,648.7352 C282.516,661.5184 260.5256,641.3584 271.8016,623.4688 Z"></path></g></svg>
          </div>
        </div>

        <div className="grid grid-cols-3 mt-10">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M8 12H8.009M11.991 12H12M15.991 12H16" stroke="#1C274C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p className="col-span-2 ml-2 text-2xl inline-block align-middle">Chat</p>
        </div>


      </nav>

      <div className="absolute bottom-0 left-0 w-3/10 m-4">
        <div className="flex justify-between">
            {/* ... Your first bottom SVG path here ... */}
            <svg width="32" height="32" className="mb-4.5 ml-3 lg:mr-5 md:mr-3 sm:mr-1 bg-slate-100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="6" r="4" stroke="#1C274C" stroke-width="1.5"/>
                <path d="M19.9975 18C20 17.8358 20 17.669 20 17.5C20 15.0147 16.4183 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C14.231 22 15.8398 21.8433 17 21.5634" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
            </svg>

          <Link href={`/auth/signout`}>
            <Button
              variant={"ghost"}
              type={"submit"}
              className="mb-5 lg:ml-5 md:mr-3 sm:mr-1 bg-slate-100 hover:bg-slate-200"
            >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </Button>
          </Link>
        </div>
      </div>
      
       
    </nav>
  );
}

export default Sidebar;
