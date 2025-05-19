export const PriceboardFooter = () => {
    return (
        <div className="fixed inset-x-0 bottom-0 z-10 flex items-center justify-center text-center bg-light-3 dark:bg-dark-2 text-outline">
            <p className="py-1">
                Giá x 1,000 VNĐ, Khối lượng x 10 cổ phiếu, Giá trị x 1,000,000 VNĐ.{" "}
                <span className="text-light-subtext-2 dark:text-dark-subtext-2 text-[11px]">
                    Bản quyền thuộc về © 2025
                </span>
            </p>
        </div>
    )
}
export default PriceboardFooter;
