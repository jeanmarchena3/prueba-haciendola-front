import React, { useState } from 'react';
import { Card, Form, Input, Button, message, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { verifyUsernameEmail, changePasswordForgot } from './api';

const { Title } = Typography;

const ForgotPassword = () => {
  const [isLoading, setLoading] = useState(false);
  const [exist, setExist] = useState(false);
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const onFinish = async values => {
    setLoading(true);
    try {
      const response = await verifyUsernameEmail(values);
      const { data: { check } } = response;
      setExist(check);
      setUsername(values.username);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error('Credenciales invalidas');
    }
  };

  const onFinishPassword = async values => {
    setLoading(true);
    try {
      await changePasswordForgot({ ...values, username });
      message.success('Contraseña restablecida exitosamente');
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error('Credenciales invalidas');
    }
  };

  return (
    <div className='flex h-screen flex-col justify-center items-center'>
      <div className='w-5/6 md:w-2/5'>
        <Card className='shadow-lg shadow-stone-400'>
          <div className='flex flex-col justify-center'>
            <div className='flex flex-col justify-center items-center'>
              <Title level={2} className='my-0'>Recuperar contraseña</Title>
            </div>
            {!exist && (
              <>
                <div className='mb-3'>
                  <h1 className='text-center'>Para la recuperacion de contraseña, por favor ingrese su usuario y el correo con el que se registro: </h1>
                </div>
                <div>
                  <Form
                    name='login'
                    onFinish={onFinish}
                    autoComplete='on'
                    disabled={isLoading}
                    layout='vertical'
                  >
                    <Form.Item
                      name='username'
                      label='Usuario'
                      rules={[
                        {
                          required: true,
                          message: 'Por favor, ingrese su usuario.',
                        },
                      ]}
                    >
                      <Input placeholder='Usuario'/>
                    </Form.Item>

                    <Form.Item
                      name='email'
                      label='Correo'
                      rules={[
                        {
                          required: true,
                          message: 'Por favor, ingrese su correo.',
                          type: 'email'
                        },
                      ]}
                    >
                      <Input placeholder='Correo'/>
                    </Form.Item>

                    <Form.Item >
                      <Button type='primary' htmlType='submit' className='w-full mt-3' loading={isLoading}>
                    Enviar
                      </Button>
                    </Form.Item>

                    <div className='flex flex-row justify-center'>
                      <Link to='/'>Ir al inicio de sesion</Link>
                    </div>
                  </Form>
                </div>
              </>
            )}

            {exist && (
              <>
                <Form
                  name='FormPassword'
                  autoComplete='on'
                  disabled={isLoading}
                  layout='vertical'
                  onFinish={onFinishPassword}
                >
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
                        Restrablecer contraseña
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </>
            )}

          </div>
        </Card>
      </div>
    </div>

  );
};

export default ForgotPassword;
