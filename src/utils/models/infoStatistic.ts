
export default class InfoStatistic {
    key: string
    // Thứ tự ưu tiên:
    // 1. Sàn/ key
    // 2. Thời gian
    // 3. Topic/ Loại data
    constructor() {
        this.key = ''
        this['STATIC'] = new ListTopic()  // Data tĩnh chỉ lấy 1 lần
        this['1D'] = new ListTopic() // Data realtime Update liên tục
        this['1W'] = new ListTopic() // Data lịch sử ...
        this['1M'] = new ListTopic()
        this['2M'] = new ListTopic()
        this['3M'] = new ListTopic()
        this['6M'] = new ListTopic()
        this['1Y'] = new ListTopic()
        this['3Y'] = new ListTopic()
        this['5Y'] = new ListTopic()
    }
}

class ListTopic {
    TOP_VAL_UP: any[]
    TOP_QTY_UP: any[]
    FRG_VAL_UP: any[]
    TOP_PRI_UP: any[]
    TOP_PRI_DOWN: any[]
    FRG_BUY_UP: any[]
    FRG_SELL_UP: any[]
    MARKET_CAP: any[]

    constructor() {
        this.TOP_VAL_UP = []
        this.TOP_QTY_UP = []
        this.FRG_VAL_UP = []
        this.TOP_PRI_UP = []
        this.TOP_PRI_DOWN = []
        this.FRG_BUY_UP = []
        this.FRG_SELL_UP = []
        this.MARKET_CAP = []
    }
}