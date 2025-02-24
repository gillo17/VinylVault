import React from 'react';
import Toast from 'react-native-toast-message';
import toastConfig from './ToastConfig';

const ToastProvider = () => {
  return <Toast config={toastConfig} />;
};

export default ToastProvider;
