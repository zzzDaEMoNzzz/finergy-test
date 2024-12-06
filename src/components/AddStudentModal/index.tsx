import { memo, useCallback } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import { DatePicker } from '@mui/x-date-pickers';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { useAppDispatch } from '@/store/hooks';
import { addStudent } from '@/store/students/api';
import { getStudents } from '@/store/students/slice';

import { studentSchema } from './schema';
import CircularProgress from '@mui/material/CircularProgress';
import { showNotification } from '@/store/notifications/slice';

type Props = Omit<DialogProps, 'onClose'> & {
  onClose: () => void;
};

type FormType = {
  lastName: string;
  firstName: string;
  dateBirth: Dayjs | null;
  idnp: string;
};

export const AddStudentModal = memo<Props>((props) => {
  const dispatch = useAppDispatch();

  const formik = useFormik<FormType>({
    initialValues: {
      lastName: '',
      firstName: '',
      dateBirth: null,
      idnp: '',
    },
    validationSchema: studentSchema,
    onSubmit: async (values) => {
      await addStudent({
        ...values,
        dateBirth: values.dateBirth!.toISOString(),
      });
      dispatch(getStudents());
      dispatch(showNotification({ description: 'Студент добавлен', severity: 'success' }));
      formik.resetForm();
      props.onClose();
    },
  });

  const onChangeDateBirth = useCallback(
    (value: Dayjs | null) => {
      formik.setFieldValue('dateBirth', value, true);
    },
    [formik],
  );

  return (
    <Dialog {...props} aria-labelledby="Добавить нового студента">
      <DialogTitle>Добавить нового студента</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          minWidth={400}
          component="form"
          onSubmit={formik.handleSubmit}
          paddingTop={1}
        >
          <TextField
            fullWidth
            label="Фамилия"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            required
            size="small"
          />
          <TextField
            fullWidth
            label="Имя"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            required
            size="small"
          />
          <DatePicker
            slotProps={{
              textField: {
                fullWidth: true,
                error: formik.touched.dateBirth && Boolean(formik.errors.dateBirth),
                helperText: formik.touched.dateBirth && formik.errors.dateBirth,
                required: true,
                size: 'small',
              },
            }}
            label="Дата рождения"
            name="dateBirth"
            value={formik.values.dateBirth}
            onChange={onChangeDateBirth}
            maxDate={dayjs()}
          />
          <TextField
            fullWidth
            label="IDNP"
            id="idnp"
            name="idnp"
            value={formik.values.idnp}
            onChange={formik.handleChange}
            error={formik.touched.idnp && Boolean(formik.errors.idnp)}
            helperText={formik.touched.idnp && formik.errors.idnp}
            required
            size="small"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Отмена</Button>
        <Button
          onClick={formik.submitForm}
          startIcon={formik.isSubmitting && <CircularProgress size={14} color="inherit" />}
          disabled={formik.isSubmitting}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
});

AddStudentModal.displayName = 'AddStudentModal';
