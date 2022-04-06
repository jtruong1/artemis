import { useState, useEffect } from 'react';
import { PlusSmIcon } from '@heroicons/react/solid';
import moment from 'moment';
import { getAllMonitors } from '../api/services/Monitors';
import Link from '../components/Link';
import LinkButton from '../components/LinkButton';
import Page from '../components/Page';
import Stats from '../components/Stats';
import Table from '../components/Table';
import Badge from '../components/Badge';

const stats = [
  { name: 'Total Incidents', value: '1' },
  { name: 'Average Uptime', value: '99.83%' },
];

const Monitors = () => {
  const [monitors, setMonitors] = useState([]);

  useEffect(() => {
    getAllMonitors()
      .then((res) => {
        setMonitors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        <Stats.Item name="Total Monitors" value={monitors.length} />
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
          {monitors.map((monitor) => {
            const uptime = monitor.checks.find(
              (check) => check.type === 'uptime'
            );

            const certificate = monitor.checks.find(
              (check) => check.type === 'certificate'
            );

            monitor.status = monitor.checks.find(
              (check) => check.status === 'down'
            )
              ? 'down'
              : 'up';

            monitor.checkedAt = monitor.checks
              .map((check) => check.checkedAt)
              .sort((a, b) => Date.parse(b) - Date.parse(a))[0];

            return (
              <tr key={monitor.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                  {monitor.label}
                </td>

                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {monitor.status === 'up' ? (
                    <Badge color="success">Healthy</Badge>
                  ) : (
                    <Badge color="danger">Unhealthy</Badge>
                  )}
                </td>

                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {uptime.status === 'up' ? (
                    <Badge color="success">Up</Badge>
                  ) : (
                    <Badge color="danger">Down</Badge>
                  )}
                </td>

                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {certificate.status === 'up' ? (
                    <Badge color="success">Valid</Badge>
                  ) : (
                    <Badge color="danger">Invalid</Badge>
                  )}
                </td>

                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {moment(monitor.checkedAt).fromNow()}
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
            );
          })}
        </tbody>
      </Table>
    </Page>
  );
};

export default Monitors;
