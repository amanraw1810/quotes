import React, { useState, useEffect } from 'react';
// import axios from 'axios';

function Pagination(totalItems, itemsPerPage, onPageChange) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        onPageChange(currentPage);
    }, [currentPage, onPageChange]);

    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPaginationLinks = () => {
        const links = [];
        for (let i = 1; i <= totalPages; i++) {
            links.push(
                <li key={i} className={i === currentPage ? 'active' : ''}>
                    <button onClick={() => handlePageClick(i)}>{i}</button>
                </li>
            );
        }
        return links;
    };

    return (
        <div>
            <ul className="pagination">
                {renderPaginationLinks()}
            </ul>
        </div>
    )
}

export default Pagination