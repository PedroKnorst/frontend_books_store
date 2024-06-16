import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainRoutes } from './routes/MainRoutes';
import './index.css';
import { UserStorage } from './context/authContext';
import { MessageStorage } from './context/messageContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MessageStorage>
      <UserStorage>
        <MainRoutes />
      </UserStorage>
    </MessageStorage>
  </React.StrictMode>,
);
