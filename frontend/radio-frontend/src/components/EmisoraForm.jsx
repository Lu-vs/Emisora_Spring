import React, { useState, useEffect } from 'react';

const EmisoraForm = ({ emisora, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    canal: '',
    bandaFm: '',
    bandaAm: '',
    numLocutores: 1,
    genero: '',
    horario: '',
    patrocinador: '',
    pais: '',
    descripcion: '',
    numProgramas: 1,
    numCiudades: 1,
  });

  useEffect(() => {
    if (emisora) {
      setFormData({
        nombre: emisora.nombre || '',
        canal: emisora.canal || '',
        bandaFm: emisora.bandaFm || '',
        bandaAm: emisora.bandaAm || '',
        numLocutores: emisora.numLocutores || 1,
        genero: emisora.genero || '',
        horario: emisora.horario || '',
        patrocinador: emisora.patrocinador || '',
        pais: emisora.pais || '',
        descripcion: emisora.descripcion || '',
        numProgramas: emisora.numProgramas || 1,
        numCiudades: emisora.numCiudades || 1,
      });
    }
  }, [emisora]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2>{emisora ? 'Editar Emisora' : 'Nueva Emisora'}</h2>
      <form onSubmit={handleSubmit} className="emisora-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Ej: La Reina"
            />
          </div>

          <div className="form-group">
            <label>Canal *</label>
            <input
              type="text"
              name="canal"
              value={formData.canal}
              onChange={handleChange}
              required
              placeholder="Ej: FM, AM, Online"
            />
          </div>

          <div className="form-group">
            <label>Frecuencia FM</label>
            <input
              type="text"
              name="bandaFm"
              value={formData.bandaFm}
              onChange={handleChange}
              placeholder="Ej: 95.5"
            />
          </div>

          <div className="form-group">
            <label>Frecuencia AM</label>
            <input
              type="text"
              name="bandaAm"
              value={formData.bandaAm}
              onChange={handleChange}
              placeholder="Ej: 55.9"
            />
          </div>

          <div className="form-group">
            <label>Número de Locutores</label>
            <input
              type="number"
              name="numLocutores"
              value={formData.numLocutores}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Género</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
            >
              <option value="">Seleccionar...</option>
              <option value="Música">Música</option>
              <option value="Noticias">Noticias</option>
              <option value="Deportes">Deportes</option>
              <option value="Entretenimiento">Entretenimiento</option>
              <option value="Cultura">Cultura</option>
              <option value="Educación">Educación</option>
              <option value="Lectura">Lectura</option>
              <option value="Rock">Rock</option>
              <option value="Pop">Pop</option>
            </select>
          </div>

          <div className="form-group">
            <label>Horario</label>
            <input
              type="text"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              placeholder="Ej: 06:00 - 12:00"
            />
          </div>

          <div className="form-group">
            <label>Patrocinador</label>
            <input
              type="text"
              name="patrocinador"
              value={formData.patrocinador}
              onChange={handleChange}
              placeholder="Ej: Speedmax"
            />
          </div>

          <div className="form-group">
            <label>País</label>
            <input
              type="text"
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              placeholder="Ej: Colombia"
            />
          </div>

          <div className="form-group">
            <label>Número de Programas</label>
            <input
              type="number"
              name="numProgramas"
              value={formData.numProgramas}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Número de Ciudades</label>
            <input
              type="number"
              name="numCiudades"
              value={formData.numCiudades}
              onChange={handleChange}
              min="0"
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
            placeholder="Descripción de la emisora..."
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {emisora ? 'Actualizar' : 'Crear'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmisoraForm;
