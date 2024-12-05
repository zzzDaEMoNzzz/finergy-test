/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'miragejs';
import { AnyRegistry } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

export function studentsPatchRoute(this: any, schema: Schema<AnyRegistry>, request: Request) {
  const id = request.params.id;
  const student = schema.find('student', id);
  if (!student) {
    return new Response(404, undefined, { error: 'Student not found.' });
  }

  const body = JSON.parse(request.requestBody);
  delete body.id;

  Object.keys(body).forEach((key) => {
    if (key in student) {
      student[key as keyof typeof student] = body[key];
    }
  });

  student.save();
  return this.serialize(student);
}
