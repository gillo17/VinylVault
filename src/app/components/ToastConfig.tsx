import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { ToastConfig, ToastConfigParams } from 'react-native-toast-message/lib/src/types';

const toastConfig: ToastConfig = {
  success: ({ text1, text2, props }: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green', backgroundColor: '#d4edda', borderRadius: 8, zIndex: 9999 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}
      text2Style={{ fontSize: 14, color: '#666' }}
      text1={text1}
      text2={text2}
    />
  ),

  error: ({ text1, text2, props }: ToastConfigParams<any>) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: 'red', backgroundColor: '#f8d7da', borderRadius: 8, zIndex: 9999 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}
      text2Style={{ fontSize: 14, color: '#666' }}
      text1={text1} 
      text2={text2} 
    />
  ),
};

export default toastConfig;
