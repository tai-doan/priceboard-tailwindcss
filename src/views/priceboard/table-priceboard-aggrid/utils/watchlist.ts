import { IState } from 'redux/global-reducers';
import { IWatchlist } from 'interfaces/common';
import { isAuthenticated } from './domain';

export default function getWatchlist(props: {
  readonly watchlist: IState['watchlist'];
  readonly watchlistServer: IState['watchlistServer'];
}): IWatchlist[] {
  return isAuthenticated() ? props.watchlistServer : props.watchlist;
}



// WEBPACK FOOTER //
// ./src/utils/watchlist.ts