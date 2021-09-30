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

import {
  AnyChartQueryDefinition,
  JsonObject,
  PanelProps,
  useChartQuery,
} from '@perses-ui/core';
import { useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';

import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';

export const LineChartKind = 'LineChart' as const;

type LineChartKind = typeof LineChartKind;

export type LineChartProps = PanelProps<LineChartKind, LineChartOptions>;

interface LineChartOptions extends JsonObject {
  query: AnyChartQueryDefinition;
  show_legend?: boolean;
}

const colorPool = [
  // '#000000',
  // '#FFFF00',
  '#1CE6FF',
  '#FF34FF',
  '#FF4A46',
  '#008941',
  '#006FA6',
  '#A30059',
  '#FFDBE5',
  '#7A4900',
  '#0000A6',
  '#63FFAC',
  '#B79762',
  '#004D43',
  '#8FB0FF',
  '#997D87',
  '#5A0007',
  '#809693',
  '#FEFFE6',
  '#1B4400',
  '#4FC601',
  '#3B5DFF',
  '#4A3B53',
  '#FF2F80',
  '#61615A',
  '#BA0900',
  '#6B7900',
  '#00C2A0',
  '#FFAA92',
  '#FF90C9',
  '#B903AA',
  '#D16100',
  '#DDEFFF',
  '#000035',
  '#7B4F4B',
  '#A1C299',
  '#300018',
  '#0AA6D8',
  '#013349',
  '#00846F',
  '#372101',
  '#FFB500',
  '#C2FFED',
  '#A079BF',
  '#CC0744',
  '#C0B9B2',
  '#C2FF99',
  '#001E09',
  '#00489C',
  '#6F0062',
  '#0CBD66',
  '#EEC3FF',
  '#456D75',
  '#B77B68',
  '#7A87A1',
  '#788D66',
  '#885578',
  '#FAD09F',
  '#FF8A9A',
  '#D157A0',
  '#BEC459',
  '#456648',
  '#0086ED',
  '#886F4C',
  '#34362D',
  '#B4A8BD',
  '#00A6AA',
  '#452C2C',
  '#636375',
  '#A3C8C9',
  '#FF913F',
  '#938A81',
  '#575329',
  '#00FECF',
  '#B05B6F',
  '#8CD0FF',
  '#3B9700',
  '#04F757',
  '#C8A1A1',
  '#1E6E00',
  '#7900D7',
  '#A77500',
  '#6367A9',
  '#A05837',
  '#6B002C',
  '#772600',
  '#D790FF',
  '#9B9700',
  '#549E79',
  '#FFF69F',
  '#201625',
  '#72418F',
  '#BC23FF',
  '#99ADC0',
  '#3A2465',
  '#922329',
  '#5B4534',
  '#FDE8DC',
  '#404E55',
  '#0089A3',
  '#CB7E98',
  '#A4E804',
  '#324E72',
  '#6A3A4C',
  '#83AB58',
  '#001C1E',
  '#D1F7CE',
  '#004B28',
  '#C8D0F6',
  '#A3A489',
  '#806C66',
  '#222800',
  '#BF5650',
  '#E83000',
  '#66796D',
  '#DA007C',
  '#FF1A59',
  '#8ADBB4',
  '#1E0200',
  '#5B4E51',
  '#C895C5',
  '#320033',
  '#FF6832',
  '#66E1D3',
  '#CFCDAC',
  '#D0AC94',
  '#7ED379',
  '#012C58',
];

export function LineChart(props: LineChartProps) {
  const {
    definition: {
      options: { query },
    },
  } = props;
  const { data, loading, error } = useChartQuery(query);
  const { width, ref } = useResizeDetector();

  const chartRef = useRef<HTMLDivElement>(null);
  const uplotRef = useRef<uPlot | null>(null);

  useEffect(() => {
    if (!chartRef.current) {
      throw new Error('no current ref');
    }

    const opts = {
      // id: 'chart1',
      // class: 'my-chart',
      width: width ?? 0,
      height: 290,
      series: [{}].concat(
        data.map((s, idx) => ({
          // initial toggled state (optional)
          show: true,

          spanGaps: false,

          // in-legend display
          label: s.name,
          value: (self: any, rawValue: any) => rawValue,

          // series style
          // stroke: colors[index].toString(),
          stroke: colorPool[idx],
          width: 1,
          // fill: 'rgba(255, 0, 0, 0.3)',
          // dash: [10, 5],
        }))
      ),
    };

    console.log(opts.series);

    if (data.length === 0) {
      return;
    }

    const chartData: uPlot.AlignedData = [
      data[0].columns
        .find((c) => c.seriesType === 'Date')
        ?.values.map((v) => v / 1000), // x-values (timestamps)
      ...data.map(
        (s) => s.columns.find((c) => c.seriesType === 'Number')?.values
      ),
    ];
    uplotRef.current = new uPlot(opts, chartData, chartRef.current);

    return () => {
      uplotRef.current?.destroy();
    };
  }, [data, width]);

  return (
    <div>
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      <div ref={ref}>
        <div ref={chartRef}></div>
      </div>
    </div>
  );
}

// export const getData = (
//   query: AnyChartQueryDefinition,
//   data: DataFrame[]
// ): uPlot.AlignedData => {
//   const { startTime, endTime, resolution } = query;

//   const timestamps: number[] = [];
//   for (let t = startTime; t <= endTime; t += resolution) {
//     timestamps.push(t);
//   }

//   const points: Array<Array<number | null | undefined>> = [];
//   data.forEach(({ values }) => {
//     // Insert nulls for all missing steps.
//     const data: Array<number | null | undefined> = [];
//     let pos = 0;

//     for (let t = startTime; t <= endTime; t += resolution) {
//       // Allow for floating point inaccuracy.
//       const currentValue = values[pos];
//       if (values.length > pos && currentValue[0] < t + resolution / 100) {
//         data.push(parseValue(currentValue[1], stacked));
//         pos++;
//       } else {
//         // TODO: Flot has problems displaying intermittent "null" values when stacked,
//         // resort to 0 now. In Grafana this works for some reason, figure out how they
//         // do it.
//         data.push(stacked ? 0 : null);
//       }
//     }

//     points.push(data);
//   });

//   return [timestamps, ...points];
// };
