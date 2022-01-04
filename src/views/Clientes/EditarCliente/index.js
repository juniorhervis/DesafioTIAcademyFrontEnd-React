import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { api } from "../../../config";

export const EditarCliente = (props) => {
  const [id, setId] = useState(props.match.params.id);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [clienteDesde, setClienteDesde] = useState("");
  console.log(props);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const edtCliente = async (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .put(
        api + "/cliente/" + id,
        { id, nome, endereco, cidade, uf, nascimento, clienteDesde },
        { headers }
      )
      .then((response) => {})
      .catch(() => {
        setStatus({
          type: "error",
          message: "Não foi possível conectar a API.",
        });
      });
  };

  useEffect(() => {
    const getCliente = async () => {
      await axios
        .get(api + "/cliente/" + id)
        .then((response) => {
          setId(response.data.cliente.id);
          setNome(response.data.cliente.nome);
          setEndereco(response.data.cliente.endereco);
          setCidade(response.data.cliente.cidade);
          setUf(response.data.cliente.uf);
          setNascimento(response.data.cliente.nascimento);
          setClienteDesde(response.data.cliente.clienteDesde);
        })
        .catch(() => {
          console.log("Erro: não foi possível se conectar a API.");
        });
    };
    getCliente();
  }, [id]);

  return (
    <div>
      <Container>
        <div className="d-flex">
          <div className="m-auto p-2">
            <h1>Editar Cliente</h1>
          </div>
          <div className="p-2">
            <Link
              to="/listar-cliente"
              className="btn btn-outline-primary btn-sm"
            >
              Clientes
            </Link>
          </div>
          <div className="p-2">
            <Link
              to="/listar-pedido"
              className="btn btn-outline-primary btn-sm"
            >
              Pedidos
            </Link>
          </div>
        </div>
        <hr className="m-1" />
        {status.type === "error" ? (
          <Alert color="danger">{status.message}</Alert>
        ) : (
          " "
        )}
        {status.type === "success" ? (
          <Alert color="success">{status.message}</Alert>
        ) : (
          " "
        )}

        <Form className="p-2" onSubmit={edtCliente}>
          <FormGroup className="p-2">
            <Label>ID Cliente</Label>
            <Input
              disabled
              type="number"
              name="id"
              placeholder="id do Cliente"
              defaultValue={id}
            />
          </FormGroup>
          <FormGroup className="p-2">
            <Label>Nome</Label>
            <Input
              type="text"
              name="nome"
              placeholder="Nome do Cliente"
              defaultValue={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="p-2">
            <Label>Endereço</Label>
            <Input
              type="text"
              name="endereco"
              placeholder="Endereço"
              defaultValue={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="p-2">
            <Label>Cidade</Label>
            <Input
              type="text"
              name="cidade"
              placeholder="Cidade"
              defaultValue={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="p-2">
            <Label>UF</Label>
            <Input
              type="text"
              name="uf"
              placeholder="UF"
              defaultValue={uf}
              onChange={(e) => setUf(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="p-2">
            <Label>Nascimento</Label>
            <Input
              type="date"
              name="nascimento"
              placeholder="Data de Nascimento"
              defaultValue={nascimento}
              onChange={(e) => setNascimento(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="p-2">
            <Label>Cliente Desde</Label>
            <Input
              type="date"
              name="clienteDesde"
              placeholder="Cliente Desde"
              defaultValue={clienteDesde}
              onChange={(e) => setClienteDesde(e.target.value)}
            />
          </FormGroup>
          <Button type="submit" outline color="success">
            Salvar
          </Button>
        </Form>
      </Container>
    </div>
  );
};