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
        <Stats.Item name="Total Incidents" value="0" />
        <Stats.Item name="Average Uptime" value="100%" />
      </Stats>
      <Table className="mt-6">
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
              Response Time
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Last Checked
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {monitors.map((monitor) => {
            const isPending = !!monitor.checks.find(
              (check) => check.status === 'pending'
            );

            const isDown = !!monitor.checks.find(
              (check) => check.status === 'down'
            );

            monitor.status = isPending ? 'pending' : isDown ? 'down' : 'up';

            monitor.checkedAt = monitor.checks
              .map((check) => check.checkedAt || new Date())
              .sort((a, b) => Date.parse(b) - Date.parse(a))[0];

            const uptime = monitor.checks.find(
              (check) => check.type === 'uptime'
            );

            const certificate = monitor.checks.find(
              (check) => check.type === 'certificate'
            );

            return (
              <tr key={monitor.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                  {monitor.label}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {monitor.status === 'up' ? (
                    <Badge color="success">Healthy</Badge>
                  ) : monitor.status === 'down' ? (
                    <Badge color="danger">Unhealthy</Badge>
                  ) : (
                    <Badge color="warning">Pending</Badge>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {uptime.status === 'up' ? (
                    <Badge color="success">Up</Badge>
                  ) : uptime.status === 'down' ? (
                    <Badge color="danger">Down</Badge>
                  ) : (
                    <Badge color="warning">Pending</Badge>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {certificate.status === 'up' ? (
                    <Badge color="success">Valid</Badge>
                  ) : certificate.status === 'down' ? (
                    <Badge color="danger">Invalid</Badge>
                  ) : (
                    <Badge color="warning">Pending</Badge>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {uptime.status === 'up' ? uptime.metadata.response_time : 0}{' '}
                  ms
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {monitor.status !== 'pending'
                    ? moment(monitor.checkedAt).fromNow()
                    : 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <Link
                    to={`/monitors/${monitor.id}/edit`}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            );
          })}
          {monitors.length === 0 && (
            <tr>
              <td
                colSpan="7"
                className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
              >
                No monitors found. Create one by clicking the button above.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Page>
  );
};

export default Monitors;
