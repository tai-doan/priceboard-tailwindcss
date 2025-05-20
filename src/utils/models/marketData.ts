class MarketData {
  IDX?: IDX[];
  IGS?: string[];
  STKLST?: STKLST[];

  constructor(
    IDX?: IDX[],
    IGS?: string[],
    STKLST?: STKLST[],
  ) {
    this.IDX = IDX;
    this.IGS = IGS;
    this.STKLST = STKLST;
  }
}

const theInstance = new MarketData();
// @ts-expect-error
window.marketData = theInstance
export default theInstance

export interface KRXMDDSIDX {
  t30001: string;
  t30569: string;
  IDX: IDX[];
}

export interface IDX {
  t30167: string;
  t30632: string;
  t30633: string;
  t30606: number;
}
export interface STKLST {
  version: string;
  exchange: string;
  lang: string;
  STOCK: Stock[];
}

export interface Stock {
  S: string;
  N: string;
  T: string;
}
