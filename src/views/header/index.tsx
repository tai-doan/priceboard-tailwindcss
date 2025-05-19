
const Header = () => {
    return (
        <div
            className="sticky inset-x-0 top-0 z-10 flex items-center justify-between w-full px-6 py-2 overflow-hidden bg-[#FFFFFF] dark:bg-dark-1 text-light-default dark:text-dark-default"
            style={{ height: 48 }}
        >
            <div className="flex items-center gap-20">
                <a href="#" />
                <div className="flex flex-1 gap-2 2xl:gap-12">
                    <div><a className="flex items-center gap-1.5 py-0.5 px-4 rounded-[20px] transition-all cursor-pointer min-w-max hover:bg-button-light-disabled/25 dark:hover:bg-button-dark-disabled/25" href="/e-board"><span className="w-full font-medium text-center text-body">Bảng giá</span></a></div>
                </div>
            </div>
            <div className="flex items-center justify-end flex-1 gap-4 mt-1">
                <div className="!h-[28px] text-[10px]">
                    <div className="rounded-md flex justify-center items-center px-2 bg-light-input dark:bg-dark-input border-[1px] border-neutral-12 dark:border-black text-neutral-1 dark:text-text-1 focus:border-primary-1 hover:border-primary-1  h-[36px] text-[14px] pointer-events-none max-w-[230px] !h-[28px] !text-[12px] float-right">
                        <span className="ant-input-prefix">
                            <svg className="text-neutral-3 dark:text-text-3" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02174 15.5435C12.6236 15.5435 15.5435 12.6236 15.5435 9.02174C15.5435 5.41988 12.6236 2.5 9.02174 2.5C5.41988 2.5 2.5 5.41988 2.5 9.02174C2.5 12.6236 5.41988 15.5435 9.02174 15.5435Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.5005 17.5005L13.6338 13.6338" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </span>
                        <input placeholder="Tìm kiếm cổ phiếu..." className="ant-input css-k8v86r" type="text" value="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
