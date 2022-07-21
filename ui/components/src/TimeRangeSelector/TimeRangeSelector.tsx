// Copyright 2022 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// import {
//   styled,
//   TooltipProps as MuiTooltipProps,
//   Tooltip as MuiTooltip,
//   tooltipClasses,
//   Typography,
// } from '@mui/material';

// import { useCallback } from 'react';
// import { TextField } from '@mui/material';
// // import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface TimeRangeSelectorProps {
  id?: string;
}

export const TimeRangeSelector = ({ id }: TimeRangeSelectorProps) => {
  console.log('TimeRangeSelector -> id: ', id);

  // // const [{ value }, , { setValue }] = timeModeProps;

  // // const { setValue, setOptions } = useTemplateVariablesSetters();

  // const setValue = useCallback(
  //   () => {
  //     console.log('TimeRangeSelector -> setValue...');
  //   },
  //   []
  //   // [setState, variableDefinitions]
  // );

  // return (
  //   <LocalizationProvider dateAdapter={AdapterDateFns}>
  //     {/* <p>TODO: add TimeRangeSelector component</p> */}
  //     <DateTimePicker
  //       renderInput={(props) => <TextField {...props} />}
  //       label="DateTimePicker"
  //       value={1658153703847}
  //       onChange={(newValue) => {
  //         console.log(newValue);
  //         // setValue(newValue);
  //         setValue();
  //       }}
  //       // onChange={(newValue) => {
  //       //   setValue(newValue);
  //       // }}
  //     />
  //   </LocalizationProvider>
  // );

  return <p>TEST...</p>;
};
