import * as _ from 'lodash';
import { AccountType, SocketAuthState, SystemType } from 'constants/enum';
import { EQUITY_DEFAULT_BANK_CODE } from 'constants/main';
import {
  IAccount,
  IBrokerSubAccountRes,
  IUserAccount,
} from 'interfaces/common';
import store from 'redux/store';

const ACCOUNT_TYPES = {
  [AccountType.EQUITY]: 'Equity',
  [AccountType.EQUITY_SUB_C]: 'Equity',
  [AccountType.MARGIN]: 'Margin',
  [AccountType.DERIVATIVES]: 'Derivatives',
};

export function getAccounts(username?: string, accountList?: IUserAccount[]) {
  let mutableAccounts: IAccount[] = [];

  if (accountList && username) {
    accountList.forEach((element: IUserAccount) => {
      if (element && element.accountSubs) {
        element.accountSubs.forEach((sub) => {
          let isBankLinkingAccount = false;
          const bankAccounts = Array.from(
            new Set(sub.bankAccounts.map((item) => item.bankCode))
          ).map((bankCode) => {
            if (bankCode !== EQUITY_DEFAULT_BANK_CODE) {
              isBankLinkingAccount = true;
            }
            return (
              sub.bankAccounts.find((item) => item.bankCode === bankCode) || {}
            );
          });
          if (element.coreBank) {
            isBankLinkingAccount = element.coreBank === 'Y';
          }
          const account = element.accountNumber;
          const accountRegex = `${username}([${Object.values(AccountType)
            .map((val) => val.toUpperCase() + val.toLowerCase())
            .join('')}])([0-9]?)`;
          const accountRegexArray = new RegExp(accountRegex, 'g').exec(
            element.accountNumber
          );
          const accountType =
            (accountRegexArray?.[1] as AccountType) || AccountType.EQUITY;
          const order = accountRegexArray?.[2] ? +accountRegexArray[2] : 1;
          const accountDisplay = account;
          const accountDisplay2 = `${element.accountNumber} - ${ACCOUNT_TYPES[accountType]}`;

          mutableAccounts.push({
            username,
            accountName: element.accountName,
            accountNumber: element.accountNumber,
            subNumber: sub.subNumber,
            type: sub.type != null ? sub.type : SystemType.EQUITY,
            accountType,
            account,
            accountDisplay,
            accountDisplay2,
            banks: bankAccounts || [],
            isBankLinkingAccount,
            order,
            isDerivatives: sub.type === SystemType.DERIVATIVES,
            isEquity: sub.type === SystemType.EQUITY,
          });
        });
      }
    });
  }

  const mutableOrder: string[] = [
    AccountType.MARGIN,
    AccountType.EQUITY,
    AccountType.DERIVATIVES,
  ];
  mutableAccounts = _.sortBy(mutableAccounts, (val) =>
    _.indexOf(mutableOrder, val.accountType)
  );
  mutableAccounts = mutableAccounts.sort((a, b) =>
    a.order != null && b.order != null && a.accountType === b.accountType
      ? a.order > b.order
        ? 1
        : -1
      : 0
  );

  return mutableAccounts;
}
export function getBrokerAccounts(
  username?: string,
  accountList?: IBrokerSubAccountRes[]
) {
  let mutableAccounts: IAccount[] = [];

  if (accountList && username) {
    accountList.forEach((element: IBrokerSubAccountRes) => {
      if (element) {
        const account = element.accountNumber;
        const accountRegex = `${username}([${Object.values(AccountType)
          .map((val) => val.toUpperCase() + val.toLowerCase())
          .join('')}])([0-9]?)`;
        const accountRegexArray = new RegExp(accountRegex, 'g').exec(
          element.accountNumber
        );

        const order = accountRegexArray?.[2] ? +accountRegexArray[2] : 1;
        const accountDisplay = account;
        const accountDisplay2 = `${element.accountNumber} - ${element.subAccountName}`;

        mutableAccounts.push({
          username,
          accountName: element.subAccountName,
          accountNumber: element.accountNumber,
          subNumber: '',
          type:
            element.investorTypeID === AccountType.EQUITY ||
            element.investorTypeID === AccountType.MARGIN
              ? SystemType.EQUITY
              : SystemType.DERIVATIVES,
          accountType: element.investorTypeID,
          account,
          accountDisplay,
          accountDisplay2,
          banks: [],
          isBankLinkingAccount: false,
          order,
          isDerivatives:
            element.investorTypeID !== AccountType.EQUITY &&
            element.investorTypeID !== AccountType.MARGIN,
          isEquity:
            element.investorTypeID === 'X' || element.investorTypeID === 'M',
          isBrokerCall: true,
          clientID: element.clientID,
          tradingAccSeq: element.tradingAccSeq,
          investorTypeID: element.investorTypeID,
        });
      }
    });
  }

  const mutableOrder: string[] = [
    AccountType.MARGIN,
    AccountType.EQUITY,
    AccountType.DERIVATIVES,
  ];
  mutableAccounts = _.sortBy(mutableAccounts, (val) =>
    _.indexOf(mutableOrder, val.accountType)
  );

  mutableAccounts = mutableAccounts.sort((a, b) =>
    a.accountType > b.accountType ? 1 : -1
  );
  return mutableAccounts;
}

export const isAuthenticated = () =>
  store.getState().wtsSocket?.authState === SocketAuthState.AUTHENTICATED;



// WEBPACK FOOTER //
// ./src/utils/domain.ts