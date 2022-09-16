import React from "react";
import imagem from "assets/img/imagem1.png";
import grupo from "assets/img/Groupo.png";
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
      <h1>
      Seu Diário Virtual para  guardar memórias de viagens incríveis e  compartilar experiências com amigos do mundo todo !!!
      </h1>
    </S.Home>
  );
};

export default Home;
