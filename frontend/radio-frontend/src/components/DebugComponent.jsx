// src/components/DebugComponent.jsx
import React, { useEffect, useState } from 'react';

const DebugComponent = () => {
  const [debugInfo, setDebugInfo] = useState('');
  const [rawData, setRawData] = useState('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      console.log('🚀 Iniciando prueba de conexión...');
      
      // Opción 1: fetch simple
      const response = await fetch('http://localhost:8080/emisoras');
      
      let info = `✅ Status: ${response.status}\n`;
      info += `✅ Status Text: ${response.statusText}\n`;
      info += `✅ OK: ${response.ok}\n`;
      
      // Obtener headers
      const headers = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
      info += `✅ Headers: ${JSON.stringify(headers, null, 2)}\n`;
      
      // Obtener texto crudo
      const text = await response.text();
      setRawData(text);
      info += `✅ Longitud del texto: ${text.length} caracteres\n`;
      info += `✅ Primeros 500 caracteres:\n${text.substring(0, 500)}...\n`;
      
      // Intentar parsear JSON
      try {
        const json = JSON.parse(text);
        info += `✅ JSON parseado exitosamente\n`;
        info += `✅ Tipo: ${typeof json}\n`;
        info += `✅ Es array?: ${Array.isArray(json)}\n`;
        
        if (Array.isArray(json)) {
          info += `✅ Longitud del array: ${json.length}\n`;
          if (json.length > 0) {
            info += `✅ Primer elemento:\n${JSON.stringify(json[0], null, 2)}\n`;
          }
        } else if (typeof json === 'object') {
          info += `✅ Keys del objeto: ${Object.keys(json).join(', ')}\n`;
          info += `✅ Objeto completo:\n${JSON.stringify(json, null, 2)}\n`;
        }
      } catch (jsonError) {
        info += `❌ Error parseando JSON: ${jsonError.message}\n`;
      }
      
      setDebugInfo(info);
      
    } catch (error) {
      const errorInfo = `❌ Error de conexión: ${error.message}\n`;
      console.error(errorInfo, error);
      setDebugInfo(errorInfo);
    }
  };

  return (
    <div style={{padding: '20px', fontFamily: 'monospace'}}>
      <h2>🔍 Debug de Conexión API</h2>
      <button onClick={testConnection} style={{marginBottom: '20px', padding: '10px'}}>
        Ejecutar Prueba
      </button>
      
      <div style={{
        background: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        marginBottom: '20px'
      }}>
        <h3>Información de Conexión:</h3>
        {debugInfo || 'Haz clic en "Ejecutar Prueba"'}
      </div>
      
      <div style={{
        background: '#2d2d2d', 
        color: '#f8f8f2',
        padding: '15px', 
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        maxHeight: '400px',
        overflow: 'auto'
      }}>
        <h3 style={{color: '#fff'}}>Texto Crudo Recibido:</h3>
        {rawData || 'No hay datos aún'}
      </div>
    </div>
  );
};

export default DebugComponent;
