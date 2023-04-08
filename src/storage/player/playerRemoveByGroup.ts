import { playerGetByGroup } from "./playerGetByGroup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "../storageConfig";

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const players = await playerGetByGroup(group);

    const playerToRemove = JSON.stringify(
      players.filter((p) => p.name !== playerName)
    );

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, playerToRemove);
  } catch (error) {
    throw error;
  }
}
