import { PlusSmIcon } from '@heroicons/react/solid';
import Link from '../components/Link';
import LinkButton from '../components/LinkButton';
import Page from '../components/Page';
import Stats from '../components/Stats';
import Table from '../components/Table';

const monitors = [
  {
    id: 1,
    website: 'google.com',
    status: 'Healthy',
    uptime: 'Up',
    certificate: 'Valid',
    lastCheck: '1 minute ago',
  },
  {
    id: 2,
    website: 'youtube.com',
    status: 'Healthy',
    uptime: 'Up',
    certificate: 'Valid',
    lastCheck: '4 minutes ago',
  },
  {
    id: 3,
    website: 'facebook.com',
    status: 'Healthy',
    uptime: 'Up',
    certificate: 'Valid',
    lastCheck: '3 minutes ago',
  },
];

const stats = [
  { name: 'Total Monitors', value: '3' },
  { name: 'Total Incidents', value: '1' },
  { name: 'Average Uptime', value: '99.83%' },
];

const Monitors = () => {
  return (
    <Page
      title="Monitors"
      actions={[
        <LinkButton to="/monitors/add">
          <PlusSmIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
          Add Monitor
        </LinkButton>,
      ]}
    >
      <Stats>
        {stats.map((stat) => (
          <Stats.Item key={stat.name} name={stat.name} value={stat.value} />
        ))}
      </Stats>

      <Table className="mt-4">
        <thead className="bg-white">
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
      </Table>
    </Page>
  );
};

export default Monitors;
