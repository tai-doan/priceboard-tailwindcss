import type { ColDef, ColGroupDef } from "ag-grid-community";
import {
  AccountType,
  CandleType,
  IndexStock,
  Lang,
  Market,
  RealtimeChannelDataType,
  SocketAuthState,
  SymbolType,
  SystemType,
} from "../constants/enum";

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export interface IAction<T = any> {
  readonly type: string;
  readonly payload: T;
  readonly data?: T;
  readonly response?: IResponseType;
}

export interface IActionExtra<T, D> extends IAction<T> {
  readonly extraData: D;
}

export type IReducer<T, A = T> = (state: T, action: IAction<A | T>) => T;

export type IQueryReducer<T, A = T, P = {}> = (
  state: IReducerState<T, P>,
  action: IAction<A | T>,
) => IReducerState<T, P>;

export interface IReducerState<T, P = {}> {
  readonly params?: P;
  readonly data: T;
  readonly status: IQueryStatus;
}

export interface IQueryState<T> {
  readonly data?: T;
  readonly status: IQueryStatus;
}

export interface IQueryStatus {
  readonly isLoading?: boolean;
  readonly isFailed?: boolean;
  readonly isSucceeded?: boolean;
  readonly errorMessage?: string;
  readonly loadMore?: boolean;
}

export interface IWorker extends Window {
  readonly init: boolean;
  readonly socket: ISocket;
  readonly postMessage: <T>(message: IAction<IParams | IParams[] | T>) => void;
}

export interface IWindow extends Window {
  readonly OneSignal: IOneSignal;
}

export interface IClientData {
  readonly clientId: string;
  readonly clientSecret: string;
}

export interface IChannel {
  readonly watch: <T>(callback: (res?: T) => void) => Function;
  readonly unwatch: Function;
  readonly unsubscribe: Function;
}

export interface IAccount {
  readonly username: string;
  readonly accountNumber: string;
  readonly subNumber: string;
  readonly type: SystemType;
  readonly accountType: AccountType;
  readonly account: string;
  readonly accountDisplay?: string;
  readonly accountDisplay2?: string;
  readonly banks?: IAccountBank[];
  readonly isBankLinkingAccount?: boolean;
  readonly accountName?: string;
  readonly order?: number;
  readonly isEquity?: boolean;
  readonly isDerivatives?: boolean;
  /**
   * Is IICA Account?
   */
  readonly isIICA?: boolean;
  /**
   * Bank IICA Id
   */
  readonly bankIICAId?: string;
  readonly isBrokerCall?: boolean;
  readonly clientID?: string;
  readonly tradingAccSeq?: number;
  readonly investorTypeID?: string;
  readonly phoneCode?: string;
}

export interface IUserSubAccount {
  readonly subNumber: string;
  readonly type?: SystemType;
  readonly bankAccounts: IAccountBank[];
}

export interface IUserAccount {
  readonly accountNumber: string;
  readonly accountName: string;
  readonly accountDesc: string;
  readonly coreBank?: string;
  readonly accountSubs: IUserSubAccount[];
}

export interface IBank {
  readonly bankNo: string;
  readonly fullName: string;
}

export interface IBankBranch {
  readonly branchName: string;
}

export interface IAccountInfo {
  readonly customerName: string;
  readonly dateOfBirth: string;
  readonly identifierNumber: string;
  readonly identifierIssueDate: string;
  readonly identifierIssuePlace: string;
  readonly address: string;
  readonly email: string;
  readonly phoneNumber: string;
}

export interface IAccountBank {
  readonly accountNumber?: string;
  readonly subNumber?: string;
  readonly bankCode?: string;
  readonly bankName?: string;
  readonly bankAccount?: string;
}

export interface IAccountBanks {
  readonly banks: IAccountBank[];
  readonly account?: IAccount;
}

export interface IUserInfo {
  readonly id: number;
  readonly username: string;
  readonly avatar?: string;
  readonly displayName?: string;
  readonly email?: string;
  readonly phoneNumber?: string;
  readonly phoneCode?: string;
  readonly birthday?: string;
  readonly accounts?: IUserAccount[];
  readonly orderPassType?: string;
  readonly userLevel?: "BROKER" | "USER" | "CUSTOMER";
  readonly identifierNumber?: string;
}

export interface IUserData {
  readonly accountNumbers: string[];
  readonly username: string;
  readonly masDrTokenId: string;
  readonly masEquityTokenId: string;
}

export interface IAuthToken {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly userInfo: IUserInfo;
  readonly token?: {
    readonly userData: IUserData;
  };
  readonly s?: {
    readonly gt: string;
    readonly otp?: boolean;
  };
}

