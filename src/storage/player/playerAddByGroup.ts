import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppErros";
import { PLAYER_COLLECTION } from "../storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playerGetByGroup } from "./playerGetByGroup";

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storagePlayers = await playerGetByGroup(group);

    const playerAlreadyExists = storagePlayers.filter(
      (player) => player.name === newPlayer.name
    );

    if (playerAlreadyExists.length > 0) {
      throw new AppError("Esse componente já existe no grupo!");
    }

    const storage = JSON.stringify([...storagePlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}
