import IndexGroup from "./index-group";

const OverviewIndex = () => {
    return (
        <div className="flex justify-between gap-4 px-3 pt-2 overflow-hidden text-caption text-light-default dark:text-dark-default">
            <div className="flex gap-2.5 overflow-x-auto snap-x mac-scrollbar">
                <IndexGroup />
                <IndexGroup />
                <IndexGroup />
                <IndexGroup />
            </div>
            <div className="hidden overflow-x-auto snap-x mac-scrollbar lg:block">
                <table className="min-w-full border-separate divide-y divide-v3-line-light-1 dark:divide-dark-line text-outline 2xl:text-caption border-spacing-0">
                    <thead>
                        <tr>
                            <th className="relative px-1 py-1 font-normal duration-150 border border-l-0 cursor-pointer select-none first:sticky first:left-0 first:z-10 group hover:text-light-primary-hover dark:hover:text-dark-primary-hover whitespace-nowrap 2xl:px-2 text-caption first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 60 }}>
                                <div className="flex items-center justify-center gap-1">Chỉ số </div>
                            </th>
                            <th className="relative px-1 py-1 font-normal duration-150 border border-l-0 cursor-pointer select-none first:sticky first:left-0 first:z-10 group hover:text-light-primary-hover dark:hover:text-dark-primary-hover whitespace-nowrap 2xl:px-2 text-caption first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 60 }}>
                                <div className="flex items-center justify-center gap-1">Điểm </div>
                            </th>
                            <th className="relative px-1 py-1 font-normal duration-150 border border-l-0 cursor-pointer select-none first:sticky first:left-0 first:z-10 group hover:text-light-primary-hover dark:hover:text-dark-primary-hover whitespace-nowrap 2xl:px-2 text-caption first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 60 }}>
                                <div className="flex items-center justify-center gap-1">
                                    <div className="flex items-center justify-center gap-1"><button className="absolute inset-y-0 flex items-center justify-center p-1 text-light-secondary dark:text-dark-secondary hover:text-light-primary-hover dark:hover:text-dark-primary-hover left-1"><svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6 5.56858C6 6.4619 4.91786 6.90696 4.28936 6.27213L2.70359 4.67039C2.31501 4.2779 2.3182 3.64472 2.71071 3.25616L4.29648 1.68636C4.92789 1.06131 6 1.50857 6 2.39704V5.56858Z" fill="currentColor"></path>
                                    </svg></button><span className="cursor-pointer">+/-</span><button className="absolute inset-y-0 flex items-center justify-center p-1 text-light-secondary dark:text-dark-secondary hover:text-light-primary-hover dark:hover:text-dark-primary-hover right-1"><svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M2 5.56858C2 6.4619 3.08214 6.90696 3.71064 6.27213L5.29641 4.67039C5.68499 4.2779 5.6818 3.64472 5.28929 3.25616L3.70352 1.68636C3.07211 1.06131 2 1.50857 2 2.39704L2 5.56858Z" fill="currentColor"></path>
                                    </svg></button></div>
                                </div>
                            </th>
                            <th className="relative px-1 py-1 font-normal duration-150 border border-l-0 cursor-pointer select-none first:sticky first:left-0 first:z-10 group hover:text-light-primary-hover dark:hover:text-dark-primary-hover whitespace-nowrap 2xl:px-2 text-caption first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 80 }}>
                                <div className="flex items-center justify-center gap-1">KLGD </div>
                            </th>
                            <th className="relative px-1 py-1 font-normal duration-150 border border-l-0 cursor-pointer select-none first:sticky first:left-0 first:z-10 group hover:text-light-primary-hover dark:hover:text-dark-primary-hover whitespace-nowrap 2xl:px-2 text-caption first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 85 }}>
                                <div className="flex items-center justify-center gap-1">GTGD </div>
                            </th>
                            <th className="relative px-1 py-1 font-normal duration-150 border border-l-0 first:sticky first:left-0 first:z-10 group hover:text-light-primary-hover dark:hover:text-dark-primary-hover whitespace-nowrap 2xl:px-2 text-caption first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 135 }}>
                                <div className="flex items-center justify-center gap-1">Số CK Tăng/Giảm </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-v3-line-light-1 dark:divide-dark-line">
                        <tr className="bg-light-1 dark:bg-dark-1 odd:bg-light-3 dark:odd:bg-dark-3">
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 60 }}>VNINDEX</td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 60 }}><span className="text-light-price-down dark:text-dark-price-down">1,301.39</span></td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 60 }}><span className="text-light-price-down dark:text-dark-price-down">-11.81</span></td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 80 }}>895.1 triệu</td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 85 }}>20,340.5 tỷ</td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 135 }}>
                                <div className="grid grid-cols-3 gap-1 2xl:gap-2">
                                    <div className="grid items-center grid-cols-5 2xl:gap-1 text-light-price-up dark:text-dark-price-up"><span className="col-span-2"><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Group 7912">
                                            <path id="Vector" d="M1.45898 4.58203L4.9998 1.0412L8.54063 4.58203" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path id="Vector_2" d="M5 10.958L5 1.14051" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </g>
                                    </svg></span>
                                        <div className="col-span-3 text-center">132</div>
                                    </div>
                                    <div className="grid items-center w-full grid-cols-5 2xl:gap-1">
                                        <div className="w-2 h-2 col-span-2 rounded-full bg-light-chart-yellow dark:bg-dark-chart-yellow"></div>
                                        <div className="col-span-3 text-center">46</div>
                                    </div>
                                    <div className="-ml-1.5 grid grid-cols-5 2xl:gap-1 items-center text-light-price-down dark:text-dark-price-down"><span className="col-span-2"><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Group 7912">
                                            <path id="Vector" d="M8.54077 7.41797L4.99996 10.9588L1.45912 7.41797" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path id="Vector_2" d="M5 1.04199L5 10.8595" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </g>
                                    </svg></span>
                                        <div className="col-span-3 text-center">186</div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-light-1 dark:bg-dark-1 odd:bg-light-3 dark:odd:bg-dark-3">
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 60 }}>VN30</td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 60 }}><span className="text-light-price-down dark:text-dark-price-down">1,384.44</span></td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 60 }}><span className="text-light-price-down dark:text-dark-price-down">-17.05</span></td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 80 }}>336.6 triệu</td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 85 }}>9,988.7 tỷ</td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 135 }}>
                                <div className="grid grid-cols-3 gap-1 2xl:gap-2">
                                    <div className="grid items-center grid-cols-5 2xl:gap-1 text-light-price-up dark:text-dark-price-up"><span className="col-span-2"><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Group 7912">
                                            <path id="Vector" d="M1.45898 4.58203L4.9998 1.0412L8.54063 4.58203" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path id="Vector_2" d="M5 10.958L5 1.14051" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </g>
                                    </svg></span>
                                        <div className="col-span-3 text-center">4</div>
                                    </div>
                                    <div className="grid items-center w-full grid-cols-5 2xl:gap-1">
                                        <div className="w-2 h-2 col-span-2 rounded-full bg-light-chart-yellow dark:bg-dark-chart-yellow"></div>
                                        <div className="col-span-3 text-center">2</div>
                                    </div>
                                    <div className="-ml-1.5 grid grid-cols-5 2xl:gap-1 items-center text-light-price-down dark:text-dark-price-down"><span className="col-span-2"><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Group 7912">
                                            <path id="Vector" d="M8.54077 7.41797L4.99996 10.9588L1.45912 7.41797" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path id="Vector_2" d="M5 1.04199L5 10.8595" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </g>
                                    </svg></span>
                                        <div className="col-span-3 text-center">24</div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-light-1 dark:bg-dark-1 odd:bg-light-3 dark:odd:bg-dark-3">
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 60 }}>HNX-INDEX</td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 60 }}><span className="text-light-price-down dark:text-dark-price-down">218.69</span></td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 60 }}><span className="text-light-price-down dark:text-dark-price-down">-0.59</span></td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 80 }}>81.2 triệu</td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 85 }}>1,145.6 tỷ</td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 135 }}>
                                <div className="grid grid-cols-3 gap-1 2xl:gap-2">
                                    <div className="grid items-center grid-cols-5 2xl:gap-1 text-light-price-up dark:text-dark-price-up"><span className="col-span-2"><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Group 7912">
                                            <path id="Vector" d="M1.45898 4.58203L4.9998 1.0412L8.54063 4.58203" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path id="Vector_2" d="M5 10.958L5 1.14051" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </g>
                                    </svg></span>
                                        <div className="col-span-3 text-center">60</div>
                                    </div>
                                    <div className="grid items-center w-full grid-cols-5 2xl:gap-1">
                                        <div className="w-2 h-2 col-span-2 rounded-full bg-light-chart-yellow dark:bg-dark-chart-yellow"></div>
                                        <div className="col-span-3 text-center">55</div>
                                    </div>
                                    <div className="-ml-1.5 grid grid-cols-5 2xl:gap-1 items-center text-light-price-down dark:text-dark-price-down"><span className="col-span-2"><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Group 7912">
                                            <path id="Vector" d="M8.54077 7.41797L4.99996 10.9588L1.45912 7.41797" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path id="Vector_2" d="M5 1.04199L5 10.8595" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </g>
                                    </svg></span>
                                        <div className="col-span-3 text-center">103</div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-light-1 dark:bg-dark-1 odd:bg-light-3 dark:odd:bg-dark-3">
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 60 }}>UPCOM</td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 60 }}><span className="text-light-price-down dark:text-dark-price-down">95.5</span></td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 60 }}><span className="text-light-price-down dark:text-dark-price-down">-0.04</span></td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 80 }}>76.5 triệu</td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 85 }}>562.8 tỷ</td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 135 }}>
                                <div className="grid grid-cols-3 gap-1 2xl:gap-2">
                                    <div className="grid items-center grid-cols-5 2xl:gap-1 text-light-price-up dark:text-dark-price-up"><span className="col-span-2"><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Group 7912">
                                            <path id="Vector" d="M1.45898 4.58203L4.9998 1.0412L8.54063 4.58203" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path id="Vector_2" d="M5 10.958L5 1.14051" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </g>
                                    </svg></span>
                                        <div className="col-span-3 text-center">164</div>
                                    </div>
                                    <div className="grid items-center w-full grid-cols-5 2xl:gap-1">
                                        <div className="w-2 h-2 col-span-2 rounded-full bg-light-chart-yellow dark:bg-dark-chart-yellow"></div>
                                        <div className="col-span-3 text-center">127</div>
                                    </div>
                                    <div className="-ml-1.5 grid grid-cols-5 2xl:gap-1 items-center text-light-price-down dark:text-dark-price-down"><span className="col-span-2"><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Group 7912">
                                            <path id="Vector" d="M8.54077 7.41797L4.99996 10.9588L1.45912 7.41797" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path id="Vector_2" d="M5 1.04199L5 10.8595" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </g>
                                    </svg></span>
                                        <div className="col-span-3 text-center">156</div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-light-1 dark:bg-dark-1 odd:bg-light-3 dark:odd:bg-dark-3">
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 60 }}>HNX30</td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 60 }}><span className="text-light-price-down dark:text-dark-price-down">435.4</span></td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 60 }}><span className="text-light-price-down dark:text-dark-price-down">-4.3</span></td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 80 }}>39.1 triệu</td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 85 }}>792.1 tỷ</td>
                            <td className="px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-3 dark:bg-dark-3" style={{ width: 135 }}>
                                <div className="grid grid-cols-3 gap-1 2xl:gap-2">
                                    <div className="grid items-center grid-cols-5 2xl:gap-1 text-light-price-up dark:text-dark-price-up"><span className="col-span-2"><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Group 7912">
                                            <path id="Vector" d="M1.45898 4.58203L4.9998 1.0412L8.54063 4.58203" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path id="Vector_2" d="M5 10.958L5 1.14051" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </g>
                                    </svg></span>
                                        <div className="col-span-3 text-center">2</div>
                                    </div>
                                    <div className="grid items-center w-full grid-cols-5 2xl:gap-1">
                                        <div className="w-2 h-2 col-span-2 rounded-full bg-light-chart-yellow dark:bg-dark-chart-yellow"></div>
                                        <div className="col-span-3 text-center">8</div>
                                    </div>
                                    <div className="-ml-1.5 grid grid-cols-5 2xl:gap-1 items-center text-light-price-down dark:text-dark-price-down"><span className="col-span-2"><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Group 7912">
                                            <path id="Vector" d="M8.54077 7.41797L4.99996 10.9588L1.45912 7.41797" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path id="Vector_2" d="M5 1.04199L5 10.8595" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </g>
                                    </svg></span>
                                        <div className="col-span-3 text-center">20</div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OverviewIndex;
