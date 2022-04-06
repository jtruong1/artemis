import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClockIcon, LinkIcon } from '@heroicons/react/solid';
import moment from 'moment';
import { getSingleStatusPage } from '../api/services/StatusPages';
import Stats from '../components/Stats';
import Badge from '../components/Badge';

const StatusPage = () => {
  const [statusPage, setStatusPage] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleStatusPage(slug)
      .then((res) => {
        setStatusPage(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        navigate('/');
      });
  }, [slug, navigate]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="bg-gray-50">
      <main className="overflow-hidden">
        <div className="bg-warm-gray-50">
          <div className="py-16 lg:pt-32">
            <div className="relative z-10 pl-4 pr-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <h1 className="text-4xl font-extrabold tracking-tight text-warm-gray-900 sm:text-5xl lg:text-6xl">
                {statusPage.label}
              </h1>
              <p className="max-w-3xl mt-6 text-xl text-warm-gray-500">
                All systems are operational.
              </p>
            </div>
          </div>
        </div>
        <section className="relative">
          <div
            className="absolute w-full h-1/2 bg-gray-50"
            aria-hidden="true"
          />
          <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <svg
              className="absolute top-0 right-0 z-0 transform translate-x-1/2 -translate-y-16 sm:translate-x-1/4 md:-translate-y-24 lg:-translate-y-72"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
              />
            </svg>
          </div>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative bg-white rounded-lg shadow">
              <ul className="divide-y divide-gray-200">
                {statusPage.monitors.map((monitor) => {
                  const isPending = !!monitor.checks.find(
                    (check) => check.status === 'pending'
                  );

                  const isDown = !!monitor.checks.find(
                    (check) => check.status === 'down'
                  );

                  monitor.status = isPending
                    ? 'pending'
                    : isDown
                    ? 'down'
                    : 'up';

                  monitor.checkedAt = monitor.checks
                    .map((check) => check.checkedAt || new Date())
                    .sort((a, b) => Date.parse(b) - Date.parse(a))[0];

                  return (
                    <li key={monitor.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate text-primary-600">
                            {monitor.label}
                          </p>
                          <div className="flex flex-shrink-0 ml-2">
                            {monitor.status === 'up' ? (
                              <Badge size="lg" color="success">
                                Up
                              </Badge>
                            ) : monitor.status === 'down' ? (
                              <Badge size="lg" color="danger">
                                Down
                              </Badge>
                            ) : (
                              <Badge size="lg" color="warning">
                                Pending
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <LinkIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              {monitor.url}
                            </p>
                          </div>
                          <div className="flex items-center mt-2 text-sm text-gray-500 sm:mt-0">
                            <ClockIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <p>
                              {monitor.status !== 'pending'
                                ? moment(monitor.checkedAt).fromNow()
                                : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
        <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Average uptime
          </h2>
          <Stats>
            <Stats.Item name="Past 24 hours" value="100%" />
            <Stats.Item name="Past 7 days" value="100%" />
            <Stats.Item name="Past 30 days" value="100%" />
          </Stats>
        </section>
        <section className="px-4 py-6 mx-auto divide-y divide-gray-200 max-w-7xl sm:px-6 lg:py-6 lg:px-8">
          <h2
            id="faq-heading"
            className="text-3xl font-extrabold text-gray-900"
          >
            Status updates
          </h2>
          <div className="mt-6">
            <dl className="divide-y divide-gray-200">
              <div className="pt-8 pb-8 md:grid md:grid-cols-12 md:gap-8">
                <dt className="text-base font-medium text-gray-900 md:col-span-5">
                  April 6
                </dt>
                <dd className="mt-2 md:col-span-7 md:mt-0">
                  <p className="text-base text-gray-500">
                    There are no incidents to report.
                  </p>
                </dd>
              </div>
              <div className="pt-8 pb-8 md:grid md:grid-cols-12 md:gap-8">
                <dt className="text-base font-medium text-gray-900 md:col-span-5">
                  April 5
                </dt>
                <dd className="mt-2 md:col-span-7 md:mt-0">
                  <p className="text-base text-gray-500">
                    There are no incidents to report.
                  </p>
                </dd>
              </div>
              <div className="pt-8 pb-8 md:grid md:grid-cols-12 md:gap-8">
                <dt className="text-base font-medium text-gray-900 md:col-span-5">
                  April 4
                </dt>
                <dd className="mt-2 md:col-span-7 md:mt-0">
                  <p className="text-base text-gray-500">
                    There are no incidents to report.
                  </p>
                </dd>
              </div>
              <div className="pt-8 pb-8 md:grid md:grid-cols-12 md:gap-8">
                <dt className="text-base font-medium text-gray-900 md:col-span-5">
                  April 3
                </dt>
                <dd className="mt-2 md:col-span-7 md:mt-0">
                  <p className="text-base text-gray-500">
                    There are no incidents to report.
                  </p>
                </dd>
              </div>
              <div className="pt-8 pb-8 md:grid md:grid-cols-12 md:gap-8">
                <dt className="text-base font-medium text-gray-900 md:col-span-5">
                  April 2
                </dt>
                <dd className="mt-2 md:col-span-7 md:mt-0">
                  <p className="text-base text-gray-500">
                    There are no incidents to report.
                  </p>
                </dd>
              </div>
              <div className="pt-8 pb-8 md:grid md:grid-cols-12 md:gap-8">
                <dt className="text-base font-medium text-gray-900 md:col-span-5">
                  April 1
                </dt>
                <dd className="mt-2 md:col-span-7 md:mt-0">
                  <p className="text-base text-gray-500">
                    There are no incidents to report.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StatusPage;
