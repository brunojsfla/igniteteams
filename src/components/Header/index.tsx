import { ArrowFatLinesRight } from "phosphor-react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import logoImg from "../../assets/logo.png";

import { Container, Logo, BackButton, BackIcon } from "./styles";

type Props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation();

  function handleNavigation() {
    navigation.navigate("groups");
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleNavigation}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  );
}
