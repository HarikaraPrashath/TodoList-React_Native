import { databases } from "./appwrite";

const databaseService = {
  // list Documents
  async listDocuments(dbId, colId, queries = []) {
    try {
      const response = await databases.listDocuments(dbId, colId, queries);
      return { data: response.documents || [], error: null }; // ✅ Ensure data is an array
    } catch (error) {
      console.error("Error fetching notes:", error.message);
      return { data: [], error: error.message }; // ✅ Always return an object with `data`
    }
  }
,  

  // Create Document
  async createDocument(dbId, colId, id = null, data) {
    try {
      const response = await databases.createDocument(
        dbId,
        colId,
        id || undefined,
        data
      );
      return { success: true, response };
    } catch (error) {
      console.error("Error creating document:", error.message);
      return { error: error.message };
    }
  },
  //update Document
  // async updateDocument(dbId, colId, id, data) {
  //   try {
  //     if (!data || typeof data !== "object") {
  //       throw new Error("Invalid data object");
  //     }
  //     const response = await databases.updateDocument(dbId, colId, id, data);
  //     return response || { error: "Empty response from database" };
  //   } catch (error) {
  //     console.error("Error updating document:", error.message);
  //     return { error: error.message || "Unknown error occurred" };
  //   }
  // },
  
  //delete Document
  async deleteDocument(dbId, colId, id) {
    try {
      const response = await databases.deleteDocument(dbId, colId, id);
      return { success: true, response };
    } catch (error) {
      console.error("Error deleting document:", error.message);
      return { error: error.message };
    }
  },
};

export default databaseService;
