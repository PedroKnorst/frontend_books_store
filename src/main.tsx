import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainRoutes } from './routes/MainRoutes';
import './index.css';
import { UserStorage } from './context/authContext';
import { CartStorage } from './context/cartContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserStorage>
      <CartStorage>
        <MainRoutes />
      </CartStorage>
    </UserStorage>
  </React.StrictMode>,
);
