import { ID } from "appwrite";  // Ensure this import is correct
import databaseService from "./databaseService";

// ✅ Validate environment variables before use
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_NOTES;

if (!dbId || !colId) {
  throw new Error("Missing Appwrite database or collection ID in environment variables.");
}

const noteService = {
  // Get Notes
  async getNotes() {
    try {
      const response = await databaseService.listDocuments(dbId, colId);
      return response?.error ? { error: response.error } : { response };
    } catch (error) {
      return { error: error.message || "Failed to fetch notes" };
    }
  },

  // Add new Note
  async addNote(newNote) {
    if (!newNote) {
      g
      return { error: "Note text is required" };
    }
    console.log("text on node", newNote); // coming
    try {
      const data = { 
        text: newNote,
        createAt : new Date().toISOString()
       };
      const response = await databaseService.createDocument(dbId, colId, ID.unique(), data);
      return response?.error ? { error: response.error } : { success : true,response };
    } catch (error) {
      return { error: error.message || "Failed to add note" };
    }
  },


  //Delete Note 
  async deleteNote(id){
    if(!id){
      return {error: "Note ID is required"};
    }
    try{
    const response = await databaseService.deleteDocument(dbId, colId, id);
    return response?.error ? { error: response.error } : { success : true  };
    }
    catch(error){
      return { error: error.message || "Failed to delete note" };
  }
}
}
export default noteService;
