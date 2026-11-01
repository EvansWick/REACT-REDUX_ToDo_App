import * as yup from 'yup';

const TASKS_VALIDATION_SCHEMA = yup.object({
  taskName: yup
    .string()
    .required('Введіть задачу')
    .min(2, 'Задача має містити мінімум 2 символи')
    .max(12, 'В задачі може бути максимум 12 сиволів'),
});

export default TASKS_VALIDATION_SCHEMA;
