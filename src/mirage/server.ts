import { createServer, Model } from 'miragejs';

import { Student } from '@/types/student';
import { StudentsFilters } from '@/store/students/types';

import students from './students.json';

export const makeMirageServer = () => {
  return createServer({
    models: {
      student: Model.extend<Partial<Student>>({}),
    },

    fixtures: {
      students,
    },

    routes() {
      this.namespace = 'api';

      this.get('students', (schema) => {
        return schema.all('student');
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.post('students/search', function (this: any, schema, request) {
        const body = JSON.parse(request.requestBody);
        const { sortBy, sortOrder, page, perPage } = body;
        const filters = body.filters as StudentsFilters;

        let collection = schema.all('student');

        if (filters) {
          Object.keys(filters).forEach((key) => {
            const value = filters[key as keyof StudentsFilters];
            switch (key as keyof StudentsFilters) {
              case 'lastName':
              case 'firstName':
              case 'idnp':
                const searchValue = (value || '').toString().toLowerCase();
                collection = collection.filter((s) => {
                  const student = s.attrs as Student;
                  return student[key as keyof Student]
                    .toString()
                    .toLowerCase()
                    .includes(searchValue);
                });
                break;
              case 'dateBirthFrom':
                const from = new Date(value as string);
                collection = collection.filter((s) => {
                  const student = s.attrs as Student;
                  return new Date(student.dateBirth) >= from;
                });
                break;
              case 'dateBirthTo':
                const to = new Date(value as string);
                collection = collection.filter((s) => {
                  const student = s.attrs as Student;
                  return new Date(student.dateBirth) <= to;
                });
                break;
              default:
                console.warn('Unknown filter:', key);
            }
          });
        }

        if (sortBy && sortOrder) {
          const orderValue = sortOrder === 'asc' ? 1 : -1;
          collection = collection.sort((a, b) => {
            if (typeof sortBy === 'string' && sortBy in a) {
              const aValue = a[sortBy as keyof typeof a];
              const bValue = b[sortBy as keyof typeof b];
              if (aValue && bValue) {
                return aValue.toString().localeCompare(bValue.toString()) * orderValue;
              }
            }
            return 0;
          });
        }

        const total = collection.length;

        if (typeof page === 'number' && typeof perPage === 'number') {
          const start = page * perPage;
          const end = start + perPage;
          collection = collection.slice(start, end);
        }

        const json = this.serialize(collection);
        json.meta = {
          filters,
          sortBy,
          sortOrder,
          page,
          perPage,
          total,
        };

        return json;
      });
    },
  });
};
