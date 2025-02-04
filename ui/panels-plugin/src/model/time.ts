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

import { getSuggestedStepMs } from '@perses-dev/core';
import { useTimeRange } from '@perses-dev/plugin-system';

/**
 * Gets the suggested step for a graph query in ms for the currently selected time range.
 */
export function useSuggestedStepMs(width?: number) {
  const { timeRange } = useTimeRange();
  if (width === undefined) return 0;
  return getSuggestedStepMs(timeRange, width);
}
