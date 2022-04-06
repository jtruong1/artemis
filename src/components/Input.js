import classNames from 'classnames';

const Input = ({
  id,
  type = 'text',
  label,
  labelHidden = false,
  name,
  register,
  required,
}) => (
  <div>
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
    <div className={label ? 'mt-2' : null}>
      <input
        id={id}
        type={type}
        className={classNames(
          `block h-10 w-full rounded-lg border-gray-300 shadow-sm transition duration-75 focus:border-primary-600 focus:ring-1 focus:ring-inset focus:ring-primary-600`
        )}
        {...register(name, { required })}
      />
    </div>
  </div>
);

export default Input;
