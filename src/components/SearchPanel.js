import React from 'react';

function SearchPanel({ searchTerm, sortOption, onSearch, onSort, totalPosts }) {
  return (
    <div className="search-panel">
      <div className="search-row">
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
      
      <div className="filters-info-row">
        <div className="sort-container">
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => onSort(e.target.value)}
            className="sort-select"
          >
            <option value="default">Сортировка: По умолчанию</option>
            <option value="title">Сортировка: По заголовку (A-Я)</option>
            <option value="titleDesc">Сортировка: По заголовку (Я-A)</option>
            <option value="author">Сортировка: По автору</option>
            <option value="comments">Сортировка: По количеству комментариев</option>
          </select>
        </div>

        <div className="results-info">
          Найдено постов: <strong>{totalPosts}</strong>
        </div>
      </div>
    </div>
  );
}

export default SearchPanel;