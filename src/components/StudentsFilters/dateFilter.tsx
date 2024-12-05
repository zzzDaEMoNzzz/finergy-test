import { memo, useCallback, useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/models/pickers';
import dayjs, { Dayjs } from 'dayjs';

import { StudentsFilters } from '@/store/students/types';
import { useIsFirstRender } from '@/hooks/useIsFirstRender';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getStudents,
  selectStudentsFilters,
  setStudentsFilters,
  setStudentsPage,
} from '@/store/students/slice';

type Props = {
  field: keyof StudentsFilters;
  label: string;
  min?: Date | null;
  max?: Date | null;
};

export const StudentsDateFilter = memo<Props>((props) => {
  const { label, field, min, max } = props;

  const dispatch = useAppDispatch();
  const isFirstRender = useIsFirstRender();

  const filters = useAppSelector(selectStudentsFilters);
  const filterDate = filters[field];

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
    if (isFirstRender || open || !isValid) return;
    const isDateChanged = !dayjs(filterDate || undefined).isSame(dayjs(date || undefined));
    if (isDateChanged) {
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
