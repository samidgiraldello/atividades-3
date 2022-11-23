import React,{ FormEvent, useEffect, useState } from "react";
import * as S from "./styles";
import { LoadingComponent, ButtonComponent } from "components";
import { FcDatabase, FcUndo } from "react-icons/fc";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiViagem } from "services/data";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IViagemForm } from "interfaces/viagem.interface";
import { IErrorResponse } from "interfaces/user.interface";


const ViagemStore = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IViagemForm>({
    nome: '',
    lugar: '',
    data: '',
    hotel: '',
  })
  const { id } = useParams<{ id: string }>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      if (Number(id) > 0) {
        await apiViagem.update(Number(id), formData);
        toast.success("Mensagem alterada com sucesso!");
      } else {
        await apiViagem.store(formData);
        toast.success("Mensagem cadastrada com sucesso!");
      }
      navigate('/adm/message')
    } catch (error) {
      const err = error as AxiosError<IErrorResponse>
      let messages = err.response?.data.message
      if (err.response?.data.errors) {
        messages = err.response?.data.errors?.map((i) => i.message)
          .reduce((total, cur) => `${total} ${cur}`)
      }
      toast.error(messages)
    }
  }

  async function handleChange(e: IViagemForm) {
    setFormData((state: IViagemForm) => ({ ...state, ...e }))
  }
  useEffect(() => {

    if (Number(id) > 0) {
      const fetchData = async (id: number) => {
        try {
          const response = await apiViagem.show(id);
          setFormData({
            ...response.data,
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchData(Number(id));
    }
    setIsLoading(false);
  }, [id]);

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <S.Main>
            <form method="POST" onSubmit={handleSubmit}>
              <Link to="/adm/message">
                <FcUndo /> Voltar
              </Link>
              <div>
                <label htmlFor="nome">Nome: </label>
                <input type="text" id="nome" placeholder="Escreva seu nome" required
                  onChange={(e) => handleChange({ nome: e.target.value })}
                  value={formData?.nome}
                />
              </div>
              <div>
                <label htmlFor="lugar">Lugar: </label>
                <textarea id="lugar" placeholder="Escreva um lugar" required
                  onChange={(e) => handleChange({lugar: e.target.value })}
                  value={formData?.lugar}
                />
              </div>
              <div>
                <label htmlFor="data">Data: </label>
                <textarea id="data" placeholder="Escreva uma data" required
                  onChange={(e) => handleChange({data: e.target.value })}
                  value={formData?.data}
                />
              </div>
              <div>
                <label htmlFor="hotel">Hotel: </label>
                <textarea id="hotel" placeholder="Escreva um hotel" required
                  onChange={(e) => handleChange({hotel: e.target.value })}
                  value={formData?.hotel}
                />
              </div>
              <ButtonComponent bgColor="add" type="submit">
                Enviar <FcDatabase />
              </ButtonComponent>
            </form>
          </S.Main>
        </>
      )}
    </>
  );
};

export default ViagemStore;