import { Client, Databases,Account } from "react-native-appwrite";
import { Platform } from "react-native";

// ✅ Correct way to access environment variables
const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
  col: {
    notes: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_NOTES, 
  },
};


console.log("db :", config.db);
console.log("col : ", config.col);

// ✅ Initialize Appwrite Client
const client = new Client().setEndpoint(config.endpoint).setProject(config.projectId);

// ✅ Set platform-specific configuration (Optional, Appwrite usually handles this)
switch (Platform.OS){
    case "ios":
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_IOS_BUNDLE);
        break;
    case "android":
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_ANDROID_PACKAGE);
        break;
}

// ✅ Initialize Databases
const databases = new Databases(client);


const account = new Account(client)

export { client, databases, config,account };
