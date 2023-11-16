import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable, usersToDocumentsTable, chatTable } from "@/db/schema";

export async function getDocumentAuthors(docId: string) {
  const dbAuthors = await db.query.usersToDocumentsTable.findMany({
    where: eq(usersToDocumentsTable.documentId, docId),
    with: {
      user: {
        columns: {
          displayId: true,
          username: true,
          email: true,
        },
      },
    },
    columns: {},
  });

  const authors = dbAuthors.map((dbAuthor) => {
    const author = dbAuthor.user;
    return {
      id: author.displayId,
      username: author.username,
      email: author.email,
    };
  });

  return authors;
}

export const addDocumentAuthor = async (docId: string, username: string) => {
  // Find the user by email
  const [user] = await db
    .select({
      displayId: usersTable.displayId,
    })
    .from(usersTable)
    .where(eq(usersTable.username, username));

  await db.insert(usersToDocumentsTable).values({
    documentId: docId,
    userId: user.displayId,
  });
};

export const addMessage = async (docId: string, senderID: string, message:string) => {
  await db.insert(chatTable).values({
    documentId: docId,
    senderId: senderID,
    message: message,
  });
};

export const sendMessage = async (userId: string, documentId: string, message: string) => {
  "use server";
  console.log("[sendMessage]");

  await db.transaction(async (tx) => {
    await tx.insert(chatTable).values({
      senderId: userId,
      documentId: documentId,
      message: message,
    });
  });

  return;
};



export const userExisted = async (username: string) => {
  // Find the user by email
  const [user] = await db
    .select({
      displayId: usersTable.displayId,
    })
    .from(usersTable)
    .where(eq(usersTable.username, username));

  if (!user) {
    console.log("here");
    return false;
  }
  else
    return true;
};
