import classNames from 'classnames';

const Card = ({ className, children }) => (
  <div
    className={classNames(className, 'shadow sm:overflow-hidden sm:rounded-md')}
  >
    <div className="px-4 py-5 space-y-6 bg-white sm:p-6">{children}</div>
  </div>
);

export default Card;
