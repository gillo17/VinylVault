import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const showErrorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error!',
      text2: 'Something went wrong. Please try again.',
    });
  };

const toastConfig = {
  success: ({ text1, text2 }: any) => (
    <BaseToast
      style={[styles.container, { borderLeftColor: 'green', backgroundColor: '#e6ffe6' }]}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text1={text1}
      text2={text2}
    />
  ),
  error: ({ text1, text2 }: any) => (
    <ErrorToast
      style={[styles.container, { borderLeftColor: 'red', backgroundColor: '#ffe6e6' }]}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text1={text1}
      text2={text2}
    />
  ),
  info: ({ text1, text2 }: any) => (
    <View style={[styles.container, { borderLeftColor: 'blue', backgroundColor: '#e6f7ff' }]}>
      <Text style={styles.text1}>{text1}</Text>
      <Text style={styles.text2}>{text2}</Text>
    </View>
  ),
};

const ToastNotification = () => {
  return <Toast config={toastConfig} />;
};

const styles = StyleSheet.create({
    container: {
      borderLeftWidth: 5,
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 10,
    },
    text1: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    text2: {
      fontSize: 14,
      color: '#555',
    },
  });

export default [ToastNotification, showErrorToast];
