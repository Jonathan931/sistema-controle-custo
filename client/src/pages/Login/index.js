import React from 'react';
import { useDispatch } from 'react-redux';
import {
 Form, Icon, Input, Button, Checkbox, Row, Col 
} from 'antd';
import * as ACOES from '../../store/modules/login/actions';

function NormalLoginForm({ form }) {
  const { getFieldDecorator } = form;
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch(ACOES.loginRequest(values));
      }
    });
  }

  return (
    <Row>
      <Col offset={8} span={8}>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Por favor, digite o email!' },
                {
                  type: 'email',
                  message: 'Informe um email válido!',
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Por favor, insira a senha!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Logar
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm,
);
