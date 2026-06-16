const API_URL = 'http://localhost:8080';

export async function login(username, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.developerMessage || 'Usuário ou senha inválidos.');
  }

  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('user', JSON.stringify(data));

  return data;
}

export async function refreshToken() {
  const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
    method: 'POST',
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('user', JSON.stringify(data));

  return data.accessToken;
}

export function logoutLocal() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
}