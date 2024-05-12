import React, { useState } from 'react';
import { Typography, Card, Layout, Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { decryptData } from '../../../config/crypto';
import ChangePassword from '../../ChangePassword';

const { Title } = Typography;
const { Content } = Layout;

const MainLayout = ({ setAuthenticated, children }) => {
  const [showChangePassword, setChangePassword] = useState(false);
  const { username = '' } = decryptData('user');
  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem('user');
    setAuthenticated(false);
    navigate('/');
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center my-4'>
        <div className='w-5/6 md:w-[90%]'>
          <div className='flex flex-row justify-start flex-wrap items-end gap-3'>
            <div>
              <Title level={3} className='!my-0 py-0'>Bienvenido {username}</Title>
            </div>
            <div className='flex flex-row justify-start flex-wrap items-end gap-3'>
              <div className='underline '>
                <Button type='link' onClick={()=>{setChangePassword(true);}}>Cambiar contrasena</Button>
              </div>
              <div className='underline '>
                <Button type='link' onClick={logout}>Cerrar sesion</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Content className='flex flex-col justify-center items-center my-4'>
        <div className='w-5/6 md:w-[90%]'>
          <Card className='shadow-lg shadow-stone-400'>
            {children ? children : <Outlet />}
          </Card>
        </div>
      </Content>

      <ChangePassword
        showChangePassword={showChangePassword}
        onOk={()=>{console.log('di en ok');}}
        onCancel={()=>{setChangePassword(false);}}
      />
    </>
  );
};

export default MainLayout;
