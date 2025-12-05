import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function App() {
  const [emisoras, setEmisoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmisoras = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:8080/emisoras', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const text = await response.text();
      const data = JSON.parse(text);
      
      setEmisoras(Array.isArray(data) ? data : []);
      
    } catch (err) {
      console.error('Error fetching emisoras:', err);
      setError(`Error: ${err.message}`);
      
      // Datos de prueba si falla
      const datosPrueba = [
        {
          "id": 17,
          "nombre": "la anti reina",
          "canal": "2",
          "bandaFm": "",
          "bandaAm": "55.9",
          "numLocutores": 6,
          "genero": "lectura",
          "horario": "12:00 - 6:00",
          "patrocinador": "saviloe",
          "pais": "colombia",
          "descripcion": "la reina pero alrvez",
          "numProgramas": 5,
          "numCiudades": 15
        }
      ];
      setEmisoras(datosPrueba);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmisoras();
  }, []);


// Agrega esta función después de fetchEmisoras en App.jsx
const handleDeleteEmisora = async (id) => {
  if (!window.confirm('¿Estás seguro de que quieres eliminar esta emisora?')) {
    return;
  }

  try {
    console.log(`Eliminando emisora con ID: ${id}`);
    
    const response = await fetch(`http://localhost:8080/emisoras/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    const responseText = await response.text();
    console.log('Respuesta DELETE:', responseText);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${responseText}`);
    }
    
    // Si fue exitoso, actualizar la lista
    fetchEmisoras();
    
    // Mostrar mensaje de éxito
    alert('Emisora eliminada correctamente');
    
  } catch (err) {
    console.error('Error al eliminar emisora:', err);
    alert(`Error al eliminar: ${err.message}`);
    
    // Para pruebas: eliminar localmente si la API falla
    setEmisoras(prev => prev.filter(e => e.id !== id));
  }
};



  if (loading) {
    return (
      <div className="container">
        <div style={{textAlign: 'center', padding: '50px'}}>
          <div style={{fontSize: '3em'}}>⏳</div>
          <p>Cargando emisoras...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div style={{textAlign: 'center', padding: '50px', color: '#d32f2f'}}>
          <div style={{fontSize: '3em'}}>⚠️</div>
          <h3>Error</h3>
          <p>{error}</p>
          <button 
            onClick={fetchEmisoras}
            style={{
              padding: '10px 20px',
              background: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="list-header">
        <h2>Lista de Emisoras ({emisoras.length})</h2>
        <Link to="/agregar" className="btn btn-primary">
          ➕ Nueva Emisora
        </Link>
      </div>
      
      <div className="stats">
        <div className="stat-card">
          <span className="stat-number">{emisoras.length}</span>
          <span className="stat-label">Emisoras Totales</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {emisoras.reduce((sum, e) => sum + (e.numLocutores || 0), 0)}
          </span>
          <span className="stat-label">Locutores Totales</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {emisoras.reduce((sum, e) => sum + (e.numProgramas || 0), 0)}
          </span>
          <span className="stat-label">Programas Totales</span>
        </div>
      </div>
      
      {emisoras.length === 0 ? (
        <div className="empty-state">
          <p>📭 No hay emisoras registradas</p>
          <Link to="/agregar" className="btn btn-primary mt-3">
            Agregar Primera Emisora
          </Link>
        </div>
      ) : (
        <div className="emisoras-grid">
          {emisoras.map((emisora) => (
            <div key={emisora.id} className="emisora-card">
              <div className="emisora-header">
                <span className="emisora-icon">📻</span>
                <div className="emisora-title">
                  <h3>{emisora.nombre}</h3>
                  <span className="emisora-id">ID: {emisora.id}</span>
                </div>
              </div>
              
              <div className="emisora-basic-info">
                <div className="info-item">
                  <strong>Canal:</strong> {emisora.canal}
                </div>
                <div className="info-item">
                  <strong>Frecuencia:</strong> 
                  {emisora.bandaFm && ` FM ${emisora.bandaFm}`}
                  {emisora.bandaAm && ` AM ${emisora.bandaAm}`}
                </div>
                <div className="info-item">
                  <strong>País:</strong> {emisora.pais}
                </div>
                <div className="info-item">
                  <strong>Género:</strong> {emisora.genero}
                </div>
              </div>
              
              <div className="emisora-description">
                <p>{emisora.descripcion}</p>
              </div>
              
              <div className="emisora-actions">
               <Link to={`/editar/${emisora.id}`} className="btn btn-small btn-outline">
               ✏️ Editar
               </Link>
		  <button 
    		onClick={() => handleDeleteEmisora(emisora.id)}
    		className="btn btn-small btn-danger"
  		>
    		🗑️ Eliminar
              </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
