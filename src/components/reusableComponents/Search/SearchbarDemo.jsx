"use client";

import { useState } from 'react';
import SearchBar from '../Search/Searchbar';

/**
 * Demo component showcasing different SearchBar implementations
 * @component
 * @returns {JSX.Element} SearchBarDemo component
 * @example
 * <SearchBarDemo />
 */
const SearchBarDemo = () => {
  const [searchQueries, setSearchQueries] = useState({
    basic: '',
    controlled: '',
    results: []
  });

  const [searchHistory, setSearchHistory] = useState([]);

  /**
   * Handle basic search
   * @function
   * @param {string} query - Search query
   */
  const handleBasicSearch = (query) => {
    console.log('Basic search:', query);
    if (query.trim()) {
      setSearchHistory(prev => [
        { id: Date.now(), query, timestamp: new Date().toLocaleTimeString() },
        ...prev.slice(0, 4) // Keep only last 5 searches
      ]);
    }
  };

  /**
   * Handle controlled search input change
   * @function
   * @param {Event} event - Input change event
   */
  const handleControlledChange = (event) => {
    const query = event.target.value;
    setSearchQueries(prev => ({
      ...prev,
      controlled: query
    }));

    // Mock search results
    if (query.trim()) {
      const mockResults = [
        `${query} - Documentation`,
        `${query} - Tutorial`,
        `${query} - Examples`,
        `${query} - API Reference`,
        `${query} - Best Practices`
      ].filter(result => 
        result.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchQueries(prev => ({
        ...prev,
        results: mockResults.slice(0, 3)
      }));
    } else {
      setSearchQueries(prev => ({
        ...prev,
        results: []
      }));
    }
  };

  /**
   * Handle controlled search
   * @function
   * @param {string} query - Search query
   */
  const handleControlledSearch = (query) => {
    console.log('Controlled search executed:', query);
  };

  /**
   * Clear search history
   * @function
   */
  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            SearchBar Component Demo
          </h1>
          <p className="text-gray-600 text-lg">
            Reusable search components with various configurations
          </p>
        </div>

        {/* Basic SearchBar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Basic SearchBar
          </h2>
          <SearchBar
            placeholder="Search anything..."
            onSearch={handleBasicSearch}
            className="mb-4"
          />
          <p className="text-gray-600 text-sm">
            Basic search with default settings. Type and press Enter or click the search icon.
          </p>
        </div>

        {/* Different Sizes */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Different Sizes
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Small Size
              </label>
              <SearchBar
                placeholder="Small search..."
                size="sm"
                onSearch={(q) => console.log('Small search:', q)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medium Size (Default)
              </label>
              <SearchBar
                placeholder="Medium search..."
                size="md"
                onSearch={(q) => console.log('Medium search:', q)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Large Size
              </label>
              <SearchBar
                placeholder="Large search..."
                size="lg"
                onSearch={(q) => console.log('Large search:', q)}
              />
            </div>
          </div>
        </div>

        {/* Controlled SearchBar with Live Results */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Controlled SearchBar with Live Results
          </h2>
          <SearchBar
            placeholder="Type to see live results..."
            value={searchQueries.controlled}
            onChange={handleControlledChange}
            onSearch={handleControlledSearch}
            debounceMs={200}
            className="mb-4"
          />
          
          {/* Live Results */}
          {searchQueries.results.length > 0 && (
            <div className="border border-gray-200 rounded-md">
              <div className="p-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">
                  Search Results ({searchQueries.results.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {searchQueries.results.map((result, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <p className="text-gray-800">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Configuration Variants */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Configuration Variants
          </h2>
          <div className="space-y-6">
            
            {/* No Icons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Without Icons
              </label>
              <SearchBar
                placeholder="No search or clear icons"
                showSearchIcon={false}
                showClearButton={false}
                onSearch={(q) => console.log('No icons search:', q)}
              />
            </div>

            {/* Auto Focus */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auto Focus (refresh page to see effect)
              </label>
              <SearchBar
                placeholder="Auto-focused search..."
                autoFocus={true}
                onSearch={(q) => console.log('Auto focus search:', q)}
              />
            </div>

            {/* Disabled */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Disabled State
              </label>
              <SearchBar
                placeholder="Disabled search..."
                disabled={true}
                onSearch={(q) => console.log('Disabled search:', q)}
              />
            </div>

            {/* No Debounce */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No Debounce (Instant Search)
              </label>
              <SearchBar
                placeholder="Instant search (no debounce)..."
                debounceMs={0}
                onSearch={(q) => console.log('Instant search:', q)}
              />
            </div>
          </div>
        </div>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Recent Searches
              </h2>
              <button
                onClick={clearHistory}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Clear History
              </button>
            </div>
            <div className="space-y-2">
              {searchHistory.map((search) => (
                <div
                  key={search.id}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                >
                  <span className="text-gray-800">{search.query}</span>
                  <span className="text-xs text-gray-500">{search.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBarDemo;