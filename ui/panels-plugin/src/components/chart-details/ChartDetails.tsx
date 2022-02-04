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

import { AnyGraphQueryDefinition, GraphSeries } from '@perses-ui/core';
import * as echarts from 'echarts/core';
import type { EChartsOption } from 'echarts';
import { GaugeChart as EChartsGaugeChart } from 'echarts/charts';
import { GridComponent, DatasetComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { useMemo, useState, useLayoutEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { CalculationType } from '../../model/calculations';

echarts.use([EChartsGaugeChart, GridComponent, DatasetComponent, TitleComponent, TooltipComponent, CanvasRenderer]);

// export interface ChartDetailsProps {
//   query: AnyGraphQueryDefinition;
//   width: number;
//   height: number;
//   calculation: CalculationType;
//   unit: UnitOptions;
//   thresholds?: ThresholdOptions;
// }

export interface ChartDetailsData {
  calculatedValue: number | null | undefined;
  seriesData: GraphSeries | null | undefined;
  name?: string;
  showName?: boolean;
}

interface ChartDetailsProps {
  width: number;
  height: number;
  query: AnyGraphQueryDefinition;
  calculation: CalculationType;
  // data: ChartDetailsData;
  // unit: UnitOptions;
  // thresholds?: ThresholdOptions;
  // showSparkline?: boolean;
}

// const noDataOption = {
//   title: {
//     show: true,
//     textStyle: {
//       color: 'grey',
//       fontSize: 20,
//     },
//     text: 'No data',
//     left: 'center',
//     top: 'center',
//   },
//   xAxis: {
//     show: false,
//   },
//   yAxis: {
//     show: false,
//   },
//   series: [],
// };

function ChartDetails(props: ChartDetailsProps) {
  console.log('ChartDetails -> props: ', props);
  // const { query, width, height } = props;
  const { width, height } = props;
  // const { query, width, height, calculation, unit } = props;
  // const thresholds = props.thresholds ?? defaultThresholdInput;
  // const { data } = useGraphQuery(query);

  // const seriesDrilldown = useSeriesDrilldown();
  // console.log('seriesDrilldown: ', seriesDrilldown);

  // // const { seriesData } = seriesDrilldown.seriesData;
  // // console.log('seriesData: ', seriesDrilldown);

  const option: EChartsOption = useMemo(() => {
    // TODO (sjcobb): add loading spinner, share noDataOption with other charts
    // if (data === undefined) return {};

    const seriesData = [
      [1637293410, '0.49933333333333396'],
      [1637293440, '0.5007501250208362'],
      [1637293470, '0.4989002199560097'],
      [1637293500, '0.49943321997732937'],
      [1637293530, '0.4999000199960008'],
      [1637293560, '0.4996833227774263'],
      [1637293590, '0.5003166561114626'],
    ];

    // const series = Array.from(data.series)[0];
    // if (series === undefined) return noDataOption;

    // const calculate = CalculationsMap[calculation];
    // const calculatedValue = calculate(Array.from(series.values)) ?? 0;

    // const axisLineColors = convertThresholds(thresholds);

    return {
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      // toolbox: {
      //   feature: {
      //     dataZoom: {
      //       yAxisIndex: 'none',
      //     },
      //     restore: {},
      //     saveAsImage: {},
      //   }
      // },
      xAxis: {
        type: 'time',
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
      },
      // dataZoom: [
      //   {
      //     type: 'inside',
      //     start: 0,
      //     end: 20,
      //   },
      //   {
      //     start: 0,
      //     end: 20,
      //   },
      // ],
      series: [
        {
          name: '',
          type: 'line',
          // smooth: true,
          // symbol: 'none',
          // areaStyle: {},
          data: seriesData,
        },
      ],
    };
  }, []);
  // }, [data, seriesData]);
  // }, [data, calculation, thresholds, seriesData]);

  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [chart, setChart] = useState<echarts.ECharts | undefined>(undefined);

  // Create a chart instance in the container
  useLayoutEffect(() => {
    if (containerRef === null) return;

    // TODO (sjcobb): add echarts wrapper, common way to init echarts
    const chart = echarts.init(containerRef);
    setChart(chart);

    return () => {
      chart.dispose();
    };
  }, [containerRef]);

  // Sync options with chart instance
  useLayoutEffect(() => {
    if (chart === undefined) return;

    chart.setOption(option);
    console.log('option: ', option);
  }, [chart, option]);

  // Resize the chart to match as width/height changes
  const prevSize = useRef({ width, height });
  useLayoutEffect(() => {
    // No need to resize initially
    if (prevSize.current.width === width && prevSize.current.height === height) {
      return;
    }

    // Can't resize if no chart yet
    if (chart === undefined) return;

    chart.resize({ width, height });
    prevSize.current = { width, height };
  }, [chart, width, height]);

  // const formattedQuery = query.options.query;

  // const chartDetailsActive = true ?? null;
  // if (chartDetailsActive) {
  //   return (
  //     <Box
  //       sx={{
  //         display: 'inline-block',
  //         width: width,
  //         // height: 150,
  //         padding: '0 10px 10px 10px',
  //         background: '#D3D3D3', // ltgray
  //       }}
  //     >
  //       <Typography variant="h5" sx={{ fontWeight: 700 }}>
  //         Chart Details
  //       </Typography>
  //       <Typography variant="body2">Query: {formattedQuery}</Typography>
  //     </Box>
  //   );
  // }

  // return <Box ref={setContainerRef} sx={{ width, height }} />;
  return (
    <>
      <Box
        sx={{
          // display: 'inline-block',
          display: 'none',
          width: width,
          // height: 150,
          padding: '0 10px 10px 10px',
          background: '#D3D3D3', // ltgray
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Chart Details
        </Typography>
        {/* <Typography variant="body2">Query: {formattedQuery}</Typography> */}
      </Box>
      <Box ref={setContainerRef} sx={{ width, height }} />
    </>
  );
}

export default ChartDetails;
