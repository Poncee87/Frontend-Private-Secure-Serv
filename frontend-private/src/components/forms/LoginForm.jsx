import React, { useState } from 'react';
import InputText from '../common/InputText';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import LoadingSpinner from '../common/LoadingSpinner';

const LoginForm = ({ onSubmit, isLoading, error, onForgotPassword, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="login-form-container">
      <div className="form-header">
        <h1 className="form-title">Bienvenido</h1>
        <p className="form-subtitle">Ingresa tus datos para iniciar sesión</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        {error && <ErrorMessage message={error} />}
        
        <div className="form-group">
          <InputText
            type="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            error={errors.email}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <InputText
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={(value) => handleInputChange('password', value)}
            error={errors.password}
            disabled={isLoading}
          />
        </div>

        <div className="form-actions">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? <LoadingSpinner size="small" /> : 'Ingresar'}
          </Button>
        </div>

        <div className="form-links">
          <button
            type="button"
            onClick={onForgotPassword}
            className="forgot-password-link"
            disabled={isLoading}
          >
            ¿No tienes una cuenta? <span className="">Regístrate</span> ahora.
          </button>
          
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="register-link"
            disabled={isLoading}
          >
            ¿Olvidaste tu <span className="">contraseña</span>?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;