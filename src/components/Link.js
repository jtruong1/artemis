import { Link as RouterLink } from 'react-router-dom';

const Link = ({ to, children }) => {
  return (
    <RouterLink
      to={to}
      className="transition text-primary-600 hover:text-primary-500 focus:underline focus:outline-none"
    >
      {children}
    </RouterLink>
  );
};

export default Link;
