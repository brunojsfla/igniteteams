import { ArrowFatLinesRight } from "phosphor-react-native";
import React from "react";

import logoImg from "../../assets/logo.png";

import { Container, Logo, BackButton, BackIcon } from "./styles";

type Props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props) {
  return (
    <Container>
      {showBackButton && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  );
}
