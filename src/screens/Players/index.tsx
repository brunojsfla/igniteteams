import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Keyboard, ToastAndroid } from "react-native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute } from "@react-navigation/native";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { AppError } from "@utils/AppErros";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemove } from "@storage/group/groupRemove";
import { useNavigation } from "@react-navigation/native";
import { Loading } from "@components/Loading";

type RouteParams = {
  group: string;
};

export function Players() {
  const [loading, setLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const navigation = useNavigation();
  const route = useRoute();

  const params = route.params as RouteParams;

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("Opa...", "Informe o nome da pessoa!");
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, params.group);
      getPlayersByGroupAndTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Opa...", error.message);
      } else {
        console.log(error);
        Alert.alert(
          "Opa...",
          "Não foi possível incluir uma nova pessoa na turma!"
        );
      }
    }
    setNewPlayerName("");
    Keyboard.dismiss();
  }

  async function getPlayersByGroupAndTeam() {
    try {
      setLoading(true);
      const playerStorageByGroupAndTeam = await playerGetByGroupAndTeam(
        params.group,
        team
      );
      setPlayers(playerStorageByGroupAndTeam);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Opa...", error.message);
      } else {
        console.log(error);
        Alert.alert(
          "Opa...",
          "Não foi possível buscar os componentes da turma!"
        );
      }
    } finally {
      setLoading(false);
    }
  }

  function handleRemovePlayer(name: string) {
    try {
      Alert.alert(
        "Confirmar",
        `Realmente deseja excluir o componente ${name}?`,
        [
          {
            text: "SIM",
            onPress: async () => await playerRemoveByGroup(name, params.group),
            style: "destructive",
          },
          {
            text: "NÃO",
            style: "cancel",
          },
        ]
      );
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Opa...", error.message);
      } else {
        console.log(error);
        Alert.alert(
          "Opa...",
          "Não foi possível remover o componente da turma!"
        );
      }
    }
  }

  async function deleteGroup() {
    try {
      await groupRemove(params.group);
      ToastAndroid.show("Turma excluída com sucesso!", ToastAndroid.SHORT);
      navigation.navigate("groups");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  function handleRemoveGroup() {
    Alert.alert(
      "Confirmar",
      `Realmente deseja excluir a turma ${params.group}?`,
      [
        {
          text: "SIM",
          onPress: () => deleteGroup(),
          style: "destructive",
        },
        {
          text: "NÃO",
          style: "cancel",
        },
      ]
    );
  }

  useEffect(() => {
    getPlayersByGroupAndTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={params.group}
        subTitle="Adicione a galera e separe os times"
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Form>
            <Input
              placeholder="Nome da pessoa"
              autoCorrect={false}
              onChangeText={setNewPlayerName}
              value={newPlayerName}
              onSubmitEditing={handleAddPlayer}
              returnKeyType="done"
            />
            <ButtonIcon icon="add" onPress={handleAddPlayer} />
          </Form>
          <HeaderList>
            <FlatList
              data={["Time A", "Time B"]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Filter
                  title={item}
                  isActive={item === team}
                  onPress={() => setTeam(item)}
                />
              )}
              horizontal
            />
            <NumberOfPlayers>{players.length}</NumberOfPlayers>
          </HeaderList>
          <FlatList
            data={players}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <PlayerCard
                name={item.name}
                onRemove={() => {
                  handleRemovePlayer(item.name);
                }}
              />
            )}
            ListEmptyComponent={() => (
              <ListEmpty text="Não há pessoas nesse time!" />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              { paddingBottom: 100 },
              players.length === 0 && { flex: 1 },
            ]}
          />
          <Button
            title="Remover turma"
            type="SECONDARY"
            onPress={handleRemoveGroup}
          />
        </>
      )}
    </Container>
  );
}
