
export default class InfoStock {
    t55: string
    U10: any
    U9: any
    U34: any
    t31: number
    t31_incr: any
    t31_incr_per: any
    t32: number
    t106: string
    t134: number
    t134_sub_t391: number
    t135: number
    t135_sub_t391: number
    t137: number
    t139: number
    ref: number
    t260: number
    t260_color: string
    t266: number
    t332: number
    t332_color: string
    t333: number
    t333_color: string
    t336: string
    t340: string
    t340_nm: string
    t340_code: string
    t387: number
    t391: number
    t392: number
    t397: number
    t398: number
    t631: number
    t2661: number
    t3301: number
    t3871: number
    t3971: number
    t3981: number
    seq: number
    U6: string
    U7: string
    U8: string
    t555: number
    t556_1: number
    t132_1: number
    t1321_1: number
    t133_1: number
    t1331_1: number
    t556_2: number
    t132_2: number
    t1321_2: number
    t133_2: number
    t1331_2: number
    t556_3: number
    t132_3: number
    t1321_3: number
    t133_3: number
    t1331_3: number
    t556_4: number
    t132_4: number
    t1321_4: number
    t133_4: number
    t1331_4: number
    t556_5: number
    t132_5: number
    t1321_5: number
    t133_5: number
    t1331_5: number
    t556_6: number
    t132_6: number
    t1321_6: number
    t133_6: number
    t1331_6: number
    t556_7: number
    t132_7: number
    t1321_7: number
    t133_7: number
    t1331_7: number
    t556_8: number
    t132_8: number
    t1321_8: number
    t133_8: number
    t1331_8: number
    t556_9: number
    t132_9: number
    t1321_9: number
    t133_9: number
    t1331_9: number
    t556_10: number
    t132_10: number
    t1321_10: number
    t133_10: number
    t1331_10: number
    TP: any[]
    EP: any[]
    U17: number
    U18: number
    U24: string
    U24_price: number
    U24_price_color: number
    basis: number
    U22: number
    U23: string
    t109: number
    U20: string
    U21: string
    U19: string
    U29: number
    U30: number
    U31: number
    timeServer: string
    lastSeq: number
    timeStock: string
    arrMinutes: any[]
    U33: number
    industries: string
    percenOfvol: number
    pb: number
    pe: number
    bvps: number
    eps: number
    roe: number
    roa: number
    BUY_SELL_FLOW: { T: { rt: any[]; acl: any[] }; T1: { rt: any[]; acl: any[] }; T2: { rt: any[]; acl: any[] }; T3: { rt: any[]; acl: any[] }; T4: { rt: any[]; acl: any[] } }
    INTRADAY_1s: any[]
    INTRADAY_1m: any[]
    PO: any[]
    EP_ODDLOT: any[]

    ceil_bond = 0 //t432
    floor_bond = 0 //t433
    ref_bond = 0 //t260
    total_qty_bid_bond = 0 //t3830
    total_value_bid_bond = 0 //t3832
    highest_price_bid_bond = 0 //t3811
    highest_qty_bid_bond = 0 //t381
    lowest_price_match_bond = 0 //t3961
    total_qty_lowest_price_match_bond = 0 //t396
    price_match_bond = 0 //t3931
    qty_match_bond = 0 //t393
    highest_price_match_bond = 0 //t3951
    total_qty_highest_price_match_bond = 0 //t395
    total_qty_ask_bond = 0 //t3831
    total_value_ask_bond = 0 //t3833
    lowest_price_ask_bond = 0 //t3821
    lowest_qty_ask_bond = 0 //t382
    total_value_bond = 0 //t3941
    total_qty_bond = 0 //t394
    remain_qty_foregin = 0 //t3301
    symbol_issuer = '' //t106
    open_price_bond = 0 //t137
    close_price_bond = 0 //t139
    date_trading_bond = '' //t388
    listing_volume_bond = 0 //t109
    due_date_bond = '' //t541
    bond_term = '' //t900
    remaining_term_bond = '' //t902
    type_interest_payment_bond = '' //t903
    nominal_interest_rate_bond = '' //t223
    interest_period_bond = '' //t904
    type_interest_rate_bond = '' //t907
    payment_method_bond = '' //t908
    features_bond = '' // t909
    code_isin_bond = '' //t910
    bond_status = '' //t326
    denominations_bond = 0 //t334
    release_date_bond = '' //t225
    bond_term_unit = '' //t901
    interest_payment_term_unit_bond = '' //t905
    
