import React, { useState, useEffect } from 'react';
import { emisoraService } from '../services/api';
import EmisoraItem from './EmisoraItem';
import EmisoraForm from './EmisoraForm';

const EmisoraList = () => {
  const [emisoras, setEmisoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEmisora, setEditingEmisora] = useState(null);

  const fetchEmisoras = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await emisoraService.getAll();
      setEmisoras(data);
    } catch (err) {
      setError('Error al cargar las emisoras. Verifica que el servidor esté corriendo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmisoras();
  }, []);

  const handleCreate = async (emisoraData) => {
    try {
      await emisoraService.create(emisoraData);
      await fetchEmisoras();
      setShowForm(false);
    } catch (err) {
      setError('Error al crear la emisora');
    }
  };

  const handleUpdate = async (id, emisoraData) => {
    try {
      await emisoraService.update(id, emisoraData);
      await fetchEmisoras();
      setEditingEmisora(null);
      setShowForm(false);
    } catch (err) {
      setError('Error al actualizar la emisora');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta emisora?')) {
      try {
        await emisoraService.delete(id);
        await fetchEmisoras();
      } catch (err) {
        setError('Error al eliminar la emisora');
      }
    }
  };

  const handleEdit = (emisora) => {
    setEditingEmisora(emisora);
    setShowForm(true);
  };

  const handleSubmit = (emisoraData) => {
    if (editingEmisora) {
      handleUpdate(editingEmisora.id, emisoraData);
    } else {
      handleCreate(emisoraData);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <span className="spinner">⏳</span>
        <p>Cargando emisoras...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="list-header">
        <h2>Lista de Emisoras</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            setEditingEmisora(null);
            setShowForm(!showForm);
          }}
        >
          ➕ {showForm ? 'Ver Lista' : 'Nueva Emisora'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
          <button onClick={() => setError(null)} className="close-error">×</button>
        </div>
      )}

      {showForm ? (
        <EmisoraForm
          emisora={editingEmisora}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingEmisora(null);
          }}
        />
      ) : (
        <>
          <div className="stats">
            <div className="stat-card">
              <span className="stat-number">{emisoras.length}</span>
              <span className="stat-label">Emisoras Totales</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                {emisoras.reduce((sum, e) => sum + e.numLocutores, 0)}
              </span>
              <span className="stat-label">Locutores Totales</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                {emisoras.reduce((sum, e) => sum + e.numProgramas, 0)}
              </span>
              <span className="stat-label">Programas Totales</span>
            </div>
          </div>

          {emisoras.length === 0 ? (
            <div className="empty-state">
              <p>📭 No hay emisoras registradas. ¡Crea la primera!</p>
            </div>
          ) : (
            <div className="emisoras-grid">
              {emisoras.map((emisora) => (
                <EmisoraItem
                  key={emisora.id}
                  emisora={emisora}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmisoraList;
