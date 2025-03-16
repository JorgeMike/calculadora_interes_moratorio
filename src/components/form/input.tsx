import React, { useState } from 'react';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  className?: {
    container?: string;
    label?: string;
    input?: string;
  };
}
/**
 * Componente de entrada (`Input`) reutilizable en React.
 *
 * Este componente renderiza un campo de entrada (`<input>`) con una etiqueta opcional y
 * funcionalidad para mostrar u ocultar contraseñas cuando el tipo es `password`.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.label - Etiqueta del campo de entrada.
 * @param {Object} [props.className] - Clases CSS personalizables.
 * @param {string} [props.className.container] - Clases para el contenedor del input.
 * @param {string} [props.className.label] - Clases para la etiqueta del input.
 * @param {string} [props.className.input] - Clases para el input en sí.
 * @param {string} [props.type] - Tipo del input (`text`, `password`, etc.).
 * @param {string} [props.name] - Nombre del input (para formularios).
 * @param {React.InputHTMLAttributes<HTMLInputElement>} [rest] - Atributos adicionales para el input.
 *
 * @example
 * // Ejemplo de uso
 * <Input
 *   label="Contraseña"
 *   name="password"
 *   type="password"
 *   className={{ container: "mb-4", label: "text-sm", input: "border" }}
 * />
 */
export default function Input(props: InputProps) {
  const { className, label, type, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`${className?.container}`}>
      <label htmlFor={props.name} className={`form-label ${className?.label}`}>
        {label}
      </label>
      <div className="input-group">
        <input
          type={showPassword ? 'text' : type}
          className={`form-control bg-white ${className?.input}`}
          {...rest}
        />
        {props.type === 'password' && (
          <button
            type="button"
            className="btn btn-light border"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <i className="bi bi-eye-slash"></i>
            ) : (
              <i className="bi bi-eye"></i>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
