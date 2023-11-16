import { auth } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { sendMessage, addMessage } from "./actions";
import { Button } from "@/components/ui/button";

type MessageInputProps = {
  docID: string,
}

async function MessageInput({docID}:MessageInputProps) {
  const session = await auth();
  if (!session?.user?.id) return null;
  
  const userId = session.user.id;

  return (
    <>
    <form
        action={async (e) => {
            "use server";
            const newMessage = e.get("messageInput");

            console.log(newMessage);
            console.log(docID);
            console.log(userId);
            if (typeof newMessage == "string")
              await sendMessage(userId, docID, newMessage);
          }}>

        <Input 
            className="bg-gray-300 border rounded-2xl hover:bg-gray-200" 
            placeholder="please enter your message here"
            name="messageInput"
        />
        <Button type="submit">Send</Button>
    </form>
    </>
  );
}

export default MessageInput;
