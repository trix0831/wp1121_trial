"use server"

import { revalidatePath } from "next/cache";
import { deleteDocument } from "./actions";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { AiFillDelete } from "react-icons/ai";

type DeleteChatProps = {
    docID : string;
}

function DeleteChat({docID} : DeleteChatProps){

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
// "use server"
// import { useMutation, useQueryClient } from 'react-query';
// import { revalidatePath } from 'next/cache';
// import { deleteDocument } from './actions';
// import { redirect } from 'next/navigation';
// import { publicEnv } from '@/lib/env/public';
// import { AiFillDelete } from 'react-icons/ai';

// type DeleteChatProps = {
//   docID: string;
// };

// const DeleteChat = ({ docID }: DeleteChatProps) => {
//   const queryClient = useQueryClient();

//   const mutation = useMutation<void, Error, string>(
//     async (docID) => {
//       // Your deleteDocument function or API call
//       await deleteDocument(docID);
//     },
//     {
//       onSuccess: () => {
//         // Handle success, for example, refetch data
//         queryClient.invalidateQueries('yourQueryKey');
//         // Redirect or perform other actions after successful deletion
//         revalidatePath('/docs');
//         redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs`);
//       },
//     }
//   );

//   const handleDelete = async (e: React.FormEvent) => {
//     e.preventDefault();

//     mutation.mutate(docID);
//   };

//   return (
//     <form className="hidden px-2 text-slate-400 hover:text-red-400 group-hover:flex" onSubmit={handleDelete}>
//       <button type="submit" disabled={mutation.isLoading}>
//         {mutation.isLoading ? <span>Loading...</span> : <AiFillDelete size={16} />}
//       </button>
//     </form>
//   );
// };

// export default DeleteChat;
