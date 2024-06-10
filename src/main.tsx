import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainRoutes } from './routes/MainRoutes';
import './index.css';
import { UserStorage } from './context/authContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserStorage>
      <MainRoutes />
    </UserStorage>
  </React.StrictMode>,
);
