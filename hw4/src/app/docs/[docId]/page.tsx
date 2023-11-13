"use client";

import { useDocument } from "@/hooks/useDocument";
import { Input } from "@/components/ui/input";
import { RxAvatar } from "react-icons/rx";


function DocPage() {
  const { title, setTitle, content, setContent } = useDocument();
  return (
    <div className="m-2">
      <nav className="sticky top-0 flex items-center">
        <svg width="48" height="48" className="ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="9" r="3" stroke="#1C274C" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="10" stroke="#1C274C" strokeWidth="1.5"/>
          <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <p className="absolute px-16 py-4 rounded-lg ml-2 text-slate-700 text-3xl font-bold outline-0">Chat Room</p>

        {/* <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Chat User"
           focus:bg-slate-100"
        /> */}
      </nav>
      
      <section className="mt-5 h-[5vh]">
        <div className="w-full bg-gray-200 rounded-md flex justify-start items-center">
          <svg width="28" height="28" className="ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 7.99992V11.9999M10.25 5.49991H6.8C5.11984 5.49991 4.27976 5.49991 3.63803 5.82689C3.07354 6.11451 2.6146 6.57345 2.32698 7.13794C2 7.77968 2 8.61976 2 10.2999L2 11.4999C2 12.4318 2 12.8977 2.15224 13.2653C2.35523 13.7553 2.74458 14.1447 3.23463 14.3477C3.60218 14.4999 4.06812 14.4999 5 14.4999V18.7499C5 18.9821 5 19.0982 5.00963 19.1959C5.10316 20.1455 5.85441 20.8968 6.80397 20.9903C6.90175 20.9999 7.01783 20.9999 7.25 20.9999C7.48217 20.9999 7.59826 20.9999 7.69604 20.9903C8.64559 20.8968 9.39685 20.1455 9.49037 19.1959C9.5 19.0982 9.5 18.9821 9.5 18.7499V14.4999H10.25C12.0164 14.4999 14.1772 15.4468 15.8443 16.3556C16.8168 16.8857 17.3031 17.1508 17.6216 17.1118C17.9169 17.0756 18.1402 16.943 18.3133 16.701C18.5 16.4401 18.5 15.9179 18.5 14.8736V5.1262C18.5 4.08191 18.5 3.55976 18.3133 3.2988C18.1402 3.05681 17.9169 2.92421 17.6216 2.88804C17.3031 2.84903 16.8168 3.11411 15.8443 3.64427C14.1772 4.55302 12.0164 5.49991 10.25 5.49991Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          <p className="ml-4 text-semibold">Announcement</p>
        </div>
      </section>

      <section className="w-full px-4 py-4 h-[70vh] scroll-overflow">
        {/* <textarea
          value={content || ""}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          className="h-[70vh] w-full outline-0 "
        /> */}
      </section>
      
      <section className="m-2 flex items-center">
        <svg width="32" height="32" className="m-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g>
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zM13 3h8v8h-8V3zm0 10h8v8h-8v-8zm2-8v4h4V5h-4zm0 10v4h4v-4h-4zM5 5v4h4V5H5zm0 10v4h4v-4H5z"/>
          </g>
        </svg>

        <Input 
          className="bg-gray-300 border rounded-2xl hover:bg-gray-200" 
          type="text" 
          placeholder="please enter your message here"
        />
      </section>
    </div>
  );
}

export default DocPage;
