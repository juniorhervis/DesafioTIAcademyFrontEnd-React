/* eslint-disable eqeqeq */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarServico = () => {
  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const getServicos = async () => {
    await axios
      .get(api + "/listaservicos")
      .then((response) => {
        console.log(response.data.servicos);
        setData(response.data.servicos);
      })
      .catch(() => {
        setStatus({
          type: "error",
          message: "Erro: Não foi possível se conectar com a API.",
        });
      });
  };

  useEffect(() => {
    getServicos();
  }, []);

  return (
    <div>
      <Container>
        <div className="d-flex">
          <div className="m-auto">
            <h1> Visualizar Serviços</h1>
          </div>
          <div className=" m-auto p-2">
            <Link
              to="/cadastrarservico"
              className="btn btn-outline-success btn-sm"
            >
              Cadastrar
            </Link>
          </div>
          {status.type == "error" ? (
            <Alert color="danger">{status.message}</Alert>
          ) : (
            ""
          )}
        </div>
        <Table striped className="text-center">
          <thead>
            <tr>
              <th>Serviço ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.descricao}</td>
                <td >
                  <Link
                    to={"/listar-pedido/" + item.id}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Consultar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};
