import React from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps
  extends Omit<React.InputHTMLAttributes<HTMLSelectElement>, 'className'> {
  label: string;
  className?: {
    container?: string;
    label?: string;
    input?: string;
  };
  options: Option[];
}
/**
 * Componente de selección (`Select`) reutilizable en React.
 *
 * Este componente renderiza un elemento `<select>` con una etiqueta opcional y
 * opciones personalizables. Permite extender los atributos de un `<select>` estándar
 * excepto por `className`, que se gestiona a través de un objeto de clases personalizadas.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.label - Etiqueta del campo select.
 * @param {Object} [props.className] - Clases CSS personalizables.
 * @param {string} [props.className.container] - Clases para el contenedor del select.
 * @param {string} [props.className.label] - Clases para la etiqueta del select.
 * @param {string} [props.className.input] - Clases para el select en sí.
 * @param {Array<{ value: string | number, label: string }>} props.options - Opciones del select.
 * @param {string} [props.placeholder] - Texto del placeholder para la primera opción deshabilitada.
 * @param {string} [props.defaultValue] - Valor por defecto del select.
 * @param {string} [props.name] - Nombre del select (para formularios).
 * @param {React.InputHTMLAttributes<HTMLSelectElement>} [rest] - Atributos adicionales para el select.
 *
 * @example
 * // Ejemplo de uso
 * <Select
 *   label="Selecciona un país"
 *   name="pais"
 *   className={{ container: "mb-4", label: "text-sm", input: "border" }}
 *   options=[
 *     { value: "mx", label: "México" },
 *     { value: "us", label: "Estados Unidos" },
 *     { value: "ca", label: "Canadá" }
 *   ]
 *   placeholder="Selecciona una opción"
 *   defaultValue="mx"
 * />
 */
const Select = (props: SelectProps) => {
  const { className, label, ...rest } = props;

  return (
    <div className={`mb-3 ${className?.container}`}>
      {label && (
        <label
          htmlFor={props.name}
          className={`form-label ${props.className?.label}`}
        >
          {props.label}
        </label>
      )}
      <select
        className={`form-select bg-white ${className?.input}`}
        defaultValue={props.defaultValue ?? ''}
        {...rest}
      >
        <option value="" disabled>
          {props.placeholder}
        </option>
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
