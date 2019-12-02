import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  // eslint-disable-next-line indent
  Form,
  Modal,
  Input,
  Select,
} from 'antd';

import * as ACOES from '../../store/modules/departamento/actions';
import * as ACOES_FUNC from '../../store/modules/funcionario/actions';

const formItemLayout = {};
const { Option } = Select;

export const WrappedFuncionarioForm = Form.create({
  name: 'cad_funcionario',
  mapPropsToFields(props) {
    return {
      nome: Form.createFormField({
        value: props.entidade ? props.entidade.nome : '',
      }),
      departamentos: Form.createFormField({
        value: props.entidade.departamentos
          ? props.entidade.departamentos.map(dep => dep.nome)
          : [],
      }),
    };
  },
})(({
 visible, handleOk, handleCancel, form, entidade 
}) => {
  const { getFieldDecorator } = form;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ACOES.listRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listDepartamentos = useSelector(state => state.departamento.data || []);
  return (
    <Modal
      destroyOnClose
      title="Funcionário"
      visible={visible}
      onOk={salvar}
      onCancel={handleCancel}
    >
      <Form {...formItemLayout}>
        <Form.Item label="Nome">
          {getFieldDecorator('nome', {
            rules: [
              {
                required: true,
                message: 'Por favor, insira o nome do funcionário!',
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Departamentos">
          {getFieldDecorator('departamentos', {
            rules: [
              {
                required: true,
                message: 'Por favor, insira os departamento(s) do funcionário',
              },
            ],
          })(
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              filterOption={(input, option) => option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0}
            >
              {listDepartamentos.map(dep => (
                <Option key={dep.id}>{dep.nome}</Option>
              ))}
            </Select>,
          )}
        </Form.Item>
      </Form>
    </Modal>
  );

  function salvar() {
    form.validateFields((err, values) => {
      if (!err) {
        if (entidade.id) {
          values.id = entidade.id;
          const listDep = values.departamentos.map(dep => {
            const retorno = listDepartamentos.filter(row => row.nome === dep);
            if (retorno && retorno.length > 0) {
              return retorno[0].id;
            }
            return dep;
          });
          dispatch(
            ACOES_FUNC.editarRequest({
              ...values,
              departamentos: listDep.map(depId => parseInt(depId)),
            }),
          );
        } else {
          dispatch(
            ACOES_FUNC.salvarRequest({
              ...values,
              departamentos: values.departamentos.map(depId => parseInt(depId)),
            }),
          );
        }
        handleOk();
      }
    });
  }
});
