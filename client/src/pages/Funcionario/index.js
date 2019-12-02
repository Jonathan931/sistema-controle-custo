import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Card,
  Input,
  Row,
  Col,
  Button,
  Tooltip,
  Popconfirm,
  Tag,
  PageHeader,
  Spin,
} from 'antd';

import * as ACOES from '../../store/modules/funcionario/actions';
import { WrappedFuncionarioForm } from './FormFuncionario';
import history from '../../services/history';

const { Search } = Input;
export default function() {
  const dispatch = useDispatch();
  const list = useSelector(state => state.funcionario.data || []);
  const { loading } = useSelector(state => state.funcionario);
  const [visible, setVisible] = useState(false);
  const [dataFiltrada, setDataFiltrada] = useState([]);
  const [entidade, setEntidade] = useState({});
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      width: 150,
    },
    {
      title: 'Departamento(s)',
      dataIndex: 'departamentos',
      width: 150,
      render: (text, record) =>
        (record.departamentos || []).map(dep => (
          <Tag key={dep.id} color="#2db7f5">
            {dep.nome}
          </Tag>
        )),
    },
    {
      title: 'Ações',
      dataIndex: 'operation',
      align: 'center',
      render: (text, record) => (
        <Row
          gutter={{ xs: 8, sm: 16, md: 24 }}
          style={{ justifyContent: 'center', display: 'flex' }}
        >
          <Col>
            <Tooltip placement="top" title="Editar">
              <Button
                type="primary"
                icon="edit"
                onClick={() => {
                  setEntidade(record);
                  setVisible(true);
                }}
              />
            </Tooltip>
          </Col>
          <Col>
            <Popconfirm
              title="Deseja realmente realizar a exclusão?"
              onConfirm={() => {
                dispatch(ACOES.deleteRequest(record.id));
              }}
            >
              <Tooltip placement="top" title="Excluir">
                <Button type="danger" icon="delete" />
              </Tooltip>
            </Popconfirm>
          </Col>
        </Row>
      ),
    },
  ];

  useEffect(() => {
    dispatch(ACOES.listRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDataFiltrada(list);
  }, [list]);

  return (
    <>
      <Spin tip="Carregando..." spinning={loading}>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          onBack={() => history.goBack()}
          title="Funcionários"
          subTitle="GERENCIAMENTO DE FUNCIONÁRIOS"
        />
        <Card>
          <Row justify="space-between" type="flex">
            <Col span={8}>
              <Search
                placeholder="Pesquisa de funcionarios"
                onSearch={value => {
                  if (value) {
                    setDataFiltrada(
                      list.filter(
                        row =>
                          row.nome.toLowerCase().indexOf(value.toLowerCase()) >
                          -1
                      )
                    );
                  } else {
                    setDataFiltrada(list);
                  }
                }}
              />
            </Col>
            <Col span={8} offset={8}>
              <div style={{ display: 'block', right: 0 }}>
                <Button
                  type="primary"
                  onClick={() => {
                    setEntidade({});
                    setVisible(true);
                  }}
                  style={{ float: 'right' }}
                >
                  Novo
                </Button>
              </div>
            </Col>
          </Row>
          <br />
          <Table
            columns={columns}
            dataSource={dataFiltrada.map(row => ({ ...row, key: row.id }))}
            pagination={{ pageSize: 5 }}
          />
          <WrappedFuncionarioForm
            visible={visible}
            handleOk={handleOk}
            handleCancel={handleCancel}
            entidade={entidade}
          />
        </Card>
      </Spin>
    </>
  );

  function handleCancel() {
    setVisible(false);
    setEntidade({});
  }

  function handleOk() {
    setVisible(false);
    setEntidade({});
  }
}
