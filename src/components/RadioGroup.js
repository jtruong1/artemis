import classNames from 'classnames';

const RadioGroup = ({ children }) => <fieldset>{children}</fieldset>;

const Label = ({ hidden, children }) => (
  <legend
    className={classNames({
      'mb-4 block text-sm font-medium leading-4 text-gray-700': !hidden,
      'sr-only': hidden,
    })}
  >
    {children}
  </legend>
);

const Option = ({ id, name, value, checked, disabled, register, children }) => (
  <div className="flex items-center">
    <input
      id={id}
      name={name}
      type="radio"
      value={value}
      className={classNames('h-4 w-4 text-primary-600 focus:ring-primary-500', {
        'border-gray-300': !disabled,
        'border-gray-200': disabled,
      })}
      defaultChecked={checked}
      disabled={disabled}
      {...(register ? register(name) : [])}
    />

    <label
      htmlFor={id}
      className={classNames(
        'ml-3 block text-sm font-medium text-gray-700 transition duration-75',
        {
          'text-gray-400': disabled,
        }
      )}
    >
      {children}
    </label>
  </div>
);

RadioGroup.Label = Label;
RadioGroup.Option = Option;

export default RadioGroup;
