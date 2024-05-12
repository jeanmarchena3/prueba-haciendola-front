import { Modal } from 'antd';
const { confirm } = Modal;

export const showConfirm = async ({
  title = '',
  content = '',
  onOk = ()=>{},
  values = {},
  okText = 'Aceptar',
  cancelButtonProps = {},
  okButtonProps = {}
}) => {
  return (
    confirm({
      title: title,
      centered: true,
      width: 500,
      icon: null,
      content: content,
      async onOk() {
        await onOk(values);
      },
      okText: okText,
      okButtonProps,
      onCancel() {
      },
      cancelText: 'Cancelar',
      cancelButtonProps: cancelButtonProps
    })
  );
};

export const handleErrorSession = error=>{
  const nameError = error?.response?.data?.error?.name || '';
  console.log('el error name: ', nameError);
  if (nameError === 'TOKEN_EXPIRADO') {
    return 'Su sesion ha expirado, por favor inicie sesion nuevamente';
  }

  if (nameError === 'CREDENCIALES_INCORRECTAS') {
    return 'Credenciales invalidas';
  }

  return 'Ha ocurrido un error, intente nuevamente';
};
