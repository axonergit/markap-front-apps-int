import { Component } from 'react';
import PaginaError from "../Components/PaginaError.jsx";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que se muestre el UI alternativo en el próximo render.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
        return <PaginaError statusCode= "678" message="Error" />;;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
