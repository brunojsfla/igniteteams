import React from "react";

import { Container, Message } from "./styles";

interface Props {
  text: string;
}

export function ListEmpty({ text }: Props) {
  return (
    <Container>
      <Message>{text}</Message>
    </Container>
  );
}
