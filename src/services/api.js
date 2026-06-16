import { refreshToken, logoutLocal } from './authService';

const API_URL = 'http://localhost:8080';

export async function apiFetch(endpoint, options = {}) {
  let token = localStorage.getItem('accessToken');

  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (response.status === 401) {
    try {
      token = await refreshToken();

      response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });
    } catch (error) {
      logoutLocal();
      window.location.href = '/login';
      throw error;
    }
  }

  return response;
}