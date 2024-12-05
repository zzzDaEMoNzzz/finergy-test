import { Server } from 'miragejs/server';

import { studentsSearchRoute } from './search';
import { studentsPatchRoute } from './patch';

export function setupStudentsRoutes(this: Server) {
  this.get('students', (schema) => {
    return schema.all('student');
  });
  this.patch('students/:id', studentsPatchRoute);
  this.post('students/search', studentsSearchRoute);
}
