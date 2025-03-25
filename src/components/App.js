import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import '../App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="loading">Загрузка данных...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Просмотр постов и комментариев</h1>
      </header>
      <main className="app-content">
        <PostList posts={posts} users={users} comments={comments} />
      </main>
    </div>
  );
}

export default App;