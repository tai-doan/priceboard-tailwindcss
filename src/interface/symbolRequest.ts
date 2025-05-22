export interface IGetSymbolsResponse {
  data: {
    symbols: ISymbol[];
  }
}

export interface ISymbol {
  symbolType: SymbolType;
  data:       ISymbolData;
}

export interface ISymbolData {
  code:                  string;
  price:                 number;
  name?:                 string;
  nameEn?:               string;
  marketStatus:          MarketStatus;
  area?:                 Area;
  dayChangePercent:      number;
  referPrice:            number;
  openPrice:             number | null;
  highPrice:             number | null;
  lowPrice:              number | null;
  highWeek52Price?:      number;
  lowWeek52Price?:       number;
  year1ChangePercent?:   number;
  dayChange:             number;
  index?:                number;
  time:                  string;
  desc?:                 string;
  sectors?:              any[];
  secType?:              string;
  symbolName?:           null;
  symbolNameEn?:         null;
  dayVolume?:            number;
  dayValue?:             number;
  weekVolume?:           number;
  weekValue?:            number;
  exchange?:             string;
  weekChange?:           number;
  weekChangePercent?:    number;
  monthChange?:          number;
  monthChangePercent?:   number;
  avgDay5Value?:         number;
  dayVolPercent?:        number;
  weekVolPercent?:       number;
  monthVolPercent?:      number;
  day7ChangePercent?:    number;
  month1ChangePercent?:  number;
  month3ChangePercent?:  number;
  year5ChangePercent?:   number;
  allTimeChangePercent?: number;
  dayNetRoomVal?:        number;
  highWeekPrice?:        number;
  lowWeekPrice?:         number;
  highMonthPrice?:       number;
  lowMonthPrice?:        number;
  highAllPrice?:         number;
  lowAllPrice?:          number;
  ceiling?:              number;
  floor?:                number;
  avgPrice?:             number;
  marketCap?:            number | null;
  listedShare?:          string;
  tradingDate?:          string;
  indexes?:              any[];
  foreignBuyVol?:        number;
  foreignSellVol?:       number;
  foreignBuyVal?:        number;
  foreignSellVal?:       number;
  foreignTotalVal?:      number;
  foreignTotalVol?:      number;
  predictionDayValue?:   number;
  advanceVal?:           number;
  noChangeVal?:          number;
  declineVal?:           number;
  year5Change?:          number;
  advances?:             number;
  noChanges?:            number;
  declines?:             number;
  stocks?:               string[];
}

export enum Area {
  America = "america",
  Asia = "asia",
  Europe = "europe",
  Global = "global",
}

export enum MarketStatus {
  Close = "close",
  Open = "open",
}

export enum SymbolType {
  Commodity = "commodity",
  Crypto = "crypto",
  Index = "index",
  IndexDerivative = "indexDerivative",
  Indice = "indice",
}
