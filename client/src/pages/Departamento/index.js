import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Card, Input, Row, Col, Button, Modal } from 'antd';

import { toast } from 'react-toastify';
import * as ACOES from '../../store/modules/departamento/actions';

const { Search } = Input;
export default function() {
  const columns = [
    {
      title: 'Departamento',
      dataIndex: 'nome',
      width: 150,
    },
  ];
  const list = useSelector(state => state.departamento.data || []);
  const [visible, setVisible] = useState(false);
  const [dataFiltrada, setDataFiltrada] = useState([]);
  const [nomeDepartamento, setNomeDepartamento] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ACOES.listRequest());
  }, []);

  useEffect(() => {
    setDataFiltrada(list);
  }, [list]);

  return (
    <Card>
      <Row justify="space-between" type="flex">
        <Col span={8}>
          <Search
            placeholder="Pesquisa de departamento"
            onSearch={value => {
              if (value) {
                setDataFiltrada(
                  list.filter(
                    row =>
                      row.nome.toLowerCase().indexOf(value.toLowerCase()) > -1
                  )
                );
              } else {
                setDataFiltrada(list);
              }
            }}
          />
        </Col>
        <Col span={8} offset={8}>
          <Button
            type="primary"
            onClick={() => {
              setNomeDepartamento('');
              setVisible(true);
            }}
          >
            Novo
          </Button>
        </Col>
      </Row>
      <br />
      <Table
        columns={columns}
        dataSource={dataFiltrada.map(row => ({ ...row, key: row.id }))}
        pagination={{ pageSize: 5 }}
        onChange={e => console.log(e)}
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
          onChange={e => setNomeDepartamento(e.target.value)}
        />
      </Modal>
    </Card>
  );

  function handleCancel() {
    setVisible(false);
  }

  function handleOk() {
    if (nomeDepartamento) {
      dispatch(ACOES.salvarRequest({ nome: nomeDepartamento }));
      setVisible(false);
    } else {
      toast.warn('Por favor, preencha o nome do Departamento');
    }
  }
}
