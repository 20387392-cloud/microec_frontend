const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/**
 * Función centralizada para hacer peticiones HTTP.
 * @param {string} endpoint Ruta del endpoint, por ejemplo: '/api/productos'.
 * @param {object} options Opciones de fetch: method, body, headers, etc.
 * @returns {Promise<Response>} Respuesta del servidor.
 */
export async function apiFetch(endpoint, options = {}) {
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  };

  if (options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (response.status === 401) {
      console.log('Sesión expirada o no autenticado');
    }

    return response;
  } catch (error) {
    console.error('Error en la petición a la API:', error);
    throw error;
  }
}