export interface IClientDetailParams {
  readonly clientID?: string;
}
export interface IUserExtraInfo {
  readonly currentSymbol?: unknown;
  readonly lastSymbolType?: SymbolType;
  readonly currentStock?: string;
  readonly currentCW?: string;
  readonly currentIndex?: string;
  readonly currentFutures?: string;
  readonly selectedAccount?: IAccount;
  readonly candleSettings: ICandleSettings;
  readonly orderFormSettings: IOrderFormSetting;
  readonly hiddenComponentSetting: IHiddenComponentSetting;
  readonly layout?: unknown[];
  readonly userInfoCurrent?: IUserInfo;
  readonly notifications?: INotifications;
}

export interface IDomainUserInfo {
  readonly userInfo: {
    readonly username: string;
    readonly isResetPass: string;
  };
}

export interface ICandleSettings {
  readonly candleType?: CandleType;
}

export interface IOrderFormSetting {
  readonly promptStatus?: boolean;
}

export interface IHiddenComponentSetting {
  readonly hiddenIndexList?: boolean;
  readonly hiddenBoard?: boolean;
}

export interface IRequest<T> {
  readonly type: string;
  readonly response: IResponseType;
  readonly data: T;
  readonly payload: T;
}

export interface IRequestExtra<T, D> extends IRequest<T> {
  readonly extraData: D;
}

export interface IResponseType {
  readonly success: string;
  readonly failed: string;
}

export interface IParams {
  readonly [s: string]: any;
  readonly offset?: number;
  readonly fetchCount?: number;
  readonly loadMore?: boolean;
}

export interface IError {
  readonly code: string;
  readonly message: string;
  readonly messageParams: string[];
}

export interface IResponse<T> {
  readonly data: T;
  readonly status?: string;
}

export interface INotification {
  readonly type: unknown;
  readonly title: string;
  readonly content: string | React.ReactNode;
  readonly contentParams?: { readonly [s: string]: any };
  readonly time: Date;
  readonly option?: unknown;
  readonly ignore?: boolean;
  readonly showNotification?: boolean;
}

export interface IRememberUsername {
  readonly isStored: boolean;
  readonly username: string;
}

export interface IOneSignal {
  readonly sendTags: (data: object) => void;
  readonly init: (data: object) => void;
}

export interface IIndexSliderChartConfig {
  readonly IncreaseColor: {
    readonly line: string;
    readonly gradient: Array<[number, string]>;
  };
  readonly DecreaseColor: {
    readonly line: string;
    readonly gradient: Array<[number, string]>;
  };
}

export interface IIndexMinutesData {
  readonly name?: string;
  readonly data?: {
    readonly c: number;
    readonly h: number;
    readonly l: number[];
    readonly o: number;
    readonly t: string[];
    readonly pv: number[];
  };
}

export interface IMutableObjectData<T> {
  [s: string]: T; // eslint-disable-line
}

export interface IObjectData<T> {
  readonly [s: string]: T;
}
export interface ILastTradingDate {
  readonly lastTradingDate: string | null;
}

export type BoardKey =
  | "WATCHLIST"
  | "HOSE"
  | IndexStock
  | "HNX"
  | "UPCOM"
  | "FUTURES"
  | "CW"
  | "FUND"
  | "BOND"
  | "AI Rating"
  | "PutThrough"
  | "Oddlot"
  | "ETF"
  | "All"
  | "ODDLOT"
  | "BUYIN";

export interface IBoardTab {
  readonly key: BoardKey;
  readonly title?: string;
  readonly market?: Market;
  readonly route?: unknown;
  readonly data?: IBoardSubTab[];
  readonly default?: boolean;
  readonly selectedSubTab?: IBoardSubTab;
}

export interface IBoardSubTab {
  readonly title?: string;
  readonly key: string;
  readonly route?: string;
  readonly default?: boolean;
  readonly value?: string;
}

export interface INotifications {
  readonly notifications: INotification[];
  readonly unseenCount: number;
}

export interface ITabTableData {
  readonly key: string;
  readonly title: string;
  readonly default?: boolean;
  readonly component?: React.ReactNode;
  readonly hide?: boolean;
}

export interface IFormProps<T> {
  readonly setFieldValue: (
    field: Extract<keyof T, string>,
    value: any,
    shouldValidate?: boolean,
  ) => void;
  readonly setFieldError: (
    field: Extract<keyof T, string>,
    message: string,
  ) => void;
  readonly setFieldTouched: (
    field: Extract<keyof T, string>,
    isTouched?: boolean,
    shouldValidate?: boolean,
  ) => void;
  readonly validateField: (field: Extract<keyof T, string>) => void;
}

export interface IPersistConfig<S, RS = any, HSS = any, ESS = any> {
  readonly whitelist?: Array<Extract<keyof S, string>>;
  readonly blacklist?: Array<Extract<keyof S, string>>;
}

export interface IColDef<T> extends ColDef {
  readonly field?: Extract<keyof T, string>;
}

export interface IColGroupDef<T> extends ColGroupDef {
  readonly children: Array<IColDef<T> | IColGroupDef<T>>;
}

