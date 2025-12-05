import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function AddEmisora() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    canal: 'FM',
    bandaFm: '',
    bandaAm: '',
    numLocutores: 0,
    genero: '',
    horario: '',
    patrocinador: '',
    pais: '',
    descripcion: '',
    numProgramas: 0,
    numCiudades: 0,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    if (name === 'canal') {
      setFormData({
        ...formData,
        canal: value,
        bandaFm: value === 'FM' ? formData.bandaFm : '',
        bandaAm: value === 'AM' ? formData.bandaAm : '',
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'number' ? (value === '' ? 0 : parseInt(value)) : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const postData = {
        nombre: formData.nombre,
        canal: formData.canal,
        bandaFm: formData.canal === 'FM' ? formData.bandaFm : '',
        bandaAm: formData.canal === 'AM' ? formData.bandaAm : '',
        numLocutores: formData.numLocutores || 0,
        genero: formData.genero,
        horario: formData.horario,
        patrocinador: formData.patrocinador,
        pais: formData.pais,
        descripcion: formData.descripcion,
        numProgramas: formData.numProgramas || 0,
        numCiudades: formData.numCiudades || 0,
      };
      
      console.log('Enviando datos POST:', postData);
      
      const response = await fetch('http://localhost:8080/emisoras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      const responseText = await response.text();
      console.log('Respuesta POST:', responseText);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${responseText}`);
      }
      
      setSuccess(true);
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      console.error('Error al agregar emisora:', err);
      setError(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Agregar Nueva Emisora</h1>
        <p className="page-subtitle">Completa el formulario para registrar una nueva emisora de radio</p>
      </div>
      
      {success ? (
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h2>¡Éxito!</h2>
          <p>La emisora se agregó correctamente.</p>
          <p>Redirigiendo a la lista...</p>
        </div>
      ) : (
        <div className="form-container">
          {error && (
            <div className="alert alert-error">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="add-emisora-form">
            <div className="form-grid">
              {/* Nombre - Requerido */}
              <div className="form-group">
                <label htmlFor="nombre" className="required">Nombre de la Emisora</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  placeholder="Ej: Radio Nacional"
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Canal */}
              <div className="form-group">
                <label htmlFor="canal">Canal</label>
                <select
                  id="canal"
                  name="canal"
                  value={formData.canal}
                  onChange={handleInputChange}
                  className="form-select"
                  disabled={isSubmitting}
                >
                  <option value="FM">FM</option>
                  <option value="AM">AM</option>
                </select>
              </div>
              
              {/* Banda FM (condicional) */}
              {formData.canal === 'FM' && (
                <div className="form-group">
                  <label htmlFor="bandaFm">Banda FM (MHz)</label>
                  <input
                    type="number"
                    id="bandaFm"
                    name="bandaFm"
                    value={formData.bandaFm}
                    onChange={handleInputChange}
                    step="0.1"
                    placeholder="Ej: 88.5"
                    className="form-input"
                    disabled={isSubmitting}
                  />
                </div>
              )}
              
              {/* Banda AM (condicional) */}
              {formData.canal === 'AM' && (
                <div className="form-group">
                  <label htmlFor="bandaAm">Banda AM (kHz)</label>
                  <input
                    type="number"
                    id="bandaAm"
                    name="bandaAm"
                    value={formData.bandaAm}
                    onChange={handleInputChange}
                    placeholder="Ej: 950"
                    className="form-input"
                    disabled={isSubmitting}
                  />
                </div>
              )}
              
              {/* Número de Locutores */}
              <div className="form-group">
                <label htmlFor="numLocutores">Número de Locutores</label>
                <input
                  type="number"
                  id="numLocutores"
                  name="numLocutores"
                  value={formData.numLocutores}
                  onChange={handleInputChange}
                  min="0"
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Género */}
              <div className="form-group">
                <label htmlFor="genero">Género Musical</label>
                <input
                  type="text"
                  id="genero"
                  name="genero"
                  value={formData.genero}
                  onChange={handleInputChange}
                  placeholder="Ej: Rock, Pop, Noticias, Deportes"
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Horario */}
              <div className="form-group">
                <label htmlFor="horario">Horario de Transmisión</label>
                <input
                  type="text"
                  id="horario"
                  name="horario"
                  value={formData.horario}
                  onChange={handleInputChange}
                  placeholder="Ej: 06:00 - 22:00, 24 horas"
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Patrocinador */}
              <div className="form-group">
                <label htmlFor="patrocinador">Patrocinador Principal</label>
                <input
                  type="text"
                  id="patrocinador"
                  name="patrocinador"
                  value={formData.patrocinador}
                  onChange={handleInputChange}
                  placeholder="Nombre del patrocinador"
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>
              
              {/* País */}
              <div className="form-group">
                <label htmlFor="pais">País</label>
                <input
                  type="text"
                  id="pais"
                  name="pais"
                  value={formData.pais}
                  onChange={handleInputChange}
                  placeholder="Ej: Colombia, México, España"
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Número de Programas */}
              <div className="form-group">
                <label htmlFor="numProgramas">Número de Programas</label>
                <input
                  type="number"
                  id="numProgramas"
                  name="numProgramas"
                  value={formData.numProgramas}
                  onChange={handleInputChange}
                  min="0"
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Número de Ciudades */}
              <div className="form-group">
                <label htmlFor="numCiudades">Número de Ciudades de Cobertura</label>
                <input
                  type="number"
                  id="numCiudades"
                  name="numCiudades"
                  value={formData.numCiudades}
                  onChange={handleInputChange}
                  min="0"
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            {/* Descripción */}
            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                rows="4"
                placeholder="Describe la emisora, su programación, audiencia objetivo, etc."
                className="form-textarea"
                disabled={isSubmitting}
              />
            </div>
            
            {/* Botones de Acción */}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/')}
                disabled={isSubmitting}
              >
                ← Volver a la Lista
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Guardando...
                  </>
                ) : (
                  'Guardar Emisora'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddEmisora;
