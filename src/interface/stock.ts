
export interface IStockSI {
    t30001: string;
    t20004: string;
    t55: string;
    t30624: string;
    t20005: string;
    t20008: string;
    t336: string;
    t20014: number;
    t20015: number;
    t20016: number;
    t20026: number;
    t30541: number;
    t30575: string;
    t30576: string;
    t30577: string;
    t30578: string;
    t387: number;
    t381: number;
    t30521: number;
    t30522: number;
    t30523: number;
    t30524: number;
    t30562: number;
    t30563: number;
    t30561: number;
    t270: number;
    t271: number;
    t30557: number;
    t30558: number;
    t40001: number;
}

export interface IStockST {
    t30001: string;
    t20004: string;
    t207: string;
    t55: string;
    t30630: string;
    t20013: number;
    t1149: number;
    t1148: number;
    t30604: string;
    t201: string;
    t1194: string;
    t200: string;
    t541: string;
    t106: string;
    t225: string;
    t231: number;
    t223: number;
    t15: string;
    t20020: number;
    t202: number;
    t965: string;
    t30631: number;
    t1193: string;
    t236: number;
    t20027: string;
    t140: number;
    t30642: string;
    t30511: string;
    t30512: string;
    t30301: string;
    t30614: string;
    t20018: string;
    t30625: number;
    t30635: string;
    t30636: string;
    t30637: string;
    t30647: string;
    t40231: string;
}

export interface IStockMT {
    t30001: string;
    t20004: string;
    t55:    string;
    t30624: string;
    t60:    string;
    FRG:    { [key: string]: number };
    DMT:    { [key: string]: number };
}

export interface IStockMD {
    t30001: string;
    t20004: string;
    t55:    string;
    t30624: string;
    t270:   number;
    t271:   number;
    t30270: number;
    t346:   number;
    t30271: number;
    t4000:  string;
    t60:    string;
}

export interface IStockTP {
    t30001: string;
    t20004: string;
    t55: string;
    t30624: string;
    TPBID: TPBID_OFFER[];
    TPOFFER: TPBID_OFFER[];
}

export interface TPBID_OFFER {
    t83: number;
    t269: string;
    t290: number;
    t270: number;
    t271: number;
    t346: number;
    t30271: number;
}

export interface TPEntry {
    t83: number;
    t269: string;
    t290: number;
    t270: number;
    t271: number;
    t346: number;
    t30271: number;
}

export interface MarketTPData {
    t30001: string;
    t20004: string;
    t55: string;
    t30624: string;
    TPBID: TPEntry[];
    TPOFFER: TPEntry[];
}

export class MarketTPDataParser {
    private data: MarketTPData;

    constructor(input: Partial<MarketTPData>) {
        this.data = {
            t30001: input.t30001 || "",
            t20004: input.t20004 || "",
            t55: input.t55 || "",
            t30624: input.t30624 || "",
            TPBID: (input.TPBID || []).map(this.parseEntry),
            TPOFFER: (input.TPOFFER || []).map(this.parseEntry),
        };
    }

    private parseEntry(entry: Partial<TPEntry>): TPEntry {
        return {
            t83: entry.t83 ?? 0,
            t269: entry.t269 ?? "",
            t290: entry.t290 ?? 0,
            t270: entry.t270 ?? 0,
            t271: entry.t271 ?? 0,
            t346: entry.t346 ?? 0,
            t30271: entry.t30271 ?? 0,
        };
    }

    public getData(): MarketTPData {
        return this.data;
    }
}

export type StockData = IStockSI & IStockST & IStockTP & IStockMT & IStockMD;