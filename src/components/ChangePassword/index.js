import React, { useState } from 'react';
import { Modal, Button, Form, Input, Typography, message } from 'antd';
import { decryptData } from '../../config/crypto';
import { changePassword } from './api';
import { handleErrorSession } from '../../utils';

const { Title } = Typography;

const ChangePassword = ({ showChangePassword, onOk, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async values => {
    setLoading(true);
    try {
      const { token } = decryptData('user');
      await changePassword({ token, data: values });

      setLoading(false);
      message.success('Contraseña cambiada exitosamente.');
      onCancel();
    } catch (error) {
      message.error(handleErrorSession(error));
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Modal
      title={<Title level={3} className='my-0'>Cambiar contraseña</Title>}
      open={showChangePassword}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
    >
      <div>
        <Form
          name='FormPassword'
          autoComplete='on'
          disabled={loading}
          layout='vertical'
          onFinish={onFinish}
        >
          <Form.Item
            name='old_password'
            label='Contrasena actual'
            rules={[
              {
                required: true,
                message: 'Por favor ingrese su contraseña actual.',
              },
              {
                min: 8,
                message: 'La contraseña debe tener al menos 8 caracteres',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name='new_password'
            label='Contrasena nueva'
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor ingrese su contraseña nueva.',
              },
              {
                min: 8,
                message: 'La contraseña debe tener al menos 8 caracteres',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name='confirm_new_password'
            label='Confirmar Contraseña nueva'
            dependencies={['new_password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor confirma tu contraseña.',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Las nuevas contraseña no coinciden.'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className='flex flex-row justify-end'>
            <Form.Item className='mb-0'>
              <Button type='primary' htmlType='submit'>
                Cambiar contraseña
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>

    </Modal>
  );
};
export default ChangePassword;
