import { SearchOutlined } from '@ant-design/icons';
import { Moon, Sun } from 'react-feather';
import logo from '../../assets/svg/LPBankS-dark.svg';
import { useAppStore } from '../../provider/app-store';

const Header = () => {
    const { toggleTheme, theme } = useAppStore();
    return (
        <div
            className="sticky inset-x-0 top-0 z-10 flex items-center justify-between w-full px-6 py-2 overflow-hidden bg-[#FFFFFF] dark:bg-dark-1 text-light-default dark:text-dark-default"
            style={{ height: 48 }}
        >
            <div className="flex items-center gap-10">
                <a href="/" className="flex items-center justify-start overflow-hidden w-[100px]">
                    <img alt="LPBankS" src={logo} className="" />
                </a>
                <div className="flex flex-1 gap-2 2xl:gap-12">
                    <div>
                        <a className="flex items-center gap-1.5 py-0.5 px-4 rounded-2xl transition-all cursor-pointer min-w-max hover:bg-button-light-disabled/25 dark:hover:bg-button-dark-disabled/25" href="/">
                            <span className="w-full font-medium text-center text-body">Bảng giá</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end flex-1 gap-4 mt-1">
                <div className="!h-[28px] text-[10px]">
                    <div className="rounded-md flex justify-center items-center px-2 bg-light-input dark:bg-dark-input border-[1px] border-neutral-12 dark:border-black text-neutral-1 dark:text-text-1 focus:border-primary-1 hover:border-primary-1  h-[36px] text-[14px] pointer-events-none max-w-[230px] !h-[28px] !text-[12px] float-right">
                        <span className="ant-input-prefix">
                            <SearchOutlined className="text-neutral-3 dark:text-text-3" />
                        </span>
                        <input placeholder="Tìm kiếm cổ phiếu..." className="" type="text" value="" />
                    </div>
                </div>
                <div className="flex">
                    {theme === 'dark'
                        ? <Moon className='cursor-pointer' size={20} onClick={() => toggleTheme()} />
                        : <Sun className='cursor-pointer' size={20} onClick={() => toggleTheme()} />
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;
