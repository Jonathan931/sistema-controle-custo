import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Card,
  PageHeader,
  Spin,
} from 'antd';

import * as ACOES from '../../store/modules/movimentacao/actions';
import * as ACOES_FUNC from '../../store/modules/funcionario/actions';
import history from '../../services/history';

const { Option } = Select;
export function MovimentacaoForm({ match }) {
  const { id } = match.params;
  const dispatch = useDispatch();
  const { entidade } = useSelector(state => state.movimentacao);
  const listFunc = useSelector(state => state.funcionario.data || []);
  useEffect(() => {
    if (id) {
      dispatch(ACOES.getRequest(id));
    }
    dispatch(ACOES_FUNC.listRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <SequenciaDeCoresFormCustom
      funcionariosList={listFunc || []}
      entityInstance={entidade || {}}
      id={id}
    />
  );
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const SequenciaDeCoresFormCustom = Form.create({
  name: 'cad_movimentacao',
  mapPropsToFields(props) {
    const { entityInstance, funcionariosList } = props;
    return {
      descricao: Form.createFormField({
        value: entityInstance.descricao,
      }),
      valor: Form.createFormField({
        value: entityInstance.valor,
      }),
      funcionario_id: Form.createFormField({
        value:
          (funcionariosList || []).length > 0 && entityInstance.funcionario_id
            ? funcionariosList.filter(
                row => row.id === entityInstance.funcionario_id
              )[0].nome
            : null,
      }),
    };
  },
})(({ form, funcionariosList, entityInstance, id }) => {
  const { getFieldDecorator } = form;
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.movimentacao);

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    form.validateFields((err, values) => {
      values.funcionario_id = funcionariosList.filter(
        row => row.nome === values.funcionario_id
      )[0].id;
      if (!err) {
        if (entityInstance.id) {
          values.id = entityInstance.id;
          dispatch(ACOES.editarRequest(values));
        } else {
          dispatch(ACOES.salvarRequest(values));
        }
      }
    });
  }

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
          <Form onSubmit={handleSubmit}>
            <Form.Item label="Descrição">
              {getFieldDecorator('descricao', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor, insira a descrição',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Funcionário">
              {getFieldDecorator('funcionario_id', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor, selecione o funcionário',
                  },
                ],
              })(
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {(funcionariosList || []).map(row => (
                    <Option key={row.nome}>{row.nome}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Valor">
              {getFieldDecorator('valor', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor, insira o valor',
                  },
                ],
              })(<InputNumber min={0.01} />)}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </>
  );
});
