import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite"; 
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.jsm.realestateapp",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

// Creating user avatar from Name
export const avatar = new Avatars(client);
export const account = new Account(client);

//Login Function

export const logIn = async () => {
  try {
    const redirectURI = Linking.createURL("/");

    const response = await account.createOAuth2Token(OAuthProvider.Google, redirectURI);

    if (!response) throw new Error("Failed to login");

    const browserResult = await openAuthSessionAsync(response.toString(), redirectURI);

    if (browserResult.type !== "success") throw new Error("Failed to login");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("Failed to login");

    const session = await account.createSession(userId, secret);

    if (!session) throw new Error("Failed to create a session");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};


export const logout = async () => {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error(error);
    return false
  }
}

export const getCurrentUser = async () => {
  try {
    const user = await account.get();

    if(user.$id) {
      const userAvatar = avatar.getInitials(user.name)

      return {
        ...user,
        avatar: userAvatar.toString() 
      }
    }
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}