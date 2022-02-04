import React, { createContext, useContext } from 'react';
// import { GetSeriesDrilldown, GetSeriesDrilldownContext } from '../generated/graphql';

// export type SeriesDrilldown = GetSeriesDrilldown['SeriesDrilldown'];
// export type SeriesDrilldown = unknown;
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type SeriesDrilldown = any;

export const DEFAULT_DRILLDOWN_DATA: SeriesDrilldown = {
  seriesData: [
    [1637293410, '0.49933333333333396'],
    [1637293440, '0.5007501250208362'],
    [1637293470, '0.4989002199560097'],
    [1637293500, '0.49943321997732937'],
    [1637293530, '0.4999000199960008'],
    [1637293560, '0.4996833227774263'],
    [1637293590, '0.5003166561114626'],
  ],
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
