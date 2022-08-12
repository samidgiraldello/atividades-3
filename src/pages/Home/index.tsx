import React from "react";
import imagem from "assets/img/imagem1.png";
import grupo from "assets/img/carrousel.png";
import * as S from "./styles";
import { CardComponent } from "components";
import dados from "services/dados";

const Home = () => {
  return (
    <S.Home>
      <picture>
        <img src={imagem} alt="Imagens principais" />
        <img src={grupo} alt="Imagens principais" />
      </picture>
      <aside>
        {dados && dados.map((item) => <CardComponent dados={item} />)}
      </aside>
    </S.Home>
  );
};

export default Home;
