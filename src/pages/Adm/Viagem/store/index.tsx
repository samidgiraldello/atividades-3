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
                <label htmlFor="title">Nome: </label>
                <input type="text" id="title" placeholder="Escreva uma Data" required
                  onChange={(e) => handleChange({ title: e.target.value })}
                  value={formData?.title}
                />
              </div>
              <div>
                <label htmlFor="message">Lugar: </label>
                <textarea id="message" placeholder="Escreva um Lugar" required
                  onChange={(e) => handleChange({ message: e.target.value })}
                  value={formData?.message}
                />
              </div>
              <div>
                <label htmlFor="message">Data: </label>
                <textarea id="message" placeholder="Escreva um Lugar" required
                  onChange={(e) => handleChange({ message: e.target.value })}
                  value={formData?.message}
                />
              </div>
              <div>
                <label htmlFor="message">Hotel: </label>
                <textarea id="message" placeholder="Escreva um Lugar" required
                  onChange={(e) => handleChange({ message: e.target.value })}
                  value={formData?.message}
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