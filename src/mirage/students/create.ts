/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from '@faker-js/faker';
import { Request } from 'miragejs';
import { AnyRegistry } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

import { StudentStatuses } from '@/types/student';

export function studentsCreateRoute(this: any, schema: Schema<AnyRegistry>, request: Request) {
  const body = JSON.parse(request.requestBody);
  const student = schema.create('student', {
    ...body,
    id: faker.string.uuid(),
    status: StudentStatuses.Studies,
  });
  return this.serialize(student);
}
