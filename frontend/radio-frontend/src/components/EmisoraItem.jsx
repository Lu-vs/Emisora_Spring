import React, { useState } from 'react';

const EmisoraItem = ({ emisora, onEdit, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="emisora-card">
      <div className="emisora-header">
        <span className="emisora-icon">📻</span>
        <div className="emisora-title">
          <h3>{emisora.nombre}</h3>
          <span className="emisora-id">ID: {emisora.id}</span>
        </div>
        <div className="emisora-actions">
          <button 
            className="btn btn-edit" 
            onClick={() => onEdit(emisora)}
            title="Editar"
          >
            ✏️ Editar
          </button>
          <button 
            className="btn btn-delete" 
            onClick={() => onDelete(emisora.id)}
            title="Eliminar"
          >
            🗑️ Eliminar
          </button>
          <button 
            className="btn btn-info" 
            onClick={() => setShowDetails(!showDetails)}
            title="Ver detalles"
          >
            {showDetails ? '▲ Ocultar' : '▼ Ver más'}
          </button>
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

      {showDetails && (
        <div className="emisora-details">
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-icon">👥</span>
              <div>
                <label>Locutores</label>
                <span>{emisora.numLocutores}</span>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🎵</span>
              <div>
                <label>Programas</label>
                <span>{emisora.numProgramas}</span>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <div>
                <label>Ciudades</label>
                <span>{emisora.numCiudades}</span>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🕒</span>
              <div>
                <label>Horario</label>
                <span>{emisora.horario}</span>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🏢</span>
              <div>
                <label>Patrocinador</label>
                <span>{emisora.patrocinador}</span>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🌎</span>
              <div>
                <label>País</label>
                <span>{emisora.pais}</span>
              </div>
            </div>
          </div>
          
          {emisora.descripcion && (
            <div className="emisora-description">
              <h4>📝 Descripción:</h4>
              <p>{emisora.descripcion}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmisoraItem;
