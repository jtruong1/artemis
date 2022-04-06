import { Fragment } from 'react';

const Heading = ({ heading, actions = [] }) => (
  <div className="md:flex md:items-center md:justify-between">
    <div className="flex-1 min-w-0">
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
        {heading}
      </h1>
    </div>

    <div className="flex mt-4 md:mt-0 md:ml-4">
      {actions.map((action, index) => (
        <Fragment key={index}>{action}</Fragment>
      ))}
    </div>
  </div>
);

export default Heading;
