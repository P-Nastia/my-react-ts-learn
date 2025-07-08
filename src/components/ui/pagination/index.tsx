const CustomPagination: React.FC<{
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const getPageNumbers = (): ({ type: 'page' | 'ellipsis', value: number | string })[] => {
        const pages: ({ type: 'page' | 'ellipsis', value: number | string })[] = [];

        if (totalPages <= 9) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push({ type: 'page', value: i });
            }
        } else {
            const startPage = Math.max(2, currentPage - 2);
            const endPage = Math.min(totalPages - 1, currentPage + 2);

            pages.push({ type: 'page', value: 1 });

            if (startPage > 2) {
                const jumpTo = Math.floor((1 + startPage) / 2);
                pages.push({ type: 'ellipsis', value: jumpTo });
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push({ type: 'page', value: i });
            }

            if (endPage < totalPages - 1) {
                const jumpTo = Math.floor((endPage + totalPages) / 2);
                pages.push({ type: 'ellipsis', value: jumpTo });
            }

            pages.push({ type: 'page', value: totalPages });
        }

        return pages;
    };

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pageItems = getPageNumbers();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}></button>

            {pageItems.map((item, index) =>
                item.type === 'page' ? (
                    <button
                        key={`page-${item.value}`}
                        onClick={() => onPageChange(Number(item.value))}
                        style={{
                            fontWeight: item.value === currentPage ? 'bold' : 'normal',
                            backgroundColor: item.value === currentPage ? 'rgba(233, 148, 0, 63)' : 'white',
                            color: item.value === currentPage ? 'white' : 'black',
                            padding: '4px 8px',
                            border: '1px solid #ccc',
                            borderRadius: 4,
                        }}
                    >
                        {item.value}
                    </button>
                ) : (
                    <button
                        key={`ellipsis-${index}`}
                        onClick={() => onPageChange(Number(item.value))}
                        style={{
                            padding: '4px 8px',
                            border: '1px solid #ccc',
                            borderRadius: 4,
                            backgroundColor: '#f9f9f9',
                            color: '#555',
                            cursor: 'pointer',
                        }}
                    >
                        ...
                    </button>
                )
            )}

            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}> </button>
        </div>
    );
};

export default CustomPagination;