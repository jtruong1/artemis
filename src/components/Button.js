import classNames from 'classnames';

const Button = ({
  type = 'button',
  size = 'md',
  color = 'primary',
  disabled,
  fullWidth = false,
  onClick,
  children,
}) => (
  <button
    type={type}
    className={classNames(
      `inline-flex items-center justify-center rounded-lg border border-transparent bg-${color}-600 font-medium tracking-tight text-white shadow transition-colors hover:bg-${color}-500 focus:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:ring-offset-2 focus:ring-offset-${color}-700 disabled:bg-${color}-600 disabled:cursor-not-allowed disabled:opacity-50`,
      {
        'w-full': fullWidth,
        'py-1.5 px-4': size === 'md',
      }
    )}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
