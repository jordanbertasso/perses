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

import React, { useMemo, useState } from 'react';
import { isRelativeTimeRange, TimeRangeValue } from '@perses-dev/core';
import { TimeRange, TimeRangeContext, useTimeRangeContext } from '@perses-dev/plugin-system';
import { useSetTimeRangeParams } from './query-params';

export interface TimeRangeProviderProps {
  initialTimeRange: TimeRangeValue;
  enabledURLParams?: boolean;
  children?: React.ReactNode;
}

/**
 * Provider implementation that supplies the time range state at runtime.
 */
export function TimeRangeProvider(props: TimeRangeProviderProps) {
  const { initialTimeRange, enabledURLParams, children } = props;

  const { timeRange: timeRangeParams, setTimeRange: setTimeRangeParams } = useSetTimeRangeParams(
    initialTimeRange,
    enabledURLParams
  );

  const [timeRange, setTimeRangeState] = useState(timeRangeParams);

  const ctx = useMemo(() => {
    const setTimeRange: TimeRange['setTimeRange'] = (timeRange) => {
      if (isRelativeTimeRange(timeRange) && timeRange.end) {
        setTimeRangeParams({ ...timeRange, end: undefined });
      } else {
        setTimeRangeParams(timeRange);
      }
      setTimeRangeState(timeRange);
    };
    return {
      timeRange,
      setTimeRange,
    };
  }, [timeRange, setTimeRangeState, setTimeRangeParams]);

  return <TimeRangeContext.Provider value={ctx}>{children}</TimeRangeContext.Provider>;
}

/**
 * Internal version of time range hook to get all supported values
 */
export function useDashboardTimeRange() {
  const { timeRange, setTimeRange } = useTimeRangeContext();
  return { timeRange, setTimeRange };
}
