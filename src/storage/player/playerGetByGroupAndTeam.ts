import { AppError } from "@utils/AppErros";
import { playerGetByGroup } from "./playerGetByGroup";

export async function playerGetByGroupAndTeam(group: string, team: string) {
  try {
    const storage = await playerGetByGroup(group);

    const players = storage.filter((player) => player.team === team);

    if (!players) {
      throw new AppError("Nenhum componente do time encontrado!");
    }

    return players;
  } catch (error) {
    throw error;
  }
}
