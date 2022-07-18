// Copyright 2021 The Perses Authors
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

import { useState, useMemo, useContext } from 'react';
import { AbsoluteTimeRange, RelativeTimeRange, toAbsoluteTimeRange } from '@perses-dev/core';
import { TimeRangeContext } from '@perses-dev/plugin-system';

export interface TimeRangeProviderProps {
  initialValue: AbsoluteTimeRange | RelativeTimeRange;
  children?: React.ReactNode;
}

/**
 * Provider implementation that supplies the TimeRangeState at runtime.
 */
export function TimeRangeStateProvider(props: TimeRangeProviderProps) {
  // TODO (sjcobb): sync url with relative time, use utils from cloud

  const { initialValue, children } = props;

  // Use initialValue to populate state (TODO: Will prob need to expose "setter" API eventually)
  const [timeRange] = useState(() => {
    if ('pastDuration' in initialValue) {
      return toAbsoluteTimeRange(initialValue);
    }
    return initialValue;
  });

  const ctx = useMemo(() => ({ timeRange }), [timeRange]);

  return <TimeRangeContext.Provider value={ctx}>{children}</TimeRangeContext.Provider>;
}

/**
 * Gets the setters for Time Range state provided by the TimeRangeStateProvider at runtime.
 */
export function useTimeRangeSetters() {
  const ctx = useContext(TimeRangeContext);
  if (ctx === undefined) {
    throw new Error('No TimeRangeContext found. Did you forget a Provider?');
  }
  return ctx;
}
