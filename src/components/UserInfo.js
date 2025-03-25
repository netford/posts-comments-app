import React from 'react';

function UserInfo({ user }) {
  return (
    <div className="user-info">
      <div className="user-name">Автор: {user.name}</div>
      <div className="user-email">Email: {user.email}</div>
    </div>
  );
}

export default UserInfo;