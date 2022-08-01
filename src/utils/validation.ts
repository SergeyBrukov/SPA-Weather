const REQURED_TEXT = 'Neccesary for filling';

export const locationValidation = {
  required: REQURED_TEXT,
  pattern: {
    value: /[A-Za-zА-Яа-яЁё]/,
    message: 'Message not be number',
  },
};
