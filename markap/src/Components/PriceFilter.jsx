import { useState } from 'react';

const PriceFilter = ({ onFilter }) => {
    const [precioMin, setprecioMin] = useState('');
    const [PrecioMax, setPrecioMax] = useState('');

    const handleFilter = () => {
        onFilter(precioMin, PrecioMax);
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">Filter by Price</h3>
            <div className="flex flex-col space-y-2">
                <input
                    type="number"
                    placeholder="Min Price"
                    value={precioMin}
                    onChange={(e) => setprecioMin(e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={PrecioMax}
                    onChange={(e) => setPrecioMax(e.target.value)}
                    className="p-2 border rounded"
                />
                <button
                    onClick={handleFilter}
                    className="bg-blue-500 text-neutral-content p-2 rounded hover:bg-blue-700"
                >
                    Apply Filter
                </button>
            </div>
        </div>
    );
};

export default PriceFilter;
