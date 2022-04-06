import classNames from 'classnames';

const Badge = ({ size = 'sm', color = 'primary', children }) => (
  <span
    className={classNames(
      `inline-flex items-center rounded-full bg-${color}-100 font-medium text-${color}-800`,
      {
        'px-2.5 py-0.5 text-xs': size === 'sm',
        'px-3 py-0.5 text-sm': size === 'lg',
      }
    )}
  >
    {children}
  </span>
);

export default Badge;
