import classNames from 'classnames';

const CheckboxGroup = ({ children }) => <fieldset>{children}</fieldset>;

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
  <div className="relative flex items-start">
    <div className="flex items-center h-5">
      <input
        id={id}
        name={name}
        type="checkbox"
        value={value}
        className={classNames(
          'h-4 w-4 rounded text-primary-600 focus:ring-primary-500',
          {
            'border-gray-300': !disabled,
            'border-gray-200': disabled,
          }
        )}
        defaultChecked={checked}
        disabled={disabled}
        {...(register ? register(name) : [])}
      />
    </div>

    <label
      htmlFor={id}
      className={classNames(
        'ml-3 text-sm font-medium text-gray-700 transition duration-75',
        {
          'text-gray-400': disabled,
        }
      )}
    >
      {children}
    </label>
  </div>
);

CheckboxGroup.Label = Label;
CheckboxGroup.Option = Option;

export default CheckboxGroup;
