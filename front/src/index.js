import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import {QueryClient, QueryClientProvider} from "react-query";
import AuthProvider from "./provider/AuthProvider";

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <AuthProvider/>
        </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

