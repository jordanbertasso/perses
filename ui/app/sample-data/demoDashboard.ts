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

import { AnyVariableDefinition, DashboardResource } from '@perses-ui/core';

const demoDashboard: DashboardResource = {
  kind: 'Dashboard',
  metadata: {
    name: 'Node Stats',
    project: 'perses',
    created_at: '2021-11-09',
    updated_at: '2021-11-09',
  },
  spec: {
    datasource: { kind: 'Prometheus', name: 'PrometheusDemo', global: true },
    duration: '12h',
    variables: {
      job: {
        kind: 'PrometheusLabelValues',
        options: {
          label_name: 'job',
          match: ['node_uname_info'],
        },
        display: {
          label: 'Job',
        },
        selection: {
          default_value: 'node',
        },
      } as AnyVariableDefinition,
      instance: {
        kind: 'PrometheusLabelValues',
        options: {
          label_name: 'instance',
          match: ['node_uname_info{job="node"}'],
        },
        display: {
          label: 'Node',
        },
        selection: {
          default_value: ['demo.do.prometheus.io:9100'],
          all_value: '$__all',
        },
      } as AnyVariableDefinition,
      interval: {
        kind: 'Interval',
        options: {
          values: ['1m', '5m', '10m', '1h'],
          auto: {
            step_count: 50,
            min_interval: '1m',
          },
        },
        display: {
          label: 'Interval',
        },
        selection: {
          default_value: '1h',
        },
      } as AnyVariableDefinition,
    },
    panels: {
      statSm: {
        kind: 'StatChart',
        display: {
          name: 'Stat Sm',
        },
        options: {
          query: {
            kind: 'PrometheusGraphQuery',
            options: {
              query:
                '(((count(count(node_cpu_seconds_total{job="node",instance="$instance"}) by (cpu))) - avg(sum by (mode)(rate(node_cpu_seconds_total{mode="idle",job="node",instance="$instance"}[$interval])))) * 100) / count(count(node_cpu_seconds_total{job="node",instance="$instance"}) by (cpu))',
            },
          },
          calculation: 'Sum',
          unit: {
            kind: 'Decimal',
            decimal_places: 2,
            suffix: 'byte',
            // suffix: 'kilogram', // https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier
          },
          // sparkline: {},
          // thresholds: {
          //   default_color: '#EA4747', // red
          // },
        },
      },
      statRAM: {
        kind: 'StatChart',
        display: {
          name: 'RAM Used',
        },
        options: {
          query: {
            kind: 'PrometheusGraphQuery',
            options: {
              query:
                '100 - ((node_memory_MemAvailable_bytes{job="node",instance="$instance"} * 100) / node_memory_MemTotal_bytes{job="node",instance="$instance"})',
            },
          },
          calculation: 'LastNumber',
          unit: { kind: 'Percent' },
        },
      },
      statTotalRAM: {
        kind: 'StatChart',
        display: {
          name: 'RAM Total',
        },
        options: {
          query: {
            kind: 'PrometheusGraphQuery',
            options: {
              query: 'node_memory_MemTotal_bytes{job="node",instance="$instance"}',
            },
          },
          calculation: 'LastNumber',
          unit: {
            kind: 'Decimal',
            suffix: 'byte',
          },
        },
      },
      statLg: {
        kind: 'StatChart',
        display: {
          name: 'Stat Md',
        },
        options: {
          query: {
            kind: 'PrometheusGraphQuery',
            options: {
              query:
                '(((count(count(node_cpu_seconds_total{job="node",instance="$instance"}) by (cpu))) - avg(sum by (mode)(rate(node_cpu_seconds_total{mode="idle",job="node",instance="$instance"}[$interval])))) * 100) / count(count(node_cpu_seconds_total{job="node",instance="$instance"}) by (cpu))',
              // '((node_memory_SwapTotal_bytes{job="node",instance="$instance"} - node_memory_SwapFree_bytes{job="node",instance="$instance"}) / (node_memory_SwapTotal_bytes{job="node",instance="$instance"} )) * 100',
            },
          },
          calculation: 'Mean',
          unit: {
            kind: 'Decimal',
            decimal_places: 1,
            suffix: 'byte', // https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier
          },
          thresholds: {
            default_color: '#1473E6', // blue
          },
          sparkline: {},
        },
      },
      statCustom: {
        kind: 'StatChart',
        display: {
          name: 'StatChart',
        },
        options: {
          query: {
            kind: 'PrometheusGraphQuery',
            options: {
              query:
                '(((count(count(node_cpu_seconds_total{job="node",instance="$instance"}) by (cpu))) - avg(sum by (mode)(rate(node_cpu_seconds_total{mode="idle",job="node",instance="$instance"}[$interval])))) * 100) / count(count(node_cpu_seconds_total{job="node",instance="$instance"}) by (cpu))',
            },
          },
          calculation: 'Mean',
          unit: {
            kind: 'Percent',
            decimal_places: 2,
          },
          sparkline: {
            line_color: '#FFE3E3',
            line_width: 1.5,
            line_opacity: 0.6,
            area_color: '#FFBABA',
            area_opacity: 0.4,
          },
          thresholds: {
            default_color: '#EA4747',
            steps: [
              {
                value: 85,
              },
              {
                value: 95,
              },
            ],
          },
        },
      },
      statCustomDebug: {
        kind: 'StatChart',
        display: {
          name: 'StatChart Options',
        },
        options: {
          calculation: 'Mean',
          unit: {
            kind: 'Percent',
            decimal_places: 2,
          },
          sparkline: {
            line_color: '#FFE3E3',
            line_width: 1.5,
            line_opacity: 0.6,
            area_color: '#FFBABA',
            area_opacity: 0.4,
          },
          thresholds: {
            default_color: '#EA4747',
            steps: [
              {
                value: 85,
              },
              {
                value: 95,
              },
            ],
          },
          query: {
            kind: 'PrometheusGraphQuery',
            options: {
              query:
                '(((count(count(node_cpu_seconds_total{job="node",instance="$instance"}) by (cpu))) - avg(sum by (mode)(rate(node_cpu_seconds_total{mode="idle",job="node",instance="$instance"}[$interval])))) * 100) / count(count(node_cpu_seconds_total{job="node",instance="$instance"}) by (cpu))',
            },
          },
          debug: true,
        },
      },
      gaugeEx: {
        kind: 'GaugeChart',
        display: { name: 'GaugeChart' },
        options: {
          query: {
            kind: 'PrometheusGraphQuery',
            options: {
              query:
                '(((count(count(node_cpu_seconds_total{job="node",instance="$instance"}) by (cpu))) - avg(sum by (mode)(rate(node_cpu_seconds_total{mode="idle",job="node",instance="$instance"}[$interval])))) * 100) / count(count(node_cpu_seconds_total{job="node",instance="$instance"}) by (cpu))',
            },
          },
          calculation: 'LastNumber',
          unit: { kind: 'Percent' },
          thresholds: {
            // default_color: '#000', // optional
            steps: [
              {
                value: 85,
                // color: '#800080',
              },
              {
                value: 95,
                // color: '#0000FF',
              },
            ],
          },
        },
      },
      gaugeExDebug: {
        kind: 'GaugeChart',
        display: { name: 'GaugeChart Options' },
        options: {
          calculation: 'LastNumber',
          unit: { kind: 'Percent' },
          thresholds: {
            // default_color: '#000', // optional
            steps: [
              {
                value: 85,
                // color: '#800080',
              },
              {
                value: 95,
                // color: '#0000FF',
              },
            ],
          },
          query: {
            kind: 'PrometheusGraphQuery',
            options: {
              query:
                '(((count(count(node_cpu_seconds_total{job="node",instance="$instance"}) by (cpu))) - avg(sum by (mode)(rate(node_cpu_seconds_total{mode="idle",job="node",instance="$instance"}[$interval])))) * 100) / count(count(node_cpu_seconds_total{job="node",instance="$instance"}) by (cpu))',
            },
          },
          debug: true,
        },
      },
      gaugeCpuBusy: {
        kind: 'GaugeChart',
        display: { name: 'CPU Busy' },
        options: {
          query: {
            kind: 'PrometheusGraphQuery',
            options: {
              query:
                '(((count(count(node_cpu_seconds_total{job="node",instance="$instance"}) by (cpu))) - avg(sum by (mode)(rate(node_cpu_seconds_total{mode="idle",job="node",instance="$instance"}[$interval])))) * 100) / count(count(node_cpu_seconds_total{job="node",instance="$instance"}) by (cpu))',
            },
          },
          calculation: 'LastNumber',
          unit: { kind: 'Percent' },
          thresholds: {
            // default_color: '#000', // optional
            steps: [
              {
                value: 85,
                // color: '#800080', // optional, overrides defaultWarningColor
              },
              {
                value: 95,
                // color: '#0000FF', // optional, overrides defaultAlertColor
              },
            ],
          },
        },
      },
      gaugeSystemLoad: {
        kind: 'GaugeChart',
        display: { name: 'Sys Load (5m avg)' },
        options: {
          query: {
            kind: 'PrometheusGraphQuery',
            options: {
              query:
                'avg(node_load5{job="node",instance="$instance"}) /  count(count(node_cpu_seconds_total{job="node",instance="$instance"}) by (cpu)) * 100',
            },
          },
          calculation: 'LastNumber',
          unit: { kind: 'Percent' },
          thresholds: {
            steps: [
              {
                value: 85,
              },
              {
                value: 95,
              },
            ],
          },
        },
      },
      gaugeSystemLoadAlt: {
        kind: 'GaugeChart',
        display: { name: 'Sys Load (15m avg)' },
        options: {
          query: {
            kind: 'PrometheusGraphQuery',
            options: {
              query:
                'avg(node_load15{job="node",instance="$instance"}) /  count(count(node_cpu_seconds_total{job="node",instance="$instance"}) by (cpu)) * 100',
            },
          },
          calculation: 'LastNumber',
          unit: { kind: 'Percent' },
          thresholds: {
            steps: [
              {
                value: 85,
              },
              {
                value: 95,
              },
            ],
          },
        },
      },
      gaugeRam: {
        kind: 'GaugeChart',
        display: { name: 'RAM Used' },
        options: {
          query: {
            kind: 'PrometheusGraphQuery',
            options: {
              query:
                '100 - ((node_memory_MemAvailable_bytes{job="node",instance="$instance"} * 100) / node_memory_MemTotal_bytes{job="node",instance="$instance"})',
            },
          },
          calculation: 'LastNumber',
          unit: { kind: 'Percent' },
          thresholds: {
            steps: [
              {
                value: 80,
              },
              {
                value: 90,
              },
            ],
          },
        },
      },
      gaugeSwap: {
        kind: 'GaugeChart',
        display: { name: 'SWAP Used' },
        options: {
          query: {
            kind: 'PrometheusGraphQuery',
            options: {
              query:
                '((node_memory_SwapTotal_bytes{job="node",instance="$instance"} - node_memory_SwapFree_bytes{job="node",instance="$instance"}) / (node_memory_SwapTotal_bytes{job="node",instance="$instance"} )) * 100',
            },
          },
          calculation: 'LastNumber',
          unit: { kind: 'Percent' },
          thresholds: {
            steps: [
              {
                value: 10,
              },
              {
                value: 25,
              },
            ],
          },
        },
      },
      gaugeRoot: {
        kind: 'GaugeChart',
        display: { name: 'Root FS Used' },
        options: {
          query: {
            kind: 'PrometheusGraphQuery',
            options: {
              query:
                '100 - ((node_filesystem_avail_bytes{job="node",instance="$instance",mountpoint="/",fstype!="rootfs"} * 100) / node_filesystem_size_bytes{job="node",instance="$instance",mountpoint="/",fstype!="rootfs"})',
            },
          },
          calculation: 'LastNumber',
          unit: { kind: 'Percent' },
          thresholds: {
            steps: [
              {
                value: 80,
              },
              {
                value: 90,
              },
            ],
          },
        },
      },
      lineSeriesTest: {
        kind: 'LineChart',
        display: { name: '~130 Series' },
        options: {
          queries: [
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query: 'rate(caddy_http_response_duration_seconds_sum[$interval])',
                // query: 'histogram_quantile(0.9, rate(caddy_http_request_duration_seconds_bucket[$interval]))',
              },
            },
          ],
          unit: { kind: 'Bytes' },
        },
      },
      lineCustom: {
        kind: 'LineChart',
        display: { name: 'LineChart' },
        options: {
          unit: { kind: 'Decimal' },
          queries: [
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query:
                  'node_memory_MemTotal_bytes{job="node",instance="$instance"} - node_memory_MemFree_bytes{job="node",instance="$instance"} - node_memory_Buffers_bytes{job="node",instance="$instance"} - node_memory_Cached_bytes{job="node",instance="$instance"}',
              },
            },
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query: 'node_memory_Buffers_bytes{job="node",instance="$instance"}',
              },
            },
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query: 'node_memory_Cached_bytes{job="node",instance="$instance"}',
              },
            },
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query: 'node_memory_MemFree_bytes{job="node",instance="$instance"}',
              },
            },
          ],
        },
      },
      lineCustomDebug: {
        kind: 'LineChart',
        display: { name: 'LineChart Options' },
        options: {
          unit: { kind: 'Decimal' },
          queries: [
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query:
                  'node_memory_MemTotal_bytes{job="node",instance="$instance"} - node_memory_MemFree_bytes{job="node",instance="$instance"} - node_memory_Buffers_bytes{job="node",instance="$instance"} - node_memory_Cached_bytes{job="node",instance="$instance"}',
              },
            },
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query: 'node_memory_Buffers_bytes{job="node",instance="$instance"}',
              },
            },
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query: 'node_memory_Cached_bytes{job="node",instance="$instance"}',
              },
            },
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query: 'node_memory_MemFree_bytes{job="node",instance="$instance"}',
              },
            },
          ],
          debug: true,
        },
      },
      lineMultiQueries: {
        kind: 'LineChart',
        display: { name: 'Multi Queries' },
        options: {
          queries: [
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query:
                  'node_memory_MemTotal_bytes{job="node",instance="$instance"} - node_memory_MemFree_bytes{job="node",instance="$instance"} - node_memory_Buffers_bytes{job="node",instance="$instance"} - node_memory_Cached_bytes{job="node",instance="$instance"}',
              },
            },
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query: 'node_memory_Buffers_bytes{job="node",instance="$instance"}',
              },
            },
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query: 'node_memory_Cached_bytes{job="node",instance="$instance"}',
              },
            },
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query: 'node_memory_MemFree_bytes{job="node",instance="$instance"}',
              },
            },
          ],
          unit: { kind: 'Bytes' },
        },
      },
    },
    layouts: [
      {
        kind: 'Grid',
        display: {
          title: 'Stat Charts',
          collapse: {
            open: true,
          },
        },
        items: [
          {
            x: 0,
            y: 0,
            width: 2,
            height: 2,
            content: { $ref: '#/panels/statSm' },
          },
          {
            x: 0,
            y: 2,
            width: 2,
            height: 2,
            content: { $ref: '#/panels/statRAM' },
          },
          {
            x: 0,
            y: 4,
            width: 2,
            height: 2,
            content: { $ref: '#/panels/statTotalRAM' },
          },
          {
            x: 2,
            y: 0,
            width: 10,
            height: 6,
            content: { $ref: '#/panels/statLg' },
          },
          {
            x: 12,
            y: 0,
            width: 4,
            height: 6,
            content: { $ref: '#/panels/statCustom' },
          },
          {
            x: 16,
            y: 0,
            width: 8,
            height: 6,
            content: { $ref: '#/panels/statCustomDebug' },
          },
        ],
      },
      {
        kind: 'Grid',
        display: {
          title: 'Gauge Charts',
          collapse: {
            open: true,
          },
        },
        items: [
          {
            x: 0,
            y: 0,
            width: 3,
            height: 4,
            content: { $ref: '#/panels/gaugeCpuBusy' },
          },
          {
            x: 3,
            y: 0,
            width: 3,
            height: 4,
            content: { $ref: '#/panels/gaugeSystemLoad' },
          },
          {
            x: 0,
            y: 4,
            width: 3,
            height: 4,
            content: { $ref: '#/panels/gaugeSystemLoadAlt' },
          },
          {
            x: 3,
            y: 4,
            width: 3,
            height: 4,
            content: { $ref: '#/panels/gaugeRam' },
          },
          {
            x: 6,
            y: 0,
            width: 6,
            height: 8,
            content: { $ref: '#/panels/gaugeEx' },
          },
          {
            x: 12,
            y: 0,
            width: 12,
            height: 8,
            content: { $ref: '#/panels/gaugeExDebug' },
          },
        ],
      },
      {
        kind: 'Grid',
        display: {
          title: 'Line Charts',
          collapse: {
            open: true,
          },
        },
        items: [
          {
            x: 0,
            y: 0,
            width: 16,
            height: 6,
            // content: { $ref: '#/panels/lineSeriesTest' },
            content: { $ref: '#/panels/lineCustom' },
          },
          {
            x: 16,
            y: 0,
            width: 8,
            height: 6,
            // content: { $ref: '#/panels/lineMultiQueries' },
            content: { $ref: '#/panels/lineCustomDebug' },
          },
        ],
      },
      {
        kind: 'Grid',
        display: {
          title: 'Misc',
          collapse: {
            open: true,
          },
        },
        items: [
          // {
          //   x: 0,
          //   y: 0,
          //   width: 12,
          //   height: 6,
          //   content: { $ref: '#/panels/lineCustom' },
          // },
          // {
          //   x: 12,
          //   y: 0,
          //   width: 12,
          //   height: 6,
          //   content: { $ref: '#/panels/lineCustom' },
          // },
        ],
      },
    ],
  },
};

export default demoDashboard;
