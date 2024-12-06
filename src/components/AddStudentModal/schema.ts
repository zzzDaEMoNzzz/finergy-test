import { object, string, date } from 'yup';

import { IDNPRegex } from '@/utils/validators';

export const studentSchema = object({
  lastName: string().required('Обязательное поле!'),
  firstName: string().required('Обязательное поле!'),
  dateBirth: date().required('Обязательное поле!'),
  idnp: string()
    .matches(IDNPRegex, { message: 'Введите валидный IDNP' })
    .required('Обязательное поле!'),
});
