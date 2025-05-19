
export default class InfoIndex {
    key: string
    indexArr: any[]
    ref: number
    indexValue: number
    indexValueChang: number
    indexRatioChang: number
    indexTotalQty: number
    indexTotalValue: number
    qtyOddlot: number
    valueOddlot: number
    indexCode: string
    indexName: string
    increase: number
    equaCeil: number
    noChange: number
    decrease: number
    equaFloor: number
    statusName: string
    statusCode: string
    qtyBiglot: number
    valueBiglot: number
    lastSeq: number
    timeServer: string
    indexHighest: number
    indexLowest: number
    indexOpen: number
    indexClose: number
    indexColor: string
    t340: string
    t340_code: string
    t340_nm: string
    timeIndex: string
    arrMinutes: any[]
    timeI: string
    BUY_SELL_FLOW: { T: { rt: any[]; acl: any[] }; T1: { rt: any[]; acl: any[] }; T2: { rt: any[]; acl: any[] }; T3: { rt: any[]; acl: any[] }; T4: { rt: any[]; acl: any[] } }
    INTRADAY_1s: any[]
    INTRADAY_1m: any[]
    
    constructor() {
        this.key = ''
        this.indexArr = []
        this.ref = 0
        this.indexValue = 0 // t3
        this.indexValueChang = 0 // t5
        this.indexRatioChang = 0 // t6
        this.indexTotalQty = 0
        this.indexTotalValue = 0
        this.qtyOddlot = 0 // Khối lượng lô lẻ
        this.valueOddlot = 0 // Giá trị lô lẻ
        this.indexCode = '' // t2
        this.indexName = '' // t18
        this.increase = 0
        this.equaCeil = 0
        this.noChange = 0
        this.decrease = 0
        this.equaFloor = 0
        this.statusName = '' // t340 name
        this.statusCode = '' // t340
        // this.messageI = [];
        this.qtyBiglot = 0
        this.valueBiglot = 0
        this.lastSeq = 0 // Seq of last message
        this.timeServer = ''
        this.indexHighest = 0
        this.indexLowest = 0
        this.indexOpen = 0
        this.indexClose = 0
        this.indexColor = 'orange'

        this.t340 = ''
        this.t340_code = ''
        this.t340_nm = ''
        this.timeIndex = ''
        this.arrMinutes = [] // arr contains data into minutes
        this.timeI = ''
        //---------------------
        this['STATIC'] = new OthersData() // Data tĩnh chỉ lấy 1 lần
        this['1D'] = new ListTopicIndexIntraday() // Data realtime Update liên tục
        this['1W'] = new ListTopicIndexHistory() // Data lịch sử ...
        this['1M'] = new ListTopicIndexHistory()
        this['2M'] = new ListTopicIndexHistory()
        this['3M'] = new ListTopicIndexHistory()
        this['6M'] = new ListTopicIndexHistory()
        this['1Y'] = new ListTopicIndexHistory()
        this['3Y'] = new ListTopicIndexHistory()
        this['5Y'] = new ListTopicIndexHistory()

        this.BUY_SELL_FLOW = {
            T: {
                rt: [],
                acl: []
            },
            T1: {
                rt: [],
                acl: []
            },
            T2: {
                rt: [],
                acl: []
            },
            T3: {
                rt: [],
                acl: []
            },
            T4: {
                rt: [],
                acl: []
            },
        }

        this.INTRADAY_1s = [];
        this.INTRADAY_1m = [];
    }
}
class ListTopicIndexIntraday {
    INTRADAY_1s: any[]
    INTRADAY_5s: any[]
    INTRADAY_15s: any[]
    INTRADAY_30s: any[]
    INTRADAY_1m: any[]
    INTRADAY_5m: any[]
    INTRADAY_15m: any[]
    INTRADAY_30m: any[]
    INTRADAY_1h: any[]
    constructor() {
        this['MDDS|BI'] = [] // Realtime do sở trả về
        this.INTRADAY_1s = []
        this.INTRADAY_5s = []
        this.INTRADAY_15s = []
        this.INTRADAY_30s = []
        this.INTRADAY_1m = []
        this.INTRADAY_5m = []
        this.INTRADAY_15m = []
        this.INTRADAY_30m = []
        this.INTRADAY_1h = []
    }
}
class ListTopicIndexHistory {
    BY_DAY: any[]
    constructor() {
        this.BY_DAY = [] // Mỗi ngày 1 điểm dữ liệu
    }
}
class OthersData {
    AVG_LIQUIDITY_5DAY: any[]
    VIET_STOCK: any[]
    CAFE_F: any[]
    FIINPRO: any[]
    constructor() {
        this.AVG_LIQUIDITY_5DAY = []
        this.VIET_STOCK = []
        this.CAFE_F = []
        this.FIINPRO = []
    }
}
 