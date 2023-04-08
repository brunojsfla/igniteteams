import React, { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppErros";

export function NewGroup() {
  const [group, setGroup] = useState("");
  const navigation = useNavigation();

  async function handleNewGroup() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Opa...", "Informe o nome da turma.");
      }

      await groupCreate(group);
      navigation.navigate("players", { group });
    } catch (error) {
      if (!error instanceof AppError) {
        console.log(error);
        Alert.alert("Opa...", "Não foi possível criar uma nova turma.");
      } else {
        Alert.alert("Opa...", error.message);
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subTitle="Crie a turma para adicionar as pessoas"
        />
        <Input placeholder="Nome da turma" onChangeText={setGroup} />
        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNewGroup}
        />
      </Content>
    </Container>
  );
}
