'use client';

import { useEffect } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { getStudents } from '@/store/students/slice';

export const StudentsList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStudents({}));
  }, [dispatch]);

  return null;
};
