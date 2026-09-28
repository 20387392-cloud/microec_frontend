import { useEffect, useState } from 'react';
import { apiFetch } from '../../api';

function HomePage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await apiFetch('/api/productos');

        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }

        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  if (cargando) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>MicroEc - Tienda en Línea</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}
      >
        {productos.map((producto) => (
          <div
            key={producto.id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              borderRadius: '8px',
            }}
          >
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            <p>
              Stock: {producto.existencia > 0 ? 'Disponible' : 'Agotado'}
            </p>
            <button disabled={producto.existencia === 0}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;