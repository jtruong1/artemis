import classNames from 'classnames';

const Input = ({
  id,
  type = 'text',
  label,
  labelHidden = false,
  hint,
  prefix,
  name,
  value,
  placeholder,
  register,
  errors,
}) => (
  <div>
    <div className="flex justify-between">
      {label && (
        <label
          htmlFor={id}
          className={
            labelHidden
              ? 'sr-only'
              : 'block text-sm font-medium leading-4 text-gray-700'
          }
        >
          {label}
        </label>
      )}

      {hint && (
        <span id={`${id}-hint`} className="text-sm text-gray-500">
          {hint}
        </span>
      )}
    </div>

    <div
      className={classNames({
        'mt-2': label || hint,
        'flex rounded-lg shadow-sm': prefix,
      })}
    >
      {prefix && (
        <span className="inline-flex items-center h-10 px-3 text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 sm:text-sm">
          {prefix}
        </span>
      )}

      <input
        id={id}
        name={name}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className={classNames(
          `block h-10 w-full border-gray-300 transition duration-75 focus:border-primary-600 focus:ring-1 focus:ring-inset focus:ring-primary-600`,
          {
            'rounded-none rounded-r-lg': prefix,
            'rounded-lg shadow-sm': !prefix,
          }
        )}
        aria-describedby={hint ? `${id}-hint` : null}
        {...(register ? register(name) : [])}
      />
    </div>

    {errors && errors[name] && (
      <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
        {errors[name].message}
      </p>
    )}
  </div>
);

export default Input;
