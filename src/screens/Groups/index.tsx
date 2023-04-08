import * as S from "./styles";
import { Alert, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useEffect, useState } from "react";
import { groupsGetAll } from "@storage/group/groupsGetAll";
import { Loading } from "@components/Loading";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new");
  }

  async function fetchGroups() {
    try {
      const groupsAll = await groupsGetAll();

      setGroups(groupsAll);
    } catch (error) {
      Alert.alert("Opa...", "Não foi possível buscar as turmas.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  useEffect(() => {
    fetchGroups();
  }, [groups]);

  return (
    <S.Container>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Highlight title="Turmas" subTitle="Jogue com a sua turma" />
          <FlatList
            data={groups}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
            )}
            contentContainerStyle={groups.length === 0 && { flex: 1 }}
            ListEmptyComponent={() => (
              <ListEmpty text="Nenhuma turma cadastrada!" />
            )}
          />
          <Button title="Criar nova turma" onPress={handleNewGroup} />
        </>
      )}
    </S.Container>
  );
}
