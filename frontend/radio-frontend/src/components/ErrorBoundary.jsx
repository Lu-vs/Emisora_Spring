import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary capturó un error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-container">
            <h2>😕 Algo salió mal</h2>
            <p>Hubo un error en la aplicación:</p>
            <details className="error-details">
              <summary>Detalles del error</summary>
              <p>{this.state.error && this.state.error.toString()}</p>
              <pre>{this.state.errorInfo?.componentStack}</pre>
            </details>
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
