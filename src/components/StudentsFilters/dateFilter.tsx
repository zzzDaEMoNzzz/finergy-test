import { memo, useCallback, useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/models/pickers';
import dayjs, { Dayjs } from 'dayjs';

import { StudentsFilters } from '@/store/students/types';
import { useAppDispatch } from '@/store/hooks';
import { getStudents, setStudentsFilters, setStudentsPage } from '@/store/students/slice';

type Props = {
  field: keyof StudentsFilters;
  label: string;
  min?: Date | null;
  max?: Date | null;
};

export const StudentsDateFilter = memo<Props>((props) => {
  const { label, field, min, max } = props;

  const dispatch = useAppDispatch();

  const [date, setDate] = useState<Dayjs | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isValid, setIsValid] = useState(true);

  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = useCallback((newDate: Dayjs | null, ctx: PickerChangeHandlerContext<any>) => {
    setDate(newDate);
    setIsValid(!ctx.validationError);
  }, []);

  useEffect(() => {
    if (!open && isValid) {
      dispatch(setStudentsFilters({ [field]: date ? date.toDate() : null }));
      dispatch(setStudentsPage(0));
      dispatch(getStudents());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, date, isValid]);

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
      minDate={min ? dayjs(min) : undefined}
      maxDate={max ? dayjs(max) : undefined}
    />
  );
});

StudentsDateFilter.displayName = 'StudentsDateFilter';
