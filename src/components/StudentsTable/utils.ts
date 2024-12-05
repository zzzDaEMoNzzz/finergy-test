import { LabelDisplayedRowsArgs } from '@mui/material/TablePagination/TablePagination';

export const getPaginationDisplayedRowsLabel = (paginationInfo: LabelDisplayedRowsArgs) => {
  const { from, to, count } = paginationInfo;
  return `${from}–${to} из ${count}`;
};
