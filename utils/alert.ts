import Toastify from 'toastify-js';

export const alertError = (message: string) => {
  Toastify({
    text: message,
    duration: 3000,
    close: false,
    style: {
      background: 'red',
      color: 'white',
      textAlign: 'center',
    },
  }).showToast();
};
