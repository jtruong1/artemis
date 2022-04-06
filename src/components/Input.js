import classnames from 'classnames';

const Input = ({
  id,
  type = 'text',
  label,
  labelHidden = false,
  name,
  register,
  required,
}) => {
  return (
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
          name={name}
          className={classnames(
            `block h-10 w-full rounded-lg border-gray-300 shadow-sm transition duration-75 focus:border-primary-600 focus:ring-1 focus:ring-inset focus:ring-primary-600`
          )}
          {...register(label, { required })}
        />
      </div>
    </div>
  );
};

export default Input;
