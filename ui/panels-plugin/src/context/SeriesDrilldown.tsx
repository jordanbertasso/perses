import React, { createContext, useContext } from 'react';
// import { GetSeriesDrilldown, GetSeriesDrilldownContext } from '../generated/graphql';

// export type SeriesDrilldown = GetSeriesDrilldown['SeriesDrilldown'];
export type SeriesDrilldown = unknown;

export const DEFAULT_DRILLDOWN_DATA: SeriesDrilldown = {
  series: [1, 2, 3],
};

export const SeriesDrilldownContext = createContext<SeriesDrilldown>(DEFAULT_DRILLDOWN_DATA);

export function SeriesDrilldownContextProvider(props: { children: React.ReactNode }) {
  return (
    <SeriesDrilldownContext.Provider value={DEFAULT_DRILLDOWN_DATA}>{props.children}</SeriesDrilldownContext.Provider>
  );
}

export function useSeriesDrilldown() {
  const seriesDrilldown = useContext(SeriesDrilldownContext);
  return seriesDrilldown;
}

export function areSeriesLoading(seriesDrilldown: SeriesDrilldown) {
  // returns default values until data has been loaded (potentially can remove)
  return seriesDrilldown === DEFAULT_DRILLDOWN_DATA;
}
