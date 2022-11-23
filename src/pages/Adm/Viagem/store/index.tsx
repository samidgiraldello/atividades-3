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
    Nome: '',
    Lugar: '',
    Data: '',
    Hotel: '',
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
                <label htmlFor="Nome">Nome: </label>
                <input type="text" id="Nome" placeholder="Escreva seu nome" required
                  onChange={(e) => handleChange({ Nome: e.target.value })}
                  value={formData?.Nome}
                />
              </div>
              <div>
                <label htmlFor="Lugar">Lugar: </label>
                <textarea id="Lugar" placeholder="Escreva um Lugar" required
                  onChange={(e) => handleChange({Lugar: e.target.value })}
                  value={formData?.Lugar}
                />
              </div>
              <div>
                <label htmlFor="Data">Data: </label>
                <textarea id="Data" placeholder="Escreva uma Data" required
                  onChange={(e) => handleChange({ Data: e.target.value })}
                  value={formData?.Data}
                />
              </div>
              <div>
                <label htmlFor="Hotel">Hotel: </label>
                <textarea id="Hotel" placeholder="Escreva um Hotel" required
                  onChange={(e) => handleChange({ Hotel: e.target.value })}
                  value={formData?.Hotel}
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