// "use server"

// import { revalidatePath } from "next/cache";
// import { deleteDocument } from "../../_components/actions";
// import { redirect } from "next/navigation";
// import { publicEnv } from "@/lib/env/public";
// import { AiFillDelete } from "react-icons/ai";

// type DeleteChatProps = {
//     docID : string;
// }

// export async function DeleteChat({docID} : DeleteChatProps){

//     return (
        // <form
        //       className="hidden px-2 text-slate-400 hover:text-red-400 group-hover:flex"
        //       onSubmit={async (e) => {
        //         e.preventDefault();
                
        //         // const docId = doc.document.displayId;
        //         await deleteDocument(docID);
        //         revalidatePath("/docs");
        //         redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs`);
        //       }}
        //     >
        //       <button type="submit">
        //         <AiFillDelete size={16} />
        //       </button>
        // </form>

//     );
// }

// export default DeleteChat;

// deleteChat.tsx

import { revalidatePath } from "next/cache";
import { deleteDocument } from "../../_components/actions";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { AiFillDelete } from "react-icons/ai";

type DeleteChatProps = {
    docID : string;
}

const DeleteChat = ({docID} : DeleteChatProps) => {

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // const docId = doc.document.displayId;
        await deleteDocument(docID);
        revalidatePath("/docs");
        redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs`);
    };

    return (
        <form className="hidden px-2 text-slate-400 hover:text-red-400 group-hover:flex" onSubmit={handleDelete}>
            <button type="submit">
                <AiFillDelete size={16} />
            </button>
        </form>
    );
};

export default DeleteChat;
