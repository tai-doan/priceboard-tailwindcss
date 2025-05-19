export default class requestInfo {
    key?: any
    reqFunct: any
    receiveFunct: any
    resSucc: boolean
    inputParam: string[] | any
    WorkerName: any
    onSuccess: Function
    onFailed: Function
    ServiceName: string

    constructor(reqFunct: string, inputParam: string[] | any, receiveFunct: Function, WorkerName: string, ServiceName: string, onSuccess: Function = () => null, onFailed: Function = () => null, key: string) {
        this.key = key
        // this.reqTime = new Date(); //-- time that client send request
        // this.resTime = new Date(); //-- time receive result from server
        this.reqFunct = reqFunct //-- function nam
        this.receiveFunct = receiveFunct // handle respone request
        // this.procStat = 0; //-- 0 - initial status, 1 -- received result from server and client processing, 2 - client processing finish, 3 - timeout request
        this.resSucc = true //-- status process request of service (false => error)
        this.inputParam = inputParam //-- array input paramesters,
        this.WorkerName = WorkerName
        this.ServiceName = ServiceName
        this.onSuccess = onSuccess
        this.onFailed = onFailed
    }
}

/**
 * tất cả các request từ client được lưu vào Hashmap, với key là request sequence tăng dần, value là
 * object như model trên
 */

export interface IServiceInfo {
    reqFunct?: string // Phải dùng nếu không rất dễ lỗi
    WorkerName: `${'FOS' | 'ALT'}${'x' | 'q'}${string}`
    ServiceName: `${'FOS' | 'ALT'}${'x' | 'q'}${string}`
    Operation: 'Q' | 'I' | 'U' | 'D',
    /**
     * @deprecated Không dùng ClientSentTime nữa - không cần thiêt
     */
    ClientSentTime?: '0'
    AprStat?: any
    AprSeq?: any
    MakerDt?: any
    TimeOut?: any
    /**
     * @deprecated Không dùng clientSeq sẽ lỗi không mong muốn ví dụ nhảy cóc clienseq
     */
    clientSeq?: number
}