    constructor() {
        // t15 = ''; //-- stock id
        // t17 = 0; //-- dateNo
        this.t31 = 0 // -- MatchPrice
        this.t31_incr = null // -- Giá trị tăng giảm
        this.t31_incr_per = null // -- tỷ lệ tăng giảm
        this.t32 = 0 // -- MatchQty
        // t33 = ''; //-- ActionTyle;//Loai khop A: Khop chinh; B Tam Khop
        // t52 = ''; //-- Time
        this.t55 = '' // -- stock code
        this.t106 = '' //-- Issuer Tổ chức phát hành (Chứng quyền)
        // t107 = ''; //-- SecurityDesc
        // t109 = 0; //-- TotalListingQtty
        // t132 = 0; //-- BestBidPrice
        // t133 = 0; //-- BestOfferPrice
        this.t134 = 0 //-- TotalBidQtty -- Tổng KL lệnh đã đặt mua tại thời điểm hiện tại
        this.t134_sub_t391 = 0 //-- Tổng KL lệnh mua đang trên sàn (Tổng dư mua)
        this.t135 = 0 //-- TotalOfferQtty -- Tổng KL lệnh đã đặt bán tại thời điểm hiện tại
        this.t135_sub_t391 = 0 //-- Tổng KL lệnh bán đang trên sàn (Tổng dư bán)
        // t136 = 0; //--
        this.t137 = 0 // -- OpenPrice Giá mở cửa
        // t138 = 0; //-- PriorOpenPrice
        this.t139 = 0 // -- ClosePrice
        // t140 = 0; //-- PriorClosePrice
        // t167 = ''; //-- SecurityType
        // t223 = ''; //-- CouponRate
        // t225 = ''; //-- IssueDate
        // t230 = 0; //-- AdjustQtty
        // t232 = ''; //-- ReferenceStatus
        // t233 = 0; //-- AdjustRate
        // t244 = 0; //-- DividentRate
        // t255 = 0; //-- CurrentPrice
        this.ref = 0
        this.t260 = 0 // -- BasicPrice
        this.t260_color = 'price-ref'
        this.t266 = 0 // -- HighestPrice Giá cao nhất
        // t277 = 0; //-- PriorPrice
        // t310 = 0; //-- MatchValue
        // t320 = 0; //-- OfferCount
        // t321 = 0; //-- BidCount
        // t326 = ''; //-- SecurityTradingStatus
        // t327 = ''; //-- ListingStatus
        this.t332 = 0 // -- CeilingPrice
        this.t332_color = 'price-ceil'
        this.t333 = 0 // -- FloorPrice
        this.t333_color = 'price-floor'
        // t334 = 0; //-- Parvalue
        this.t336 = '' //-- TradingSessionID
        this.t340 = '' //-- TradSesStatus
        this.t340_nm = '' //-- TradSesName
        this.t340_code = '' //-- TradSesCode
        this.t387 = 0 // -- TotalVolumeTraded
        // t388 = 0; //-- Tradingdate
        this.t391 = 0 //-- TotalTradedQtty -- Tổng KL khớp
        this.t392 = 0 //-- TotalTradedValue
        // t393 = 0; //-- PTMatchQtty
        // t394 = 0; //-- PTTotalTradedQtty
        // t395 = 0; //-- TotalBuyTradingQtty
        // t396 = 0; //-- TotalSellTradingQtty
        this.t397 = 0 // -- BuyForeignQtty
        this.t398 = 0 // -- SellForeignQtty
        // t399 = ''; //-- time
        // t400 = 0; //-- TradingUnit
        // t425 = ''; //-- BoardCode
        // t541 = ''; //-- MaturityDate
        this.t631 = 0 // -- MidPx Giá trung bình
        // t1321 = 0; //-- BestBidQtty
        // t1331 = 0; //-- BestOfferQtty
        // t1341 = 0; //-- TotalBidQttyOD
        // t1351 = 0; //-- TotalOfferQttyOD
        // t2551 = 0; //-- CurrentQtty
        this.t2661 = 0 // -- LowestPrice Giá thấp nhất
        this.t3301 = 0 // -- RemainForeignQtty
        this.t3871 = 0 // -- TotalValueTraded
        // t3931 = 0; //-- PTMatchPrice
        // t3941 = 0; //-- PTTotalTradedValue
        // t3951 = 0; //-- BuyCount
        // t3952 = 0; //-- TotalBuyTradingValue
        // t3961 = 0; //-- SellCount
        // t3962 = 0; //-- TotalSellTradingValue
        this.t3971 = 0 // -- BuyForeignValue
        this.t3981 = 0 // -- SellForeignValue
        this.seq = 0 // -- seq
        this.U6 = '' // -- U6
        this.U7 = '' // -- U7
        this.U8 = '' // -- U8
        this.U9 = '' // -- U9
        this.U10 = '' // -- San giao dich
        this.t555 = 0 // -- Top price
        this.t556_1 = 0 // -- NumTopPrice
        this.t132_1 = 0 // -- BestBidPrice Giá dư mua 1
        this.t1321_1 = 0 // -- BestBidQtty
        this.t133_1 = 0 // -- BestOfferPrice Giá dư bán 1
        this.t1331_1 = 0 // -- BestOfferQtty
        this.t556_2 = 0 // -- NumTopPrice
        this.t132_2 = 0 // -- BestBidPrice Dư mua giá 2
        this.t1321_2 = 0 // -- BestBidQtty
        this.t133_2 = 0 // -- BestOfferPrice Giá dư bán 2
        this.t1331_2 = 0 // -- BestOfferQtty
        this.t556_3 = 0 // -- NumTopPrice
        this.t132_3 = 0 // -- BestBidPrice Dư mua giá 3
        this.t1321_3 = 0 // -- BestBidQtty
        this.t133_3 = 0 // -- BestOfferPrice Giá dư bán 3
        this.t1331_3 = 0 // -- BestOfferQtty

        this.t556_4 = 0 // -- NumTopPrice
        this.t132_4 = 0 // -- BestBidPrice
        this.t1321_4 = 0 // -- BestBidQtty
        this.t133_4 = 0 // -- BestOfferPrice
        this.t1331_4 = 0 // -- BestOfferQtty

        this.t556_5 = 0 // -- NumTopPrice
        this.t132_5 = 0 // -- BestBidPrice
        this.t1321_5 = 0 // -- BestBidQtty
        this.t133_5 = 0 // -- BestOfferPrice
        this.t1331_5 = 0 // -- BestOfferQtty

        this.t556_6 = 0 // -- NumTopPrice
        this.t132_6 = 0 // -- BestBidPrice
        this.t1321_6 = 0 // -- BestBidQtty
        this.t133_6 = 0 // -- BestOfferPrice
        this.t1331_6 = 0 // -- BestOfferQtty

        this.t556_7 = 0 // -- NumTopPrice
        this.t132_7 = 0 // -- BestBidPrice
        this.t1321_7 = 0 // -- BestBidQtty
        this.t133_7 = 0 // -- BestOfferPrice
        this.t1331_7 = 0 // -- BestOfferQtty

        this.t556_8 = 0 // -- NumTopPrice
        this.t132_8 = 0 // -- BestBidPrice
        this.t1321_8 = 0 // -- BestBidQtty
        this.t133_8 = 0 // -- BestOfferPrice
        this.t1331_8 = 0 // -- BestOfferQtty

        this.t556_9 = 0 // -- NumTopPrice
        this.t132_9 = 0 // -- BestBidPrice
        this.t1321_9 = 0 // -- BestBidQtty
        this.t133_9 = 0 // -- BestOfferPrice
        this.t1331_9 = 0 // -- BestOfferQtty

        this.t556_10 = 0 // -- NumTopPrice
        this.t132_10 = 0 // -- BestBidPrice
        this.t1321_10 = 0 // -- BestBidQtty
        this.t133_10 = 0 // -- BestOfferPrice
        this.t1331_10 = 0 // -- BestOfferQtty

        this.TP = []
        this.EP = []
        this.U17 = 0 // -- BestOfferQtty
        this.U18 = 0 // -- BestOfferQtty
        this.U24 = '' // CK cơ sở (cho Chứng quyền)
        this.U24_price = 0 // Giá hiện tại CK cơ sở
        this.U24_price_color = 0 // Màu cho giá hiện tại CK cơ sở
        this.basis = 0 // Độ lệch
        this.U22 = 0 // Giá thực hiện (cho Chứng quyền)
        this.U23 = '' // Tỷ lệ chuyển đổi (cho Chứng quyền)
        this.t109 = 0 //  Khối lượng niêm yết (cho Chứng quyền)
        this.U20 = '' // Ngày Đáo hạn
        this.U21 = '' // Ngày GD gần nhất
        this.U19 = '' // Loại chứng quyền
        this.U29 = 0 // Giá trần dự kiến
        this.U30 = 0 // Giá sàn dự kiến
        this.U31 = 0 //Giá tham chiếu dự kiến
        this.timeServer = ''
        this.lastSeq = 0
        this.timeStock = '' // follow SI
        this.arrMinutes = []
        this.U33 = 0 // Điểm hoà vốn
        this.U34 = '' // Thông tin quyền

        // chỉ số cơ bản
        this.industries = '';
        this.percenOfvol = 0;
        this.pb = 0;
        this.pe = 0;
        this.bvps = 0;
        this.eps = 0;
        this.roe = 0;
        this.roa = 0;

        this['STATIC'] = new OthersData() // Data tĩnh chỉ lấy 1 lần
        this['1D'] = new ListTopicStockIntraday() // Data realtime Update liên tục
        this['1W'] = new ListTopicStockHistory() // Data lịch sử ...
        this['1M'] = new ListTopicStockHistory()
        this['2M'] = new ListTopicStockHistory()
        this['3M'] = new ListTopicStockHistory()
        this['6M'] = new ListTopicStockHistory()
        this['1Y'] = new ListTopicStockHistory()
        this['3Y'] = new ListTopicStockHistory()
        this['5Y'] = new ListTopicStockHistory()

        this.BUY_SELL_FLOW = {
            T: {
                rt: [],
                acl: [],
            },
            T1: {
                rt: [],
                acl: [],
            },
            T2: {
                rt: [],
                acl: [],
            },
            T3: {
                rt: [],
                acl: [],
            },
            T4: {
                rt: [],
                acl: [],
            },
        }

        this.INTRADAY_1s = []
        this.INTRADAY_1m = []
        this.PO = []
        this.EP_ODDLOT = []
    }
}

class ListTopicStockIntraday {
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
        this['MDDS|SI'] = [] // Realtime do sở trả về
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
class ListTopicStockHistory {
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
    FINANCE_INFO: {}
    constructor() {
        this.AVG_LIQUIDITY_5DAY = []
        this.VIET_STOCK = []
        this.CAFE_F = []
        this.FIINPRO = []
        this.FINANCE_INFO = {}
    }
}