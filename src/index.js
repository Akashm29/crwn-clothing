import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/user.context';
import { ProductsProvider } from './context/products.context';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <ProductsProvider>
       <App />
      </ProductsProvider>
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
