import React, { useState } from 'react';
import { Card, Form, Input, Button, message, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { login } from './api';
import { encryptData } from '../../config/crypto';

const { Title } = Typography;

const Login = ({ setIsAuthenticated }) => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async values => {
    setLoading(true);
    try {

      const responseLogin = await login(values);
      const { data } = responseLogin;
      await encryptData('user', data);
      setIsAuthenticated(true);
      setLoading(false);
      navigate('/productos');

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
              <Title level={2} className='my-0'>Bienvenido</Title>
            </div>
            <div>
              <h1 className='text-center'>Accede a tu cuenta</h1>
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
                  name='password'
                  label='Contraseña'
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, ingrese su contraseña.',
                    },
                  ]}
                >
                  <Input.Password placeholder='Contraseña'/>
                </Form.Item>

                <Form.Item >
                  <Button type='primary' htmlType='submit' className='w-full mt-3' loading={isLoading}>
                  Acceder a mi cuenta
                  </Button>
                </Form.Item>

                <div className='flex flex-row justify-center'>
                  <Link to='recuperar-contrasena'>¿Olvidaste tu contraseña?</Link>
                </div>
              </Form>
            </div>
          </div>
        </Card>
      </div>
    </div>

  );
};

export default Login;
