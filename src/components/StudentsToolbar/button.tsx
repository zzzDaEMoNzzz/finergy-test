import { memo } from 'react';
import { ButtonProps } from '@mui/material/Button/Button';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

type Props = ButtonProps & {
  tooltip: string;
};

export const ToolbarButton = memo<Props>((props) => {
  const { tooltip } = props;
  return (
    <Tooltip title={tooltip}>
      <IconButton {...props} aria-label={tooltip} variant="outlined" color="info" />
    </Tooltip>
  );
});

ToolbarButton.displayName = 'ToolbarButton';

const IconButton = styled(Button)`
  min-width: 0;
  padding: 6px;
`;
