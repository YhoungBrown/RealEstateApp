import { Account, Avatars, Client, Databases, OAuthProvider, Query, Storage } from "react-native-appwrite"; 
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';


export const config = {
  platform: "com.jsm.realestateapp",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID!,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID!,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENT_COLLECTION_ID!,
  propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID!,
  // bucketId:
};


export const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

// ✅ Creating user avatar from Name
export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
// export const storage = new Storage(client);


export const logIn = async () => {
  try {
    const deepLink = new URL(makeRedirectUri({ scheme: "RealEstateApp" }));

    const scheme = `${deepLink.protocol}//`;

    // Start OAuth flow
    const loginUrl = await account.createOAuth2Token(
      OAuthProvider.Google,
      `${deepLink}`,
      `${deepLink}`
    );

    if (!loginUrl) throw new Error("Failed to get OAuth login URL");

    
    const browserResult =  await WebBrowser.openAuthSessionAsync(`${loginUrl}`, scheme);


    if (!browserResult || browserResult.type !== "success" || !browserResult.url) {
      throw new Error("OAuth login was unsuccessful");
    }

    // Extract credentials from OAuth redirect URL
    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret");
    const userId = url.searchParams.get("userId");

    if (!secret || !userId) {
      throw new Error("Failed to extract OAuth credentials");
    }

    // Create session with OAuth credentials
    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    return true;
  } catch (error) {
    console.error("Login Error:", error);
    return false;
  }
};


// ✅ Logout Function
export const logout = async () => {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error("Logout Error:", error);
    return false;
  }
};


// ✅ Get Current User Function
export const getCurrentUser = async () => {
  try {
    // ✅ Check if a session exists
    const sessions = await account.getSession("current");
    if (!sessions) {
      console.log("No active session found.");
      return null;
    }

    const user = await account.get();

    if (user.$id) {
      const userAvatar = avatar.getInitials(user.name);

      return {
        ...user,
        avatar: userAvatar.toString(),
      };
    }

    return user;
  } catch (error) {
    console.error("Get Current User Error:", error);
    return null;
  }
};

export async function getLatestProperties() {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );

    return result.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "All")
      buildQuery.push(Query.equal("type", filter));

    if (query)
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ])
      );

    if (limit) buildQuery.push(Query.limit(limit));

    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery
    );

    return result.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}