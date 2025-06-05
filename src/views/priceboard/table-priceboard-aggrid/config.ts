import type {
  CellDoubleClickedEvent,
  ColDef,
  ColGroupDef,
  ITooltipParams,
  RowNode,
} from "ag-grid-community";
import classNames from "classnames";
import ToggleGroupHeader from "./components/GridCustomCell/ToggleGroupHeader";
import ToggleHeader from "./components/GridCustomCell/ToggleHeader";
import { SpeedOrderClickType } from "./constants/enum";
import type { IColDef, IColGroupDef } from "./interfaces/common";
import type { INewSymbolData } from "./stockboard";
import SymbolCell from "./SymbolCell";
import {
  bidClassRules,
  changeFormatter,
  changePriceGetter,
  closePriceClassRules,
  closePriceGetter,
  closePriceSmallTextClassRules,
  matchVolumeGetter,
  offerClassRules,
  priceFormatter,
  priceFormatterFutures,
  priceFormatterIgnoreZero,
  priceFormatterIgnoreZeroFutures,
  quantityFormatter,
  quantityOddlotFormatter,
  // rateFormatter,
  rateFormatterNew,
  ratePriceGetter,
  tradingValueFormatter,
  valueClassRules,
  volumeFormatter,
} from "./utils/board";

const HEADER_MAX_WIDTH = 500;
const HEADER_MIN_WIDTH = 40;
const PRICE_CELL_MIN_WIDTH = 54;
const QUANTITY_CELL_MIN_WIDTH = 70;

export const DEFAULT_COL_DEF: ColDef = {
  minWidth: HEADER_MIN_WIDTH,
  headerClass: "Header",
  maxWidth: HEADER_MAX_WIDTH,
  cellClass: "Cell",
  menuTabs: [],
  sortable: true,
  lockPinned: true,
};

export const DEFAULT_COL_GROUP_DEF: ColGroupDef = {
  children: [],
  marryChildren: true,
};

const t = (key: any) => String(key);

const generateWidth = (
  key: string,
  hose: number,
  hnx: number,
  oddLot: number,
  cw: number,
  future: number,
  others: number,
) =>
  key === "HOSE"
    ? hose
    : key === "HNX" || key === "UPCOM"
      ? hnx
      : key === "Oddlot"
        ? oddLot
        : key === "CW"
          ? cw
          : key === "FUTURES"
            ? future
            : others;

const symbolInfoTooltip = (params: ITooltipParams) => "";

const generateBidAskCol = (
  index: number,
  type: "Bid" | "Ask",
  hide?: boolean,
  isOddLot?: boolean,
  onCellDoubleClicked?: (params: CellDoubleClickedEvent) => void,
  priceTooltip?: () => string,
): {
  readonly price: IColDef<INewSymbolData>;
  readonly vol: IColDef<INewSymbolData>;
} =>
  type === "Bid"
    ? {
        price: {
          colId: `TPBID-t270${index + 1}`,
          headerName: t(`Prc ${index + 1}`),
          field: "TPBID",
          valueGetter: `data.TPBID && data.TPBID[${index}] && (data.TPBID[${index}].t270 ? (data.TPBID[${index}].t270 ? data.TPBID[${index}].t270 : data.ss) : null)`,
          minWidth: 55,
          maxWidth: HEADER_MAX_WIDTH,
          headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b`,
          headerTooltip: t("Drag and drop to move column"),
          valueFormatter: priceFormatterFutures,
          cellClassRules: valueClassRules,
          onCellDoubleClicked,
          tooltipValueGetter: priceTooltip,
          hide,
        },
        vol: {
          colId: `TPBID-t271${index + 1}`,
          headerName: t(`Vol ${index + 1}`),
          field: "TPBID",
          valueGetter: `data.TPBID && data.TPBID[${index}] && data.TPBID[${index}].t271`,
          minWidth: 75,
          maxWidth: HEADER_MAX_WIDTH,
          headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b`,
          cellClassRules: bidClassRules(index),
          headerTooltip: t("Drag and drop to move column"),
          valueFormatter: isOddLot ? quantityOddlotFormatter : volumeFormatter,
          hide,
        },
      }
    : {
        price: {
          colId: `TPOFFER-t270${index + 1}`,
          headerName: t(`Prc ${index + 1}`),
          field: "TPOFFER",
          valueGetter: `data.TPOFFER && data.TPOFFER[${index}] && (data.TPOFFER[${index}].t270 ? (data.TPOFFER[${index}].t270 ? data.TPOFFER[${index}].t270 : data.ss) : null)`,
          minWidth: 55,
          maxWidth: HEADER_MAX_WIDTH,
          headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b`,
          headerTooltip: t("Drag and drop to move column"),
          valueFormatter: priceFormatterFutures,
          cellClassRules: valueClassRules,
          onCellDoubleClicked,
          tooltipValueGetter: priceTooltip,
          hide,
        },
        vol: {
          colId: `TPOFFER-t271${index + 1}`,
          headerName: t(`Vol ${index + 1}`),
          field: "TPOFFER",
          valueGetter: `data.TPOFFER && data.TPOFFER[${index}] && data.TPOFFER[${index}].t271`,
          minWidth: 75,
          maxWidth: HEADER_MAX_WIDTH,
          headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b`,
          headerTooltip: t("Drag and drop to move column"),
          valueFormatter: isOddLot ? quantityOddlotFormatter : volumeFormatter,
          cellClassRules: offerClassRules(index),
          hide,
        },
      };

