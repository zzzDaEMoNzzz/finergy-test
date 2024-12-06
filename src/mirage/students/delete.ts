/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'miragejs';
import { AnyRegistry } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

export function studentsDeleteRoute(this: any, schema: Schema<AnyRegistry>, request: Request) {
  const id = request.params.id;
  const student = schema.find('student', id);
  if (!student) {
    return new Response(404, undefined, { error: 'Student not found.' });
  }
  student.destroy();
  return new Response(200, undefined, { message: 'Student deleted successfully.' });
}
