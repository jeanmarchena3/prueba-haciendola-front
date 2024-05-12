import React, { useState, useEffect } from 'react';
import { Typography, message, Table, Button } from 'antd';
import { getAllProducts, deleteProduct } from '../api';
import { decryptData } from '../../../config/crypto';

import { useNavigate } from 'react-router-dom';
import { showConfirm } from '../../../utils';
import { handleErrorSession } from '../../../utils';

const { Title } = Typography;

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getData = async () =>{
    setLoading(true);
    try {
      const token = decryptData('user').token;
      const { data = [] } = await getAllProducts(token);
      setData(data);
      setLoading(false);
    } catch (error) {
      message.error(handleErrorSession(error));
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const callDeleteProduct = async ({ id }) =>{
    setLoading(true);
    try {
      const token = decryptData('user').token;
      await deleteProduct({ token, id });

      setData(data.filter(x=> x.id !== id));
      setLoading(false);
    } catch (error) {
      message.error('Ha ocurrido un error, intente nuevamente');
      console.log(error);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: {
        showTitle: false,
      },
      width: '30%',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Compare price',
      dataIndex: 'comparePrice',
      key: 'comparePrice',
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => (
        <Button onClick={e=>{
          e.stopPropagation();
          showConfirm({
            title: `Desea eliminar este producto (${record.title})?`,
            onOk: callDeleteProduct,
            values: { id: record.id }
          });
        }}
        >
          Eliminar
        </Button>
      ),
    },
  ];

  const handleClickTable = record =>{
    const { id } = record;
    navigate(`/productos/${id}/editar`);
  };

  return (
    <div>
      <div className='flex flex-col'>
        <div className='flex flex-row justify-between items-center flex-wrap'>
          <div>
            <Title level={2} className='!my-0 py-0'>Productos</Title>
          </div>
          <div>
            <Button type='primary' onClick={()=>{navigate('/productos/crear');}}>Agregar producto</Button>
          </div>
        </div>

        <div className='flex flex-col '>
          <Table
            dataSource={data}
            columns={columns}
            rowKey='id'
            pagination={{
              pageSize: 8
            }}
            scroll={{ x: true, y: true }}
            loading={loading}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {handleClickTable(record);},
              };
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
