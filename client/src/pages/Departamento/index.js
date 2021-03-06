import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Card,
  Input,
  Row,
  Col,
  Button,
  Modal,
  Tooltip,
  Popconfirm,
  PageHeader,
  Spin,
} from 'antd';

import { toast } from 'react-toastify';
import * as ACOES from '../../store/modules/departamento/actions';
import history from '../../services/history';

const { Search } = Input;
export default function () {
  const dispatch = useDispatch();
  const list = useSelector(state => state.departamento.data || []);
  const loading = useSelector(state => state.departamento.loading);
  const [visible, setVisible] = useState(false);
  const [dataFiltrada, setDataFiltrada] = useState([]);
  const [entidade, setEntidade] = useState({});
  const [nomeDepartamento, setNomeDepartamento] = useState('');
  const columns = [
    {
      title: 'Departamento',
      dataIndex: 'nome',
      width: 150,
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
                  setNomeDepartamento(record.nome);
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
          title="Departamento"
          subTitle="GERENCIAMENTO DE DEPARTAMENTO"
        />
        <Card>
          <Row justify="space-between" type="flex">
            <Col span={8}>
              <Search
                placeholder="Pesquisa de departamento"
                onSearch={value => {
                  if (value) {
                    setDataFiltrada(
                      list.filter(
                        row => row.nome.toLowerCase().indexOf(value.toLowerCase())
                          > -1,
                      ),
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
                    setNomeDepartamento('');
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
          <Modal
            destroyOnClose
            title="Departamento"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Input
              placeholder="Digite o nome do departamento"
              value={nomeDepartamento}
              onChange={e => setNomeDepartamento(e.target.value)}
            />
          </Modal>
        </Card>
      </Spin>
    </>
  );

  function handleCancel() {
    setVisible(false);
    setEntidade({});
  }

  function handleOk() {
    if (nomeDepartamento) {
      if (entidade.id) {
        dispatch(
          ACOES.editarRequest({ id: entidade.id, nome: nomeDepartamento }),
        );
      } else {
        dispatch(ACOES.salvarRequest({ nome: nomeDepartamento }));
      }
      setVisible(false);
      setEntidade({});
    } else {
      toast.warn('Por favor, preencha o nome do Departamento');
    }
  }
}
