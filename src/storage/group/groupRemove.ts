import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION, GROUP_COLLECTION } from "../storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupRemove(groupDeleted: string) {
  try {
    const storedGroups = await groupsGetAll();

    const groupsNotRemoved = JSON.stringify(
      storedGroups.filter((g) => g !== groupDeleted)
    );

    await AsyncStorage.setItem(GROUP_COLLECTION, groupsNotRemoved);
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`);
  } catch (error) {
    throw error;
  }
}
