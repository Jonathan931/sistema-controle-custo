import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Card,
  Input,
  Row,
  Col,
  Button,
  PageHeader,
  Tooltip,
  Popconfirm,
  Tag,
  Spin,
} from 'antd';

import { formatPrice } from '../../util/format';
import * as ACOES from '../../store/modules/movimentacao/actions';
import history from '../../services/history';

const { Search } = Input;
export default function () {
  const dispatch = useDispatch();
  const list = useSelector(state => state.movimentacao.data || []);
  const { loading } = useSelector(state => state.movimentacao);
  const [dataFiltrada, setDataFiltrada] = useState([]);

  useEffect(() => {
    dispatch(ACOES.listRequest({ page: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDataFiltrada(list);
  }, [list]);

  const columns = [
    {
      title: 'Descricao',
      dataIndex: 'descricao',
    },
    {
      title: 'Funcionário',
      dataIndex: 'funcionario.nome',
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      render: (text, record) => formatPrice(text),
    },
    {
      title: 'Departamento(s)',
      dataIndex: 'funcionario.departamentos',
      render: (text, record) => (record.funcionario.departamentos || []).map(dep => (
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
                onClick={() => history.push(`/movimentacao/form/${record.id}`)}
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

  return (
    <>
      <Spin tip="Carregando..." spinning={loading}>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          onBack={() => history.goBack()}
          title="Movimentação"
          subTitle="GERENCIAMENTO DE MOVIMENTAÇÕES"
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
                        row => row.descricao
                            .toLowerCase()
                            .indexOf(value.toLowerCase()) > -1,
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
                  onClick={() => history.push('/movimentacao/form')}
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
        </Card>
      </Spin>
    </>
  );
}
