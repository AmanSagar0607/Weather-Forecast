import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative mb-4 sm:mb-0 w-full sm:w-80">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for a city"
          className="w-full p-2 sm:p-3 pr-8 sm:pr-10 text-base sm:text-lg text-white bg-gray-900 border rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
        <button 
          type="submit" 
          className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none outline-none focus:outline-none hover:bg-transparent"
        >
          <FaSearch className="text-lg sm:text-xl text-white" />
        </button>
      </form>
      {/* Search suggestions */}
      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 text-black bg-white rounded-md mt-1 shadow-md z-10">
          <button
            onClick={handleSubmit}
            className="w-full p-2 text-left text-sm sm:text-base bg-white hover:bg-gray-100 transition duration-150 ease-in-out"
          >
            Search for &quot;{query}&quot;
          </button>
        </div>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;