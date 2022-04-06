const Stats = ({ label, children }) => (
  <div>
    {label && (
      <h3 className="text-lg font-medium leading-6 text-gray-900">{label}</h3>
    )}

    <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3">{children}</dl>
  </div>
);

const Item = ({ name, value }) => (
  <div className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6">
    <dt className="text-sm font-medium text-gray-500 truncate">{name}</dt>
    <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
  </div>
);

Stats.Item = Item;

export default Stats;
