export const StudentStatuses = {
  Studies: 0,
  Expelled: 1,
} as const;

export type StudentStatus = (typeof StudentStatuses)[keyof typeof StudentStatuses];

export type Student = {
  id: number;
  name: string;
  dateBirth: string;
  idnp: string;
  status: StudentStatus;
};
