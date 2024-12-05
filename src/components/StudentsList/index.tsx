'use client';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getStudents, selectStudents } from '@/store/students/slice';

export const StudentsList = () => {
  const dispatch = useAppDispatch();
  const students = useAppSelector(selectStudents);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  useEffect(() => {
    console.log({ students });
  }, [students]);

  return null;
};
