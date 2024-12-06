import { ChangeEvent, memo, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';

import { StudentsFilters } from '@/store/students/types';
import { debounce } from '@/utils/debounce';
import { useAppDispatch } from '@/store/hooks';
import { getStudents, setStudentsFilters, setStudentsPage } from '@/store/students/slice';

type Props = {
  field: keyof StudentsFilters;
  label: string;
  validator?: (value: string) => boolean;
  errorText?: string;
};

const defaultValidator = () => true;

export const StudentsTextFilter = memo<Props>((props) => {
  const { label, field, validator = defaultValidator, errorText } = props;

  const dispatch = useAppDispatch();

  const [isValid, setIsValid] = useState(true);

  const onChange = useMemo(() => {
    return debounce((event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.trim();
      const isValid = !value || validator(value);
      setIsValid(isValid);
      if (isValid) {
        dispatch(setStudentsFilters({ [field]: value }));
        dispatch(setStudentsPage(0));
        dispatch(getStudents());
      }
    }, 300);
  }, [dispatch, field, validator]);

  return (
    <TextField
      label={label}
      size="small"
      type="search"
      onChange={onChange}
      error={!isValid}
      helperText={!isValid ? errorText : undefined}
    />
  );
});

StudentsTextFilter.displayName = 'StudentsTextFilter';
