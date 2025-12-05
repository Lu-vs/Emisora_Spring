import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { emisoraService } from './services/api';
import './index.css';

function EditEmisora() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [success, setSuccess] = useState(false);

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

  // ============================
  //    CARGAR EMISORA CON API
  // ============================
  useEffect(() => {
    const loadEmisora = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await emisoraService.getById(id);
        console.log("🟢 Datos recibidos:", data);

        setFormData({
          nombre: data.nombre ?? '',
          canal: data.canal ?? 'FM',
          bandaFm: data.bandaFm ?? '',
          bandaAm: data.bandaAm ?? '',
          numLocutores: data.numLocutores ?? 0,
          genero: data.genero ?? '',
          horario: data.horario ?? '',
          patrocinador: data.patrocinador ?? '',
          pais: data.pais ?? '',
          descripcion: data.descripcion ?? '',
          numProgramas: data.numProgramas ?? 0,
          numCiudades: data.numCiudades ?? 0,
        });

      } catch (err) {
        console.error("❌ Error cargando emisora:", err);
        setError("No se pudo cargar la emisora. Verifica el servidor.");
      } finally {
        setLoading(false);
      }
    };

    loadEmisora();
  }, [id]);


  // ============================
  //   MANEJO DEL FORMULARIO
  // ============================
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,

      // LIMPIA BANDA OPUESTA
      ...(name === "canal" && value === "FM" ? { bandaAm: "" } : {}),
      ...(name === "canal" && value === "AM" ? { bandaFm: "" } : {}),
    }));
  };


  // ============================
  //       ENVIAR UPDATE
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      setSubmitError("El nombre es obligatorio");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log("🟡 Enviando update:", formData);
      await emisoraService.update(id, formData);

      setSuccess(true);
      setTimeout(() => navigate("/"), 1500);

    } catch (err) {
      console.error("❌ Error en update:", err);
      setSubmitError("No se pudo actualizar la emisora.");
    } finally {
      setIsSubmitting(false);
    }
  };


  // ============================
  //          UI
  // ============================
  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando emisora...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <h3>⚠️ Error</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Volver
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="container">
      <h1>Editar Emisora</h1>

      {success ? (
        <div className="success-container">
          <h2>✓ ¡Actualizada!</h2>
          <p>Redirigiendo...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="edit-emisora-form">

          {submitError && (
            <div className="alert alert-error">{submitError}</div>
          )}

          {/* =======================
                 CAMPOS COMPLETOS
              ======================= */}

          <div className="form-group">
            <label>Nombre</label>
            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Canal</label>
            <select
              name="canal"
              value={formData.canal}
              onChange={handleInputChange}
            >
              <option value="FM">FM</option>
              <option value="AM">AM</option>
            </select>
          </div>

          {formData.canal === "FM" && (
            <div className="form-group">
              <label>Banda FM</label>
              <input
                name="bandaFm"
                type="number"
                step="0.1"
                value={formData.bandaFm}
                onChange={handleInputChange}
              />
            </div>
          )}

          {formData.canal === "AM" && (
            <div className="form-group">
              <label>Banda AM</label>
              <input
                name="bandaAm"
                type="number"
                value={formData.bandaAm}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="form-group">
            <label>Número de Locutores</label>
            <input
              name="numLocutores"
              type="number"
              value={formData.numLocutores}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Género</label>
            <input
              name="genero"
              value={formData.genero}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Horario</label>
            <input
              name="horario"
              value={formData.horario}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Patrocinador</label>
            <input
              name="patrocinador"
              value={formData.patrocinador}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>País</label>
            <input
              name="pais"
              value={formData.pais}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Número de Programas</label>
            <input
              name="numProgramas"
              type="number"
              value={formData.numProgramas}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Número de Ciudades</label>
            <input
              name="numCiudades"
              type="number"
              value={formData.numCiudades}
              onChange={handleInputChange}
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </button>

        </form>
      )}
    </div>
  );
}

export default EditEmisora;