export const getColumnDefs = (
  indexCd: string,
  onRemoveRow?: (rowNode: RowNode) => void,
  onShowSymbolInfo?: (
    data: INewSymbolData,
    clickType: SpeedOrderClickType,
  ) => void,
  onPinRow?: (node: RowNode) => void,
  onUnpinRow?: (node: RowNode) => void,
  onCellDoubleClicked?: (params: CellDoubleClickedEvent) => void,
): Array<IColGroupDef<INewSymbolData> | IColDef<INewSymbolData>> => {
  const isOddlot = indexCd === "Oddlot";
  const priceTooltip = () => "";

  return [
    {
      colId: "t55",
      field: "t55",
      headerName: t("Symbols"),
      pinned: "left",
      cellClass: `scroll-mt-[52px] border-r first:border-l border-light-line dark:border-dark-line text-caption text-[13px] font-bold group-hover:!bg-[#33343C3D] dark:group-hover:!bg-[#33343C] sticky left-0 z-[1] dark:text-[#FF3737]`,
      cellClassRules:
        indexCd === "HOSE" || indexCd === "CW" || indexCd === "ETF"
          ? closePriceSmallTextClassRules
          : closePriceClassRules,
      minWidth: 86,
      headerClass: 'text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323] sticky left-0 z-10 border-b',
      cellRendererFramework: SymbolCell,
      rowDrag: indexCd === "WATCHLIST",
      tooltipValueGetter: symbolInfoTooltip,
      cellRendererParams: {
        boardKey: indexCd,
        onRemoveRow,
        onShowSymbolInfo,
        onPinRow,
        onUnpinRow,
      },
    },
    {
      colId: "t1149",
      field: "t1149",
      headerName: t("Ceil"),
      headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]  border-b`,
      cellClass: `Cell Ceil Highlight`,
      // suppressSizeToFit: true,
      valueFormatter: priceFormatter,
      onCellDoubleClicked,
      tooltipValueGetter: priceTooltip,
      headerTooltip: t("Drag and drop to move column"),
      minWidth: generateWidth(indexCd, 50, 50, 50, 50, 60, 60),
      maxWidth: generateWidth(indexCd, 50, 50, 50, 50, 60, 60),
      hide: indexCd === "BOND",
    },
    {
      colId: "t1148",
      field: "t1148",
      headerName: t("Floor"),
      headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]  border-b`,
      cellClass: `Cell Floor Highlight`,
      maxWidth: generateWidth(indexCd, 50, 50, 50, 50, 60, 60),
      minWidth: generateWidth(indexCd, 50, 50, 50, 50, 60, 60),
      // suppressSizeToFit: true,
      valueFormatter: priceFormatter,
      onCellDoubleClicked,
      tooltipValueGetter: priceTooltip,
      headerTooltip: t("Drag and drop to move column"),
      hide: indexCd === "BOND",
    },
    {
      colId: "t20013",
      field: "t20013",
      headerName: t("Ref"),
      headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]  border-b`,
      cellClass: `Cell Ref Highlight`,
      maxWidth: generateWidth(indexCd, 50, 50, 50, 50, 60, 60),
      minWidth: generateWidth(indexCd, 50, 50, 50, 50, 60, 60),
      // suppressSizeToFit: true,
      valueFormatter: priceFormatter,
      onCellDoubleClicked,
      tooltipValueGetter: priceTooltip,
      headerTooltip: t("Drag and drop to move column"),
    },
    {
      headerName: t("Trading"),
      headerGroupComponentFramework: ToggleGroupHeader,
      headerGroupComponentParams: {
        staticHeader: false,
      },
      headerClass: "relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]  border-b ",
      sortable: true,
      children: [
        {
          headerName: t("Total Volume"),
          field: "t387",
          colId: "t387",
          headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b`,
          valueFormatter: volumeFormatter,
          columnGroupShow: "closed",
          minWidth: 80,
          headerTooltip: t("Drag and drop to move column"),
        },
        {
          headerName: `${t("Total Value")} (${t("mils")})`,
          field: "t381",
          colId: "t381",
          headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b`,
          valueFormatter: tradingValueFormatter,
          columnGroupShow: "open",
          minWidth: generateWidth(indexCd, 62, 62, 64, 54, 62, 62),
          headerTooltip: t("Drag and drop to move column"),
        },
      ],
    },
    {
      headerName: t("Bid"),
      headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium `,
      children: [
        generateBidAskCol(
          9,
          "Bid",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          9,
          "Bid",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          8,
          "Bid",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          8,
          "Bid",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          7,
          "Bid",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          7,
          "Bid",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          6,
          "Bid",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          6,
          "Bid",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          5,
          "Bid",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          5,
          "Bid",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          4,
          "Bid",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          4,
          "Bid",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          3,
          "Bid",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          3,
          "Bid",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          2,
          "Bid",
          false,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          2,
          "Bid",
          false,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          1,
          "Bid",
          false,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          1,
          "Bid",
          false,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          0,
          "Bid",
          false,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          0,
          "Bid",
          false,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
      ],
    },
    {
      headerName: t("Matched"),
      headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium `,
      marryChildren: true,
      children: [
        {
          colId: "t270",
          field: "t270",
          headerName: t("Price"),
          valueGetter: closePriceGetter,
          minWidth: 55,
          headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b`,
          headerTooltip: t("Drag and drop to move column"),
          cellClass: `Highlight Cell`,
          valueFormatter: priceFormatterIgnoreZero,
          cellClassRules: closePriceClassRules,
          onCellDoubleClicked,
          tooltipValueGetter: priceTooltip,
        },
        {
          colId: "t271",
          field: "t271",
          headerName: t("Vol"),
          valueGetter: matchVolumeGetter,
          headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b`,
          headerTooltip: t("Drag and drop to move column"),
          cellClass: `Highlight Cell`,
          valueFormatter: volumeFormatter,
          cellClassRules: closePriceClassRules,
          minWidth: 75,
        },
        {
          colId: "ch",
          field: "ch",
          headerName: "+/-",
          valueGetter: changePriceGetter,
          columnGroupShow: "closed",
          headerComponentFramework: ToggleHeader,
          headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b`,
          headerTooltip: t("Drag and drop to move column"),
          cellClass: `Highlight Cell`,
          valueFormatter: changeFormatter,
          cellClassRules: closePriceClassRules,
          minWidth: generateWidth(indexCd, 50, 50, 52, 54, 44, 50),
        },
        {
          colId: "ra",
          field: "ra",
          headerName: "%",
          valueGetter: ratePriceGetter,
          columnGroupShow: "open",
          headerComponentFramework: ToggleHeader,
          headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b`,
          headerTooltip: t("Drag and drop to move column"),
          cellClass: `Highlight Cell`,
          valueFormatter: rateFormatterNew,
          cellClassRules: closePriceClassRules,
          minWidth: generateWidth(indexCd, 50, 50, 52, 54, 44, 50),
        },
      ],
    },
    {
      headerName: t("Ask"),
      headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium `,
      children: [
        generateBidAskCol(
          0,
          "Ask",
          false,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          0,
          "Ask",
          false,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          1,
          "Ask",
          false,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          1,
          "Ask",
          false,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          2,
          "Ask",
          false,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          2,
          "Ask",
          false,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          3,
          "Ask",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          3,
          "Ask",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          4,
          "Ask",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          4,
          "Ask",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          5,
          "Ask",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          5,
          "Ask",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          6,
          "Ask",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          6,
          "Ask",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          7,
          "Ask",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          7,
          "Ask",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          8,
          "Ask",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          8,
          "Ask",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
        generateBidAskCol(
          9,
          "Ask",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).price,
        generateBidAskCol(
          9,
          "Ask",
          true,
          isOddlot,
          onCellDoubleClicked,
          priceTooltip,
        ).vol,
      ],
    },
    {
      headerName: t("Prices"),
      headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium`,
      children: [
        {
          colId: "t30562",
          field: "t30562",
          headerName: t("High"),
          headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b`,
          headerTooltip: t("Drag and drop to move column"),
          // suppressSizeToFit: true,
          cellClass: `Cell Highlight`,
          valueFormatter: priceFormatterIgnoreZeroFutures,
          cellClassRules: valueClassRules,
          onCellDoubleClicked,
          tooltipValueGetter: priceTooltip,
          minWidth: 55,
        },
        {
          colId: "t40001",
          field: "t40001",
          headerName: t("Avg"),
          headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b`,
          headerTooltip: t("Drag and drop to move column"),
          // suppressSizeToFit: true,
          cellClass: `Cell Highlight`,
          valueFormatter: priceFormatterIgnoreZeroFutures,
          cellClassRules: valueClassRules,
          onCellDoubleClicked,
          tooltipValueGetter: priceTooltip,
          minWidth: 55,
        },
        {
          colId: "t30563",
          field: "t30563",
          headerName: t("Low"),
          headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b`,
          headerTooltip: t("Drag and drop to move column"),
          // suppressSizeToFit: true,
          cellClass: `Cell Highlight`,
          valueFormatter: priceFormatterIgnoreZeroFutures,
          cellClassRules: valueClassRules,
          onCellDoubleClicked,
          tooltipValueGetter: priceTooltip,
          minWidth: 55,
        },
      ],
    },
    // {
    //   headerName: t("Total"),
    //   headerGroupComponentFramework: ToggleGroupHeader,
    //   headerGroupComponentParams: {
    //     staticHeader: false,
    //   },
    //   headerClass: "ShowOnlyToggleGroupHeader",
    //   sortable: true,
    //   children: [
    //     {
    //       headerName: t("Total PT Vol"),
    //       field: "pvo",
    //       colId: "pvo",
    //       headerClass: `NoGroupHeader`,
    //       valueGetter: pvoPriceGetter,
    //       valueFormatter: quantityFormatter,
    //       columnGroupShow: "closed",
    //       minWidth: QUANTITY_CELL_MIN_WIDTH + 25,
    //       maxWidth: QUANTITY_CELL_MIN_WIDTH + 25,
    //       headerTooltip: t("Drag and drop to move column"),
    //       hide: domainConfig[config.domain]?.hideTotalColumn as boolean,
    //     },
    //     {
    //       headerName: `${t("Total PT Value")} (${t("mils")})`,
    //       field: "pva",
    //       colId: "pva",
    //       headerClass: `NoGroupHeader`,
    //       valueGetter: pvaPriceGetter,
    //       valueFormatter: tradingValueFormatter,
    //       columnGroupShow: "open",
    //       minWidth: QUANTITY_CELL_MIN_WIDTH + 25,
    //       maxWidth: QUANTITY_CELL_MIN_WIDTH + 25,
    //       headerTooltip: t("Drag and drop to move column"),
    //       hide: domainConfig[config.domain]?.hideTotalColumn as boolean,
    //     },
    //   ],
    // },
    {
      headerName: t("Foreign"),
      headerGroupComponentFramework: ToggleGroupHeader,
      headerGroupComponentParams: {
        iconHeader:
          indexCd !== "FUTURES" &&
          indexCd !== "HOSE" &&
          indexCd !== "Oddlot" &&
          indexCd !== "BUYIN" &&
          indexCd !== "HNX" &&
          indexCd !== "UPCOM" && //just apply for krx
          indexCd !== "ETF",
      },
      headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium`,
      children: [
        {
          colId: "fr-bvol",
          field: "FRG",
          headerName: t("Bought"),
          headerTooltip: t("Drag and drop to move column"),
          valueGetter: "data.FRG && data.FRG?.t30645",
          minWidth: 75,
          columnGroupShow: "closed",
          // headerClass: classNames("GroupHeader", "Header", "Highlight"),
          headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium`,
          cellClass: classNames("Cell", "Highlight"),
          valueFormatter: volumeFormatter,
          hide: indexCd === "CW",
        },
        {
          colId: "fr-bval",
          field: "FRG_Val",
          headerName: t("Bought"),
          headerTooltip: t("Drag and drop to move column"),
          valueGetter: "data.FRG && data.FRG?.t30643",
          minWidth: 75,
          headerClass: `relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium`,
          // headerClass: classNames("GroupHeader", "Header", "Highlight"),
          cellClass: classNames("Cell", "Highlight"),
          valueFormatter: quantityFormatter,
          hide: false,
        },
        // {
        //   colId: "fr-svol",
        //   field: "fr",
        //   headerName: t("Sold"),
        //   headerTooltip: t("Drag and drop to move column"),
        //   valueGetter: "data.fr && data.fr.sv",
        //   minWidth: 75,
        //   columnGroupShow: "closed",
        //   headerClass: classNames("GroupHeader", "Header", {
        //     ["Highlight"]:
        //       (domainConfig[config.domain]?.hideTotalColumn as boolean) ===
        //       false,
        //   }),
        //   cellClass: classNames("Cell", {
        //     ["Highlight"]:
        //       (domainConfig[config.domain]?.hideTotalColumn as boolean) ===
        //       false,
        //   }),
        //   valueFormatter: volumeFormatter,
        //   hide: indexCd === "CW",
        // },
        // {
        //   colId: "fr-sval",
        //   field: "fr",
        //   headerName: t("Sold"),
        //   headerTooltip: t("Drag and drop to move column"),
        //   valueGetter: "data.fr && data.fr.sv",
        //   minWidth: 75,
        //   headerClass: classNames("GroupHeader", "Header", {
        //     ["Highlight"]:
        //       (domainConfig[config.domain]?.hideTotalColumn as boolean) ===
        //       false,
        //   }),
        //   cellClass: classNames("Cell", {
        //     ["Highlight"]:
        //       (domainConfig[config.domain]?.hideTotalColumn as boolean) ===
        //       false,
        //   }),
        //   valueFormatter: quantityFormatter,
        //   hide: true,
        // },
        // {
        //   colId: "fr-cr",
        //   field: "fr",
        //   headerName: t("Room"),
        //   headerTooltip: t("Drag and drop to move column"),
        //   // cellRendererFramework: CustomTooltip,
        //   valueGetter: "data.fr && data.fr.cr",
        //   headerClass: classNames("GroupHeader", "Header", {
        //     ["Highlight"]:
        //       (domainConfig[config.domain]?.hideTotalColumn as boolean) ===
        //       false,
        //   }),
        //   cellClass: classNames("Cell", {
        //     ["Highlight"]:
        //       (domainConfig[config.domain]?.hideTotalColumn as boolean) ===
        //       false,
        //   }),
        //   minWidth: generateWidth(
        //     indexCd,
        //     80,
        //     !config.hideWhenKrx ? 80 : 54,
        //     80,
        //     46,
        //     74,
        //     80,
        //   ),
        //   maxWidth: generateWidth(
        //     indexCd,
        //     80,
        //     !config.hideWhenKrx ? 80 : 54,
        //     80,
        //     46,
        //     74,
        //     80,
        //   ),
        //   columnGroupShow:
        //     indexCd === "HOSE" ||
        //     indexCd === "ETF" ||
        //     indexCd === "Oddlot" ||
        //     (!config.hideWhenKrx && indexCd === "HNX") ||
        //     (!config.hideWhenKrx && indexCd === "UPCOM") ||
        //     (!config.hideWhenKrx && indexCd === "BUYIN")
        //       ? "closed"
        //       : "open",
        //   valueFormatter: quantityRoomNNFormatter(1),
        //   hide: indexCd === "CW",
        // },
      ],
    },
    // {
    //   headerName: t(domainConfig[config.domain]?.headerNameRemain as string),
    //   headerClass: `GroupHeader Header`,
    //   children: [
    //     {
    //       colId: "tb",
    //       field: "tb",
    //       headerName: t("Buy"),
    //       headerTooltip: t("Drag and drop to move column"),
    //       minWidth: 54,
    //       maxWidth: 54,
    //       headerClass: `GroupHeader Header Highlight`,
    //       cellClass: `Cell Highlight`,
    //       valueFormatter: quantityFormatter,
    //       hide:
    //         tab.selectedSubTab?.key === "BOND" ||
    //         (!config.hideWhenKrx && indexCd === "HNX") ||
    //         (!config.hideWhenKrx && indexCd === "UPCOM") ||
    //         (!config.hideWhenKrx && indexCd === "BUYIN") ||
    //         indexCd === "CW" ||
    //         indexCd === "FUTURES" ||
    //         indexCd === "HOSE" ||
    //         indexCd === "ETF" ||
    //         indexCd === "Oddlot",
    //     },
    //     {
    //       colId: "to",
    //       field: "to",
    //       headerName: t("Sell"),
    //       headerTooltip: t("Drag and drop to move column"),
    //       minWidth: 54,
    //       maxWidth: 54,
    //       headerClass: `GroupHeader Header Highlight`,
    //       cellClass: `Cell Highlight`,
    //       valueFormatter: quantityFormatter,
    //       hide:
    //         tab.selectedSubTab?.key === "BOND" ||
    //         (!config.hideWhenKrx && indexCd === "HNX") ||
    //         (!config.hideWhenKrx && indexCd === "UPCOM") ||
    //         (!config.hideWhenKrx && indexCd === "BUYIN") ||
    //         indexCd === "CW" ||
    //         indexCd === "FUTURES" ||
    //         indexCd === "HOSE" ||
    //         indexCd === "ETF" ||
    //         indexCd === "Oddlot",
    //     },
    //   ],
    // },
    // {
    //   colId: "cas",
    //   headerName: t("CA Status"),
    //   headerTooltip: t("Drag and drop to move column"),
    //   hide: true,
    // },
    // {
    //   colId: "ts",
    //   headerName: t("Trading Status"),
    //   headerTooltip: t("Drag and drop to move column"),
    //   hide: true,
    // },
    // {
    //   colId: "md",
    //   field: "md",
    //   headerName: t("Expire Date"),
    //   headerTooltip: t("Drag and drop to move column"),
    //   valueFormatter: dateFormatter,
    //   hide: indexCd !== "FUTURES",
    //   maxWidth: 74,
    //   minWidth: 74,
    // },
    // {
    //   colId: "basis",
    //   field: "ba",
    //   headerName: t("Basis"),
    //   headerTooltip: t("Drag and drop to move column"),
    //   // hide: indexCd !== 'Watchlist' && indexCd !== 'CW' && indexCd !== 'FUTURES',
    //   valueFormatter: priceFormatter,
    //   cellClassRules: basisClassRules,
    //   minWidth: 45,
    //   maxWidth: 45,
    //   hide: indexCd !== "FUTURES",
    // },
    // {
    //   colId: "exc",
    //   headerName: t("Exchg"),
    //   headerTooltip: t("Drag and drop to move column"),
    //   hide: true,
    // },
    // {
    //   colId: "open",
    //   headerName: t("Open"),
    //   headerTooltip: t("Drag and drop to move column"),
    //   hide: true,
    // },
    // {
    //   colId: "oi",
    //   field: "oi",
    //   headerName: t("OI"),
    //   valueFormatter: quantityFormatter,
    //   headerTooltip: t("Drag and drop to move column"),
    //   minWidth: 52,
    //   maxWidth: 52,
    //   hide: indexCd !== "FUTURES",
    // },
    // {
    //   colId: "sett",
    //   headerName: t("Sett"),
    //   headerTooltip: t("Drag and drop to move column"),
    //   // hide: indexCd !== 'Watchlist' && indexCd !== 'CW',
    //   hide: true,
    // },
    // {
    //   colId: "si",
    //   headerName: t("Shares Issued"),
    //   headerTooltip: t("Drag and drop to move column"),
    //   hide: true,
    // },
    // {
    //   colId: "tp",
    //   headerName: t("TP"),
    //   headerTooltip: t("Drag and drop to move column"),
    //   hide: true,
    // },
    // {
    //   headerName: t("Underlying"),
    //   headerClass: `GroupHeader Header`,
    //   children: [
    //     {
    //       field: "b",
    //       colId: "b",
    //       headerName: t("Stock"),
    //       headerClass: `GroupHeader Header`,
    //       headerTooltip: t("Drag and drop to move column"),
    //       hide: indexCd !== "CW",
    //       cellClass: `Cell TextAlign`,
    //       maxWidth: HEADER_MAX_WIDTH,
    //       minWidth: 45,
    //       cellClassRules: baseStockPriceClassRules,
    //     },
    //     {
    //       field: "bp",
    //       colId: "bp",
    //       valueGetter: baseStockClosePriceGetter,
    //       headerName: t("Price"),
    //       headerClass: `GroupHeader Header`,
    //       headerTooltip: t("Drag and drop to move column"),
    //       hide: indexCd !== "CW",
    //       maxWidth: HEADER_MAX_WIDTH,
    //       minWidth: 46,
    //       valueFormatter: priceFormatterIgnoreZero,
    //       cellClassRules: baseStockPriceClassRules,
    //     },
    //   ],
    // },
    // {
    //   colId: "exp",
    //   field: "exp",
    //   headerName: t("Strike"),
    //   headerTooltip: t("Drag and drop to move column"),
    //   hide: indexCd !== "CW",
    //   minWidth: PRICE_CELL_MIN_WIDTH,
    //   maxWidth: PRICE_CELL_MIN_WIDTH,
    //   valueFormatter: (params: ValueFormatterParams) =>
    //     (params.value / 1000).toString(),
    // },
    // {
    //   colId: "er",
    //   field: "er",
    //   headerName: t("C/R"),
    //   headerTooltip: t("Drag and drop to move column"),
    //   cellClass: `Cell TextAlign`,
    //   hide: indexCd !== "CW",
    //   minWidth: QUANTITY_CELL_MIN_WIDTH,
    //   maxWidth: QUANTITY_CELL_MIN_WIDTH,
    // },
    // // {
    // //   colId: 'be',
    // //   field: (domainConfig[config.domain]?.blankBreakData as boolean)
    // //     ? undefined
    // //     : 'be',
    // //   minWidth: 55,
    // //   maxWidth: 55,
    // //   headerName: t('Break'),
    // //   headerTooltip: t('Drag and drop to move column'),
    // //   valueFormatter: priceFormatterIgnoreZero,
    // //   hide: indexCd !== 'CW',
    // // },
    // {
    //   colId: "is",
    //   field: "is",
    //   headerName: t("Issuer"),
    //   headerTooltip: t("Drag and drop to move column"),
    //   cellClass: `Cell TextAlign`,
    //   minWidth: 44,
    //   maxWidth: 44,
    //   hide: indexCd !== "CW",
    // },
    // {
    //   field: "ltd",
    //   colId: "ltd",
    //   headerName: t("Maturity Date"),
    //   headerTooltip: t("Drag and drop to move column"),
    //   hide: indexCd !== "CW",
    //   cellClass: `Cell TextAlign`,
    //   valueFormatter: dateFormatter,
    //   maxWidth: 75,
    //   minWidth: 75,
    // },
    // {
    //   colId: "pe",
    //   field: "pe",
    //   headerName: t("% Premium"),
    //   headerTooltip: t("Drag and drop to move column"),
    //   valueFormatter: percentageFormatter,
    //   hide: true,
    // },
    // {
    //   colId: "eg",
    //   headerName: t("Gea"),
    //   headerTooltip: t("Drag and drop to move column"),
    //   hide: true,
    // },
    // {
    //   colId: "iv",
    //   headerName: t("I/V"),
    //   headerTooltip: t("Drag and drop to move column"),
    //   hide: true,
    // },
    // {
    //   colId: "del",
    //   headerName: t("Delta"),
    //   headerTooltip: t("Drag and drop to move column"),
    //   hide: true,
    // },
  ];
};
