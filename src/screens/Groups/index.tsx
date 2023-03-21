import * as S from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";

export function Groups() {
  return (
    <S.Container>
      <Header showBackButton />
      <Highlight title="Turmas" subTitle="Joge com a sua turma" />
    </S.Container>
  );
}
