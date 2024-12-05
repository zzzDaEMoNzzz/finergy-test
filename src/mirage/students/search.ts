/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collection, Request } from 'miragejs';
import { AnyRegistry, Instantiate } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

import { Student } from '@/types/student';
import { StudentsFilters } from '@/store/students/types';

export function studentsSearchRoute(this: any, schema: Schema<AnyRegistry>, request: Request) {
  const body = JSON.parse(request.requestBody);
  const { sortBy, sortOrder, page, perPage } = body;
  const filters = body.filters as StudentsFilters;

  let collection = schema.all('student');

  if (filters) {
    collection = handleFilters(collection, filters);
  }

  if (sortBy && sortOrder) {
    collection = handleSorting(collection, sortBy, sortOrder);
  }

  const total = collection.length;

  if (typeof page === 'number' && typeof perPage === 'number') {
    collection = handlePagination(collection, page, perPage);
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
}

function handleFilters(
  collection: Collection<Instantiate<AnyRegistry, 'student'>>,
  filters: StudentsFilters,
) {
  let filteredCollection = collection;
  Object.keys(filters).forEach((key) => {
    const value = filters[key as keyof StudentsFilters];
    switch (key as keyof StudentsFilters) {
      case 'lastName':
      case 'firstName':
      case 'idnp':
        const searchValue = (value || '').toString().toLowerCase();
        filteredCollection = filteredCollection.filter((s) => {
          const student = s.attrs as Student;
          return student[key as keyof Student].toString().toLowerCase().includes(searchValue);
        });
        break;
      case 'dateBirthFrom':
        const from = new Date(value as string);
        filteredCollection = filteredCollection.filter((s) => {
          const student = s.attrs as Student;
          return new Date(student.dateBirth) >= from;
        });
        break;
      case 'dateBirthTo':
        const to = new Date(value as string);
        filteredCollection = filteredCollection.filter((s) => {
          const student = s.attrs as Student;
          return new Date(student.dateBirth) <= to;
        });
        break;
      default:
        console.warn('Unknown filter:', key);
    }
  });
  return filteredCollection;
}

function handleSorting(
  collection: Collection<Instantiate<AnyRegistry, 'student'>>,
  sortBy: string | undefined,
  sortOrder: string | undefined,
) {
  const orderValue = sortOrder === 'asc' ? 1 : -1;
  return collection.sort((a, b) => {
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

function handlePagination(
  collection: Collection<Instantiate<AnyRegistry, 'student'>>,
  page: number,
  perPage: number,
) {
  const start = page * perPage;
  const end = start + perPage;
  return collection.slice(start, end);
}
