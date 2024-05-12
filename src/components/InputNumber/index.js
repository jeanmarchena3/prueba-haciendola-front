import React from 'react';
import { Input } from 'antd';

const InputNumber = props => {
  const handleChange = event => {
    const { value } = event.target;
    const reg = /^\d*(\.\d*)?$/;

    if ((!isNaN(value) && reg.test(value)) || value === '') {
      props.onChange(value);
    }
  };

  return <Input {...props} onChange={handleChange} />;
};

export default InputNumber;
