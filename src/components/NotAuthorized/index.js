import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const NotAuthorized = () => {

  return (
    <div>
      <div><Title level={2} className='my-0'>NO AUTORIZADO</Title></div>
    </div>
  );
};

export default NotAuthorized;
