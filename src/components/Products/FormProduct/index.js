import React, { useState, useEffect } from 'react';
import { Typography, Button, Form, Input, Divider, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Title } = Typography;

import { createProduct, getProduct, editProduct } from '../api';
import { decryptData } from '../../../config/crypto';
import InputNumber from '../../InputNumber';
import { handleErrorSession } from '../../../utils';

const FormProduct = () => {
  const [loading, setLoading] = useState(false);
  const [valueDescription, setValueDescription] = useState('');

  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const getData = async () =>{
    setLoading(true);
    try {
      const token = decryptData('user').token;
      const { data = {} } = await getProduct({ token, id });
      const { comparePrice } = data;
      form.setFieldsValue({
        ...data,
        compare_price: comparePrice
      });
      setLoading(false);
    } catch (error) {
      message.error(handleErrorSession(error));
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    id && getData();
  }, [id]);

  const onFinish = async values => {
    setLoading(true);
    try {
      const token = decryptData('user').token;
      id ? await editProduct({ token, id, data: values }) : await createProduct({ token, data: values });
      message.success(`Producto ${id ? 'editado' : 'creado'} exitosamente`);
      setLoading(false);
      navigate('/productos');
    } catch (error) {
      message.error(handleErrorSession(error));
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex flex-col'>
        <div className='flex flex-row justify-between items-center'>
          <div>
            <Title level={2} className='!my-0 py-0'>{id ? 'Editar producto' : 'Crear Producto'}</Title>
          </div>
        </div>
        <Divider />
      </div>
      <div>
        <Form
          name='FormProduct'
          onFinish={onFinish}
          autoComplete='on'
          disabled={loading}
          layout='vertical'
          form={form}
        >
          <div className='flex flex-row flex-wrap'>
            <div className='flex w-full md:w-1/3'>
              <Form.Item
                name='handle'
                label='Manejador'
                className='w-full md:w-5/6'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingrese el manejador del producto.',
                  },
                ]}
              >
                <Input placeholder='Manejador'/>
              </Form.Item>
            </div>

            <div className='flex w-full md:w-1/3'>
              <Form.Item
                name='title'
                label='Titulo'
                className='w-full md:w-5/6'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingrese el titulo del producto.',
                  },
                ]}
              >
                <Input placeholder='Titutlo'/>
              </Form.Item>
            </div>

            <div className='flex w-full md:w-1/3'>
              <Form.Item
                name='sku'
                label='SKU'
                className='w-full md:w-5/6'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingrese el SKU del producto.',
                  },
                ]}
              >
                <InputNumber placeholder='SKU'/>

              </Form.Item>
            </div>

            <div className='flex w-full md:w-1/3'>
              <Form.Item
                name='grams'
                label='Gramos'
                className='w-full md:w-5/6'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingrese los gramos del producto.',
                  },
                ]}
              >
                <InputNumber placeholder='Gramos'/>
              </Form.Item>
            </div>

            <div className='flex w-full md:w-1/3'>
              <Form.Item
                name='stock'
                label='Stock'
                className='w-full md:w-5/6'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingrese el stock del producto.',
                  },
                ]}
              >
                <InputNumber placeholder='Stock'/>
              </Form.Item>
            </div>

            <div className='flex w-full md:w-1/3'>
              <Form.Item
                name='price'
                label='Precio'
                className='w-full md:w-5/6'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingrese el precio del producto.',
                  },
                ]}
              >
                <InputNumber placeholder='Precio'/>
              </Form.Item>
            </div>

            <div className='flex w-full md:w-1/3'>
              <Form.Item
                name='compare_price'
                label='Precio comparacion'
                className='w-full md:w-5/6'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingrese el precio comparacion del producto.',
                  },
                ]}
              >
                <InputNumber placeholder='Precio comparacion'/>
              </Form.Item>
            </div>

            <div className='flex w-full md:w-1/3'>
              <Form.Item
                name='barcode'
                label='Codigo de barra'
                className='w-full md:w-5/6'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingrese el codigo de barra del producto.',
                  },
                ]}
              >
                <InputNumber placeholder='Codigo de barra'/>
              </Form.Item>
            </div>

          </div>

          <div className='flex flex-col w-full'>
            <Form.Item
              name='description'
              label='Descripcion'
              className='w-full'
              rules={[
                {
                  required: true,
                  message: 'Por favor, ingrese la descripcion del producto.',
                },
              ]}
            >
              <ReactQuill
                theme='snow'
                value={valueDescription}
                onChange={setValueDescription}
                className='h-[150px] md:h-[200px]'
                placeholder='descripcion'
                readOnly={loading}
              />
            </Form.Item>
          </div>

          <div className='flex w-full justify-end'>
            <Form.Item className='mb-0'>
              <Button type='primary' htmlType='submit' className='w-full mt-12 md:mt-6' loading={loading}>
                {id ? 'Editar producto' : 'Crear Producto'}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FormProduct;
