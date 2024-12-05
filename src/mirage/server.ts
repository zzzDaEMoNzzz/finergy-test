import { createServer, Model } from 'miragejs';

import { Student } from '@/types/student';

import studentsFixtures from './students/fixtures.json';
import { setupStudentsRoutes } from './students';

export const makeMirageServer = () => {
  return createServer({
    models: {
      student: Model.extend<Partial<Student>>({}),
    },
    fixtures: {
      students: studentsFixtures,
    },
    routes() {
      this.namespace = 'api';
      setupStudentsRoutes.call(this);
    },
  });
};
