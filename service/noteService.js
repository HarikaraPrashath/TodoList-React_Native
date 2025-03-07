import { ID, Query } from "appwrite"; // Ensure this import is correct
import databaseService from "./databaseService";

// ✅ Validate environment variables before use
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_NOTES;

if (!dbId || !colId) {
  throw new Error(
    "Missing Appwrite database or collection ID in environment variables."
  );
}

const noteService = {
  // Get Notes
  async getNotes(userId) {
    console.log("User id form note", userId)
    if (!userId) {
      console.error("Error: Missing user ID in getNotes()");
      return { data: [], error: "User ID is missing" };
    }
  
    try {
      const { data, error } = await databaseService.listDocuments(dbId, colId, [
        Query.equal("user_id", userId),
      ]);
      
      if (error) {
        return { data: [], error:error.message };
      }
      
      return { data }; // ✅ Return only `data`, not wrapped in another object
    } catch (error) {
      return { data: [], error: error.message || "Failed to fetch notes" };
    }
  },
  

  // Add new Note
  async addNote(user_id,newNote) {
    if (!newNote) {
      g;
      return { error: "Note text is required" };
    }
    console.log("text on node", newNote); // coming
    try {
      const data = {
        text: newNote,
        createAt: new Date().toISOString(),
        user_id: user_id,
      };
      const response = await databaseService.createDocument(
        dbId,
        colId,
        ID.unique(),
        data
      );
      return response?.error
        ? { error: response.error }
        : { success: true, response };
    } catch (error) {
      return { error: error.message || "Failed to add note" };
    }
  },
  // Update Note
  // async updateNote(id, data) {
  //   if (!id) {
  //     return { error: "Note ID is required" };
  //   }
  //   if (!data || Object.keys(data).length === 0) {
  //     return { error: "Update data is required" };
  //   }
  //   try {
  //     const response = await databaseService.updateDocument(dbId, colId, id, data);
  //     return response?.error ? { error: response.error } : { success: true, response };
  //   } catch (error) {
  //     return { error: error.message || "Failed to update note" };
  //   }
  // },

  //Delete Note
  async deleteNote(id) {
    if (!id) {
      return { error: "Note ID is required" };
    }
    try {
      const response = await databaseService.deleteDocument(dbId, colId, id);
      return response?.error ? { error: response.error } : { success: true };
    } catch (error) {
      return { error: error.message || "Failed to delete note" };
    }
  },
};
export default noteService;
