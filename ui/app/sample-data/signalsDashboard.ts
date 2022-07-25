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

import { AnyVariableDefinition, DashboardResource } from '@perses-dev/core';

const signalsDashboard: DashboardResource = {
  kind: 'Dashboard',
  metadata: {
    name: 'Signals: Chronoprom instance is down',
    project: 'perses',
    created_at: '2021-11-09',
    updated_at: '2021-11-09',
    version: 0,
  },
  spec: {
    datasource: { kind: 'Prometheus', name: 'PrometheusDemo', global: true },
    duration: '6h',
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
    },
    panels: {
      monitorFirst: {
        kind: 'LineChart',
        display: {
          name: 'chronosphere_k8s_cluster="dev", chronosphere_k8s_namespace"dev-03"',
          description: 'Description text',
        },
        options: {
          queries: [
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query: 'node_load1{instance="$instance",job="node"}',
              },
            },
          ],
          show_legend: false,
          unit: {
            kind: 'Decimal',
            decimal_places: 2,
          },
          thresholds: {
            steps: [
              {
                value: 0.6,
                name: 'Alert: Warning condition example',
              },
              {
                value: 0.8,
                name: 'Alert: Critical condition example',
              },
            ],
          },
        },
      },
      monitorSecond: {
        kind: 'LineChart',
        display: {
          name: 'chronosphere_k8s_cluster="rc", chronosphere_k8s_namespace"rc-9001"',
          description: 'Description text',
        },
        options: {
          queries: [
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query: 'node_load15{instance="$instance",job="node"}',
              },
            },
          ],
          show_legend: false,
          unit: {
            kind: 'PercentDecimal',
            decimal_places: 1,
          },
          thresholds: {
            steps: [
              {
                value: 0.6,
                name: 'Alert: Warning condition example',
              },
              {
                value: 0.7,
                name: 'Alert: Critical condition example',
              },
            ],
          },
        },
      },
      monitorThird: {
        kind: 'LineChart',
        display: {
          name: 'chronosphere_k8s_cluster="prod-test", chronosphere_k8s_namespace"prod-test-01"',
          description: 'Description text',
        },
        options: {
          queries: [
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query: 'node_load5{instance="$instance",job="node"}',
              },
            },
          ],
          show_legend: false,
          unit: {
            kind: 'PercentDecimal',
            decimal_places: 1,
          },
          thresholds: {
            steps: [
              {
                value: 0.5,
                name: 'Alert: Warning condition example',
              },
              {
                value: 0.65,
                name: 'Alert: Critical condition example',
              },
            ],
          },
        },
      },
      monitorFourth: {
        kind: 'LineChart',
        display: {
          name: 'chronosphere_k8s_cluster="rc", chronosphere_k8s_namespace"rc-uat-e2e"',
          description: 'Description text',
        },
        options: {
          queries: [
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query: 'node_load1{instance="$instance",job="node"}',
              },
            },
          ],
          show_legend: false,
          unit: {
            kind: 'PercentDecimal',
            decimal_places: 1,
          },
          thresholds: {
            steps: [
              {
                value: 0.45,
                name: 'Alert: Warning condition example',
              },
              {
                value: 0.75,
                name: 'Alert: Critical condition example',
              },
            ],
          },
        },
      },
      monitorFifth: {
        kind: 'LineChart',
        display: { name: 'Chronoprom number of rules has signifcantly dropped', description: 'Description text' },
        options: {
          queries: [
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query: 'node_load15{instance="$instance",job="node"}',
              },
            },
            // {
            //   kind: 'PrometheusGraphQuery',
            //   options: {
            //     query: 'node_load1{instance="$instance",job="node"}',
            //   },
            // },
          ],
          show_legend: false,
          unit: {
            kind: 'Decimal',
            decimal_places: 2,
          },
          thresholds: {
            steps: [
              {
                value: 0.65,
                name: 'Alert: Warning condition example',
              },
              {
                value: 0.7,
                name: 'Alert: Critical condition example',
              },
            ],
          },
        },
      },
      monitorSixth: {
        kind: 'LineChart',
        display: {
          name: 'High rate of non-400 chronoprom to m3coordinator error codes',
          description: 'Description text',
        },
        options: {
          queries: [
            {
              kind: 'PrometheusGraphQuery',
              options: {
                query: 'node_load1{instance="$instance",job="node"}',
              },
            },
          ],
          show_legend: false,
          unit: {
            kind: 'Decimal',
            decimal_places: 2,
          },
          thresholds: {
            steps: [
              {
                value: 0.5,
                name: 'Alert: Warning condition example',
              },
              {
                value: 0.6,
                name: 'Alert: Critical condition example',
              },
            ],
          },
        },
      },
    },
    layouts: [
      {
        kind: 'Grid',
        spec: {
          display: {
            title: '',
            // collapse: {
            //   open: true,
            // },
          },
          items: [
            {
              x: 0,
              y: 0,
              width: 12,
              height: 6,
              content: { $ref: '#/spec/panels/monitorFirst' },
            },
            {
              x: 12,
              y: 0,
              width: 12,
              height: 6,
              content: { $ref: '#/spec/panels/monitorSecond' },
            },
            {
              x: 0,
              y: 6,
              width: 12,
              height: 6,
              content: { $ref: '#/spec/panels/monitorThird' },
            },
            {
              x: 12,
              y: 6,
              width: 12,
              height: 6,
              content: { $ref: '#/spec/panels/monitorFourth' },
            },
            // {
            //   x: 0,
            //   y: 12,
            //   width: 12,
            //   height: 6,
            //   content: { $ref: '#/spec/panels/monitorFifth' },
            // },
            // {
            //   x: 12,
            //   y: 12,
            //   width: 12,
            //   height: 6,
            //   content: { $ref: '#/spec/panels/monitorSixth' },
            // },
          ],
        },
      },
    ],
  },
};

export default signalsDashboard;
