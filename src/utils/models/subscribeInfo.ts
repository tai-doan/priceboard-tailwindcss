export default class SubscribeInfo {
    key?: any
    onSuccess: Function
    onFailed: Function
    topic: string[]
    value: string[]
    controlTimeOutKey: string

    constructor(
        key: string,
        onSuccess: Function = () => null,
        onFailed: Function = () => null,
        topic: string[],
        value: string[],
        controlTimeOutKey: string,
    ) {
        this.key = key;
        this.onSuccess = onSuccess;
        this.onFailed = onFailed;
        this.topic = topic;
        this.value = value;
        this.controlTimeOutKey = controlTimeOutKey;
    }
}

export interface ISubInfo {
    component: string;
    command?: 'GET_HIST' | 'SUB' | 'UNSUB';
    time?: number;
    onTimeout?: Function;
    onSuccess?: Function;
    topic: string[];
    value: string[];
    fromseq?: any;
    size?: number[];
    type?: any;
    onFailed?: Function;
}