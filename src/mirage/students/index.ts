import { Model } from 'miragejs';
import { Server, ServerConfig } from 'miragejs/server';
import { AnyFactories, AnyModels } from 'miragejs/-types';

import { Student } from '@/types/student';

import { studentsSearchRoute } from './search';
import { studentsPatchRoute } from './patch';
import { studentsCreateRoute } from './create';
import fixtures from './fixtures.json';

export function setupStudentsRoutes(this: Server) {
  this.get('students', (schema) => {
    return schema.all('student');
  });
  this.patch('students/:id', studentsPatchRoute);
  this.post('students/search', studentsSearchRoute);
  this.post('students', studentsCreateRoute);
}

export function setupStudentsServer(
  config: ServerConfig<AnyModels, AnyFactories>,
  routesHandlers: ((this: Server) => void)[],
) {
  config.models!.student = Model.extend<Partial<Student>>({});
  config.fixtures!.students = fixtures;
  routesHandlers.push(setupStudentsRoutes);
}
