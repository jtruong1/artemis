import classnames from 'classnames';

const Button = ({
  type = 'button',
  size = 'md',
  bgColor = 'primary',
  textColor = 'white',
  fullWidth = false,
  children,
}) => {
  return (
    <button
      type={type}
      className={classnames(
        `justify-center rounded-lg border border-transparent bg-${bgColor}-600 font-medium tracking-tight text-${textColor} shadow transition-colors hover:bg-${bgColor}-500 focus:bg-${bgColor}-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:ring-offset-2 focus:ring-offset-${bgColor}-700`,
        {
          'w-full': fullWidth,
          'py-1.5 px-4': size === 'md',
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
