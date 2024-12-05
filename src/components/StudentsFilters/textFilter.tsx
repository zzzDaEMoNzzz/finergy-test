import { ChangeEvent, memo, useMemo } from 'react';
import TextField from '@mui/material/TextField';

import { StudentsFilters } from '@/store/students/types';
import { debounce } from '@/utils/debounce';
import { useAppDispatch } from '@/store/hooks';
import { getStudents, setStudentsFilters, setStudentsPage } from '@/store/students/slice';

type Props = {
  field: keyof StudentsFilters;
  label: string;
};

export const StudentsTextFilter = memo<Props>((props) => {
  const { label, field } = props;

  const dispatch = useAppDispatch();

  const onChange = useMemo(() => {
    return debounce((event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.trim();
      dispatch(setStudentsFilters({ [field]: value }));
      dispatch(setStudentsPage(0));
      dispatch(getStudents());
    }, 300);
  }, [dispatch, field]);

  return <TextField label={label} size="small" type="search" onChange={onChange} />;
});

StudentsTextFilter.displayName = 'StudentsTextFilter';
