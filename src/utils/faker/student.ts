import { faker } from '@faker-js/faker';

import { Student, StudentStatus } from '@/types/student';

export const createRandomStudent = (): Student => {
  return {
    id: faker.string.uuid(),
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    dateBirth: faker.date.birthdate(),
    idnp: faker.string.numeric(13),
    status: faker.number.int({ min: 0, max: 1 }) as StudentStatus,
  };
};

export const createRandomStudents = (num = 100) => {
  return Array.from({ length: num }, () => createRandomStudent());
};
