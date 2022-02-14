// TODO (sjcobb): perses sparkline snake_case -> StatChart camelCase ECharts LineSeriesOption conversion

//   // https://stackoverflow.com/questions/40710628/how-to-convert-snake-case-to-camelcase-in-my-app/40710684#40710684
//   console.log('(perses format) sparkline: ', sparkline);
//   const sparklineOption = mapKeys(sparkline, rearg(camelCase, 1));
//   console.log('(converted) sparklineOption: ', sparklineOption);

// NEED STATIC MAPPING LIKE THIS:

// label_line_linestyle_opts: Union[LineStyleOpts, dict, None] = None,
// "labelLine": {
//     "show": is_show_label_line,
//     "length": label_line_width,
//     "lineStyle": label_line_linestyle_opts,
// },

// // //

// // // https://echarts.apache.org/en/option.html#series-line
// // const mockSparklineOption: LineSeriesOption = {
// //   name: 'line series 1',
// //   lineStyle: {
// //     color: '#000',
// //     width: 2,
// //   },
// //   areaStyle: {
// //     color: '#FF0000', // red
// //     opacity: 0.5,
// //   },
// // };

// // // NOTES // // //

// https://stackoverflow.com/questions/40710628/how-to-convert-snake-case-to-camelcase-in-my-app/40710684#40710684

// https://pyecharts.org/#/en-us/charts_base?id=line
// line.add("商家A", attr, v1, is_fill=True, line_opacity=0.2, area_opacity=0.4, symbol=None)
// line.add(
//   "商家B",
//   attr,
//   v2,
//   is_fill=True,
//   area_color='#000',
//   area_opacity=0.3,
//   is_smooth=True)

// https://github.com/pyecharts/pyecharts/blob/master/pyecharts/options/series_options.py#L29

// pyecharts Union???
// ItemStyle = Union[opts.ItemStyleOpts, dict, None]
// LineStyle = Union[opts.LineStyleOpts, dict, None]
// https://github.com/pyecharts/pyecharts/blob/master/pyecharts/types.py#L47
// https://docs.python.org/3/library/types.html#types.UnionType

// label_line_linestyle_opts: Union[LineStyleOpts, dict, None] = None,
// "labelLine": {
//     "show": is_show_label_line,
//     "length": label_line_width,
//     "lineStyle": label_line_linestyle_opts,
// },

// class LineStyleOpts(BasicOpts):
//   def __init__(
//       self,
//       is_show: bool = True,
//       width: Numeric = 1,
//       opacity: Numeric = 1,
//       curve: Numeric = 0,
//       type_: str = "solid",
//       color: Union[str, Sequence, None] = None,
//   ):
//       self.opts: dict = {
//           "show": is_show,
//           "width": width,
//           "opacity": opacity,
//           "curveness": curve,
//           "type": type_,
//           "color": color,
//       }

