import React from 'react';

function SearchPanel({ searchTerm, sortOption, onSearch, onSort, totalPosts }) {
  return (
    <div className="search-panel">
      <div className="filters-row">
        <div className="search-container">
          <input
            type="text"
            placeholder="Поиск по заголовку, содержанию или автору..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search" 
              onClick={() => onSearch('')}
              aria-label="Очистить поиск"
            >
              ×
            </button>
          )}
        </div>
        
        <div className="sort-container">
          <span className="sort-label">Сортировка:</span>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => onSort(e.target.value)}
            className="sort-select"
          >
            <option value="default">По умолчанию</option>
            <option value="title">По заголовку (A-Я)</option>
            <option value="titleDesc">По заголовку (Я-A)</option>
            <option value="author">По автору</option>
            <option value="comments">По количеству комментариев</option>
          </select>
        </div>
      </div>
      
      <div className="results-info">
        Найдено постов: <strong>{totalPosts}</strong>
      </div>
    </div>
  );
}

export default SearchPanel;
