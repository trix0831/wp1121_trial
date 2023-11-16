import { eq } from "drizzle-orm";
import { db } from "@/db";
import { documentsTable, usersToDocumentsTable, chatTable } from "@/db/schema";

export const createDocument = async (userId: string, friendName: string) => {
  "use server";
  console.log("[createDocument]");

  const newDocId = await db.transaction(async (tx) => {
    const [newDoc] = await tx
      .insert(documentsTable)
      .values({
        title: friendName,
        content: "content",
      })
      .returning();

    await tx.insert(usersToDocumentsTable).values({
      userId: userId,
      documentId: newDoc.displayId,
    });
    
    await tx.insert(chatTable).values({
      senderId: userId,
      documentId: newDoc.displayId,
      message: "chatRoomINIT",
    });

    return newDoc.displayId;
  });
  return newDocId;
};

export const getDocuments = async (userId: string) => {
  "use server";

  const documents = await db.query.usersToDocumentsTable.findMany({
    where: eq(usersToDocumentsTable.userId, userId),
    with: {
      document: {
        columns: {
          displayId: true,
          title: true,
        },
      },
    },
  });
  return documents;
};

export const deleteDocument = async (documentId: string) => {
  "use server";
  console.log("[deleteDocument]");
  await db
    .delete(documentsTable)
    .where(eq(documentsTable.displayId, documentId));

  // Also delete associated chat messages
  await db
    .delete(chatTable)
    .where(eq(chatTable.documentId, documentId));

  return;
};