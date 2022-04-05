import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const monitors = [
  {
    id: 1,
    website: 'google.com',
    status: 'Up',
    uptime: '100%',
    certificate: 'Valid',
    lastCheck: '1 minute ago',
  },
  {
    id: 2,
    website: 'youtube.com',
    status: 'Up',
    uptime: '99.83%',
    certificate: 'Valid',
    lastCheck: '4 minutes ago',
  },
  {
    id: 3,
    website: 'facebook.com',
    status: 'Up',
    uptime: '100%',
    certificate: 'Valid',
    lastCheck: '3 minutes ago',
  },
];

const Monitors = () => {
  return (
    <Layout title="Monitors">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Website
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Uptime
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Certificate
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Last Check
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {monitors.map((monitor) => (
                    <tr key={monitor.id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {monitor.website}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <span className="inline-flex px-2 text-xs font-semibold leading-5 rounded-full bg-success-100 text-success-800">
                          {monitor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <span className="inline-flex px-2 text-xs font-semibold leading-5 rounded-full bg-success-100 text-success-800">
                          {monitor.uptime}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <span className="inline-flex px-2 text-xs font-semibold leading-5 rounded-full bg-success-100 text-success-800">
                          {monitor.certificate}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {monitor.lastCheck}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <Link
                          to={`/monitors/${monitor.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Monitors;
