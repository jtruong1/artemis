import { useState, useEffect } from 'react';
import { PlusSmIcon } from '@heroicons/react/solid';
import { getAllStatusPages } from '../api/services/StatusPages';
import Link from '../components/Link';
import LinkButton from '../components/LinkButton';
import Page from '../components/Page';
import Table from '../components/Table';
import Badge from '../components/Badge';

const StatusPages = () => {
  const [statusPages, setStatusPages] = useState([]);

  useEffect(() => {
    getAllStatusPages()
      .then((res) => {
        setStatusPages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Page
      title="Status Pages"
      actions={[
        <LinkButton to="/status-pages/add">
          <PlusSmIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
          Add Status Page
        </LinkButton>,
      ]}
    >
      <Table className="mt-4">
        <thead className="bg-white">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Label
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              URL
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Status
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {statusPages.map((statusPage) => {
            return (
              <tr key={statusPage.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                  {statusPage.label}
                </td>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-primary-500">
                  <a
                    href={`${window.location.origin}/${statusPage.slug}`}
                  >{`${window.location.origin}/${statusPage.slug}`}</a>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  <Badge color="success">Active</Badge>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <Link
                    to={`/status-pages/${statusPage.id}/edit`}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            );
          })}
          {statusPages.length === 0 && (
            <tr>
              <td
                colSpan="4"
                className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
              >
                No status pages found. Create one by clicking the button above.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Page>
  );
};

export default StatusPages;
