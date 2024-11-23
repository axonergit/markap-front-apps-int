import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`producto/buscar/${encodeURIComponent(query)}`); // Redirige a la nueva ruta
    }
  };

  return (
    <div className="flex justify-center justify-items-center">
      <input
        className=" m-2  input input-bordered input-warning w-full max-w-xs"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
      />
      <button className=" m-2 btn btn-accent" onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;
