import * as yup from 'yup';

const TASKS_VALIDATION_SCHEMA = yup.object({
  taskName: yup
    .string()
    .required('Введіть задачу')
    .trim()
    .min(2, 'Мінімум 2 символи')
    .max(64, 'Максимум 64 сиволів'),
});

export default TASKS_VALIDATION_SCHEMA;
