export const StudentStatuses = {
  Expelled: 0,
  Studies: 1,
} as const;

export type StudentStatus = (typeof StudentStatuses)[keyof typeof StudentStatuses];

export type Student = {
  id: string;
  lastName: string;
  firstName: string;
  dateBirth: string | Date;
  idnp: string;
  status: StudentStatus;
};
