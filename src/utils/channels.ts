/**
 * Defined all chanel for socket client comunication with socket server
 */
export default {
    //-- Nhận thông báo hệ thống
    SYS_MSG: 'SYS_MSG',
    //-- Nhận dữ liệu chat từ broker
    CHAT_MSG: 'CHAT_MSG',
    //-- Gửi request lấy dữ liệu thị trường tới server
    MKT_INFO_REQ: 'MKT_INFO_REQ',
    //-- Nhận phản hồi của server cho một request thông tin thị trường
    MKT_INFO_RES: 'MKT_INFO_RES',
    //-- Nhận dữ liệu thị trường realtime
    MKT_INFO: 'MKT_INFO',
    //-- Nhận dữ liệu thị trường realtime mkt top
    MKT_TOP: 'MKT_TOP',
    //-- Nhận dữ liệu thị trường realtime pt info
    PT_BOARD: 'PT_BOARD',
    //-- Nhận dữ liệu thị trường realtime eff top
    EFF_TOP: 'EFF_TOP',
    //-- Nhận dữ liệu thị trường realtime foreigner top
    FRG_TOP: 'FRG_TOP',
    //-- Nhận dữ liệu thị trường realtime frg mkt share
    FRG_MKT_SHARE: 'FRG_MKT_SHARE',
    //-- Nhận dữ liệu notify
    NTF_MSG: 'NTF_MSG',


    // -- streamer server
    LIST_CHANNELS_STREAM: ['SUB_REQ', 'SUB_RES', 'UNSUB_REQ', 'UNSUB_RES', 'onFOSStream', 'HIST_REQ', 'HIST_RES', 'EXCHANGE_TIME', 'AUTHEN_REQ'],
    SUB_REQ: 'SUB_REQ',
    SUB_RES: 'SUB_RES',
    UNSUB_REQ: 'UNSUB_REQ',
    UNSUB_RES: 'UNSUB_RES',
    onFOSStream: 'onFOSStream',
    HIST_REQ: 'HIST_REQ',
    HIST_RES: 'HIST_RES',
    EXCHANGE_TIME: 'EXCHANGE_TIME',

    AUTHEN_REQ: 'AUTHEN_REQ',
    AUTHEN_RES: 'AUTHEN_RES',

    // -- trading server
    LIST_CHANNELS_TRADING: ['REQ_MSG', 'RES_MSG'],
    //-- Gửi request một yêu cầu (service) tới server
    REQ_MSG: 'REQ_MSG',
    //-- Nhận phản hồi của server cho một request thông thường
    RES_MSG: 'RES_MSG',
}