export interface IClientDetail {
  readonly authorizedPerson?: IAuthorizedPersonDetail;
  readonly customerProfile?: ICustomerProfileDetail;
}
export interface IBrokerDetail {
  readonly email?: string;
  readonly operatorID?: string;
  readonly operatorName?: string;
  readonly phoneNumber?: string;
}
export interface IBrokerPhoneCode {
  readonly isAuthorized?: boolean;
  readonly pin?: string;
  readonly clientID?: string;
  readonly function?: BrokerFunction;
}
export enum BrokerFunction {
  PLACE_ORDER_NORMAL = "PLACE_ORDER_NORMAL",
  PLACE_ORDER_sTOP_LIMIT = "PLACE_ORDER_sTOP_LIMIT",
  STOCK_TRANSFER = "STOCK_TRANSFER",
  CASH_IN_ADVANCED = "CASH_IN_ADVANCED",
  CASH_TRANSFER_INTERNAL = "CASH_TRANSFER_INTERNAL",
  CASH_TRANSFER_EXTERNAL = "CASH_TRANSFER_EXTERNAL",
  DEPOSIT_TO_VSD = "DEPOSIT_TO_VSD",
  RIGHT_SUBSCRIPTION = "RIGHT_SUBSCRIPTION",
}

export interface IAuthorizedPersonDetail {
  readonly exist: boolean;
  readonly authorizedPersonsName: string;
  readonly authorizedPersonsID: string;
  readonly IDCardPassport: string;
  readonly address: string;
  readonly telephone: string;
  readonly email: string;
  readonly birthday: string;
  readonly cityIssue: string;
  readonly dateIssue: string;
  readonly expiryDate: string;
  readonly gender: string;
  readonly idtype: string;
  readonly registrationType: string;
}

export interface ICustomerProfileDetail {
  readonly accountNo: string;
  readonly customerID: string;
  readonly userName: string;
  readonly IDNumberPassport: string;
  readonly address: string;
  readonly telephone: string;
  readonly mobilePhone: string;
  readonly email: string;
  readonly customerType: string;
  readonly branchName: string;
  readonly brokersName: string;
  readonly brokersContactNo: string;
  readonly brokersEmail: string;
  readonly authorizedPerson: boolean;
}

export interface IWatchlist {
  readonly id: number;
  readonly name: string;
  readonly isServer?: boolean;
  readonly data?: string[];
}

export interface ILocale {
  readonly lang: Lang;
  readonly latestVersion: string;
  readonly msName: string;
  readonly files: Array<{ readonly namespace: string; readonly url: string }>;
}

/* eslint-disable */
export interface ISelf {
  lang: Lang;
  domain: string;
  init: boolean;
  protocolCheck: Function;
  baseURI: string;
  sourceIp: string;
  env: unknown;
  htsEnv?: unknown;
}

export type TMutable<T> = { -readonly [P in keyof T]: TMutable<T[P]> };

export interface ISocket {
  id: string;
  state: string;
  authState: SocketAuthState;
  authToken?: IAuthToken;
  signedAuthToken: string;
  userChannel?: IChannel;
  domainChannels?: IChannel[];
  globalChannel?: IChannel;
  emit: Function;
  on: Function;
  authenticate: Function;
  deauthenticate: (cb: (err: unknown) => void) => void;
  subscribe: (channel: string, options?: { batch: boolean }) => IChannel;
  isSubscribed: (channelName: string, includePending?: boolean) => boolean;
  destroy: Function;
  connect: Function;
  disconnect: (code?: number, data?: string) => void; // code between 4100 to 4500
}

export interface ISubscribeChannel {
  code?: string;
  symbolType?: SymbolType;
  channel?: IChannel;
  channelType: RealtimeChannelDataType;
  count: number;
  callbacks?: {
    [key: string]: (data: unknown) => void;
  };
  isSubscribePriceDepth?: boolean;
}

export interface IBrokerSubAccountRes {
  readonly clientID: string;
  readonly tradingAccSeq: number;
  readonly accountNumber: string;
  readonly subAccountName?: string;
  readonly investorTypeID: AccountType;
  readonly state?: string;
}

export interface IConsent {
  readonly username?: string;
  readonly consented?: boolean;
}

export interface IRegisterCA {
  readonly serialToken?: string;
  readonly registerAt?: string;
  readonly expireAt?: string;
  readonly issueAt?: string;
  readonly issuer?: string;
  readonly clientID?: string;
}

export interface ITokenCAResponse {
  readonly clientID?: string;
  readonly serialToken?: string;
  readonly registerAt?: string;
  readonly expireAt?: string;
}

export interface ITokenCAOTPResponse {
  readonly otpToken?: string;
}

export interface ISignTokenCA {
  readonly serial?: string;
  readonly isTokenCA?: boolean;
}

export interface ISaveSignTokeCA {
  readonly action: string;
  readonly serialToken: string;
  readonly dataSign?: string;
  readonly timeSign: string;
}

// WEBPACK FOOTER //
// ./src/interfaces/common.ts
