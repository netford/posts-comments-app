import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import SearchPanel from './SearchPanel';
import '../App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Состояния для поиска и сортировки
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    // Загружаем данные сразу при монтировании компонента
    const fetchData = async () => {
      setLoading(true);
      try {
        // Загружаем все данные параллельно
        const [postsResponse, usersResponse, commentsResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/posts'),
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/comments')
        ]);

        // Проверяем успешность ответа
        if (!postsResponse.ok || !usersResponse.ok || !commentsResponse.ok) {
          throw new Error('Ошибка при загрузке данных');
        }

        // Преобразуем ответы в JSON
        const postsData = await postsResponse.json();
        const usersData = await usersResponse.json();
        const commentsData = await commentsResponse.json();

        // Устанавливаем данные в состояние
        setPosts(postsData);
        setUsers(usersData);
        setComments(commentsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Фильтрация постов по поисковому запросу
  const filteredPosts = posts.filter(post => {
    if (!searchTerm.trim()) return true;
    
    const user = users.find(user => user.id === post.userId);
    const userInfo = user ? `${user.name} ${user.email}` : '';
    
    return (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userInfo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Сортировка отфильтрованных постов
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortOption) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'titleDesc':
        return b.title.localeCompare(a.title);
      case 'author':
        const userA = users.find(user => user.id === a.userId);
        const userB = users.find(user => user.id === b.userId);
        return userA?.name.localeCompare(userB?.name || '');
      case 'comments':
        const commentsA = comments.filter(comment => comment.postId === a.id).length;
        const commentsB = comments.filter(comment => comment.postId === b.id).length;
        return commentsB - commentsA;
      default:
        return a.id - b.id;
    }
  });

  // Пагинация
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  // Функции для управления состоянием
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Сброс на первую страницу при поиске
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Скроллим страницу вверх при смене страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div className="loading">Загрузка данных...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Просмотр постов и комментариев</h1>
      </header>
      
      <SearchPanel 
        searchTerm={searchTerm}
        sortOption={sortOption}
        onSearch={handleSearch}
        onSort={handleSort}
        totalPosts={filteredPosts.length}
      />
      
      <main className="app-content">
        <PostList 
          posts={currentPosts} 
          users={users} 
          comments={comments} 
        />
        
        {/* Пагинация */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              className="page-button"
            >
              &laquo; Пред.
            </button>
            
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(pageNum => (
                  pageNum === 1 || 
                  pageNum === totalPages || 
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ))
                .reduce((acc, pageNum, idx, array) => {
                  if (idx > 0 && pageNum - array[idx - 1] > 1) {
                    acc.push(<span key={`ellipsis-${pageNum}`} className="ellipsis">...</span>);
                  }
                  acc.push(
                    <button 
                      key={pageNum} 
                      onClick={() => handlePageChange(pageNum)}
                      className={`page-number ${currentPage === pageNum ? 'active' : ''}`}
                    >
                      {pageNum}
                    </button>
                  );
                  return acc;
                }, [])
              }
            </div>
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="page-button"
            >
              След. &raquo;
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;