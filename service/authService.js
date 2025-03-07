import { account, Account } from "./appwrite";
import { ID } from "react-native-appwrite";

const authService = {
  //Register a user
  async register(email, password) {
    try {
      const response = await account.create(ID.unique(), email, password);
      return response;
    } catch (e) {
        return{
            error:e.message || 'Register failed'
        }
    }
  },
  //login 
  async login(email, password) {
    try {
      const response = await account.createEmailPasswordSession( email, password);
      return response;
    } catch (e) {
        return{
            error:e.message || 'Login failed please check our credentials'
        }
    }
  },

  //get User logged
  async getUser(){
    try{
        return await account.get()
    }
    catch(error){
        return null
    }
  },

  //log out user

  async logout(){
        try{
            await account.deleteSession('current');
        }
        catch(error){
            return{
                error:e.message || 'logout failed '
            }
        }
  }

};

export default authService
