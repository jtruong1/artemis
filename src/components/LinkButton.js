import { Link } from 'react-router-dom';
import classNames from 'classnames';

const LinkButton = ({
  to,
  size = 'md',
  color = 'primary',
  fullWidth = false,
  children,
}) => (
  <Link
    to={to}
    className={classNames(
      `inline-flex items-center justify-center rounded-lg border border-transparent bg-${color}-600 font-medium tracking-tight text-white shadow transition-colors hover:bg-${color}-500 focus:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:ring-offset-2 focus:ring-offset-${color}-700`,
      {
        'w-full': fullWidth,
        'py-1.5 px-4': size === 'md',
      }
    )}
  >
    {children}
  </Link>
);

export default LinkButton;
