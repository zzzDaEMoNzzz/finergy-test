import { memo, useCallback, useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

import { StudentsFilters } from '@/store/students/types';
import { useAppDispatch } from '@/store/hooks';
import { getStudents, setStudentsFilters, setStudentsPage } from '@/store/students/slice';

type Props = {
  field: keyof StudentsFilters;
  label: string;
};

export const StudentsDateFilter = memo<Props>((props) => {
  const { label, field } = props;

  const dispatch = useAppDispatch();

  const [date, setDate] = useState<Dayjs | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);

  const onChange = useCallback((newDate: Dayjs | null) => {
    setDate(newDate);
  }, []);

  useEffect(() => {
    if (!open) {
      dispatch(setStudentsFilters({ [field]: date }));
      dispatch(setStudentsPage(0));
      dispatch(getStudents());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, date]);

  return (
    <DatePicker
      label={label}
      slotProps={{
        textField: { size: 'small' },
        field: { clearable: true },
      }}
      value={date}
      onChange={onChange}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
    />
  );
});

StudentsDateFilter.displayName = 'StudentsDateFilter';
