import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { combineSx } from '@perses-dev/components';

export type PageHeaderProps<C extends React.ElementType> = BoxProps<C> & {
  component?: C;
};

export function PageHeader<C extends React.ElementType = 'div'>(props: PageHeaderProps<C>) {
  const { children, sx, ...others } = props;
  return (
    <Box
      sx={combineSx(
        (theme) => ({
          marginBottom: '12px',
          padding: theme.spacing(0, 2),
          // backgroundColor:
          //   theme.palette.mode === 'dark'
          //     ? theme.palette.designSystem.grey[950]
          //     : theme.palette.common.white,
          borderBottom: `2px solid ${theme.palette.grey[300]}`,
          minHeight: 58,
          display: 'flex',
          justifyContent: ' space-between',
          alignItems: 'center',
        }),
        sx
      )}
      {...others}
    >
      {children}
    </Box>
  );
}
