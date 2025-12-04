import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";


import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { setCurrentUser } from './store/slices/authSlice.js';
import ErrorBoundary from '@components/common/ErrorBoundary/ErrorBoundary';

// Check for existing auth data in localStorage and restore it
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

if (token && user) {
  try {
    const parsedUser = JSON.parse(user);
    store.dispatch(setCurrentUser({ token, user: parsedUser }));
  } catch (error) {
    console.error('Error parsing stored user data:', error);
    // Clear invalid data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>
)
