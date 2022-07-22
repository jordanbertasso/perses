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

import { useState } from 'react';
import { TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { isValid, format } from 'date-fns';
import { format } from 'date-fns';

const DATE_TIME_FORMAT = 'E MMM dd yyyy HH:mm:ss OOOO';

interface TimeRangeSelectorProps {
  start: number;
  end: number;
}

export const TimeRangeSelector = ({ start, end }: TimeRangeSelectorProps) => {
  const [startDate, setStartDate] = useState<string>(format(start, DATE_TIME_FORMAT));
  const [endDate, setEndDate] = useState<string>(format(end, DATE_TIME_FORMAT));

  const handleSelectStartDate = (start: string) => {
    setStartDate(start);
  };

  const handleSelectEndDate = (end: string) => {
    setEndDate(end);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* <DatePicker
        renderInput={(props) => <TextField {...props} />}
        label="Start Date"
        value={startDate}
        onChange={(newValue) => {
          const newDate = newValue ?? '1658153703847';
          handleSelectStartDate(newDate);
        }}
      /> */}
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Start Time"
        value={startDate}
        onChange={(newValue) => {
          if (newValue === null) return;
          handleSelectStartDate(newValue);
        }}
      />
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="End Time"
        value={endDate}
        onChange={(newValue) => {
          if (newValue === null) return;
          handleSelectEndDate(newValue);
        }}
      />
    </LocalizationProvider>
  );
};
