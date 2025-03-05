import { databases} from "./appwrite";

const databaseService = {
  // list Documents 
  async listDocuments(dbId, colId) 
  {
    try {
      const response = await databases.listDocuments(dbId, colId);
      return response.documents || [];
    } catch (error) {
      console.error("Error fetching notes:", error.message);
      return { error: error.message };
    }
  },

   // Create Document
   async createDocument(dbId, colId, id = null , data) {
    try {
      
      const response = await databases.createDocument(dbId, colId,id || undefined, data);
      return {success: true, response};
    } catch (error) {
      console.error("Error creating document:", error.message);
      return { error: error.message };
    }
  },


  //delete Document
  async deleteDocument(dbId, colId, id) {
    try{
      const response = await databases.deleteDocument(dbId, colId, id);
      return {success: true, response};
    }
    catch(error){
      console.error("Error deleting document:", error.message);
      return { error: error.message };
    }
  }

};

export default databaseService;
