import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getAllMonitors } from '../api/services/Monitors';
import {
  getSingleStatusPage,
  updateStatusPage,
  deleteStatusPage,
} from '../api/services/StatusPages';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Page from '../components/Page';
import CheckboxGroup from '../components/CheckboxGroup';

const statusPageSchema = yup
  .object({
    monitor_ids: yup.array().of(yup.number()).min(1).required(),
    slug: yup.string().required(),
    label: yup.string().required(),
  })
  .required();

const EditStatusPage = () => {
  const [statusPage, setStatusPage] = useState({});
  const [monitors, setMonitors] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      label: statusPage.label,
      slug: statusPage.slug,
    },
    reValidateMode: 'onBlur',
    resolver: yupResolver(statusPageSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    updateStatusPage(id, data)
      .then(() => {
        navigate('/status-pages');
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const removeStatusPage = () => {
    deleteStatusPage(id)
      .then(() => {
        navigate('/status-pages');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSingleStatusPage(id)
      .then((res) => {
        setStatusPage(res.data);
        reset(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getAllMonitors()
      .then((res) => {
        setMonitors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, reset]);

  return (
    <Page title={`Edit Status Page (${statusPage.label})`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 lg:mt-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  General
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Specify the website or endpoint you wish to monitor.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <Card>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <Input
                      id="label"
                      label="Label"
                      name="label"
                      value="Your status page"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-2">
                    <Input
                      id="slug"
                      label="Slug"
                      name="slug"
                      register={register}
                      errors={errors}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Monitors
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Decide which monitors you want to track on your status page.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <Card>
                <CheckboxGroup>
                  <CheckboxGroup.Label>
                    Available monitor(s)
                  </CheckboxGroup.Label>
                  <div className="space-y-4">
                    {monitors.map((monitor) => (
                      <CheckboxGroup.Option
                        key={monitor.id}
                        id={`monitor-${monitor.id}`}
                        name="monitor_ids"
                        value={monitor.id}
                        checked={statusPage.monitors
                          .map((monitor) => monitor.id)
                          .includes(monitor.id)}
                        register={register}
                      >
                        {monitor.label}
                      </CheckboxGroup.Option>
                    ))}
                    {monitors.length === 0 && (
                      <p className="text-sm text-gray-600">
                        You must have at least one monitor to add a status page.
                      </p>
                    )}
                  </div>
                  {errors.monitor_ids?.type === 'min' && (
                    <p className="mt-4 text-sm text-red-600">
                      You must have at least one monitor selected.
                    </p>
                  )}
                </CheckboxGroup>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-2 sm:mt-6">
          <Button type="submit" disabled={monitors.length === 0}>
            Edit status page
          </Button>
          <Button color="danger" onClick={removeStatusPage}>
            Remove status page
          </Button>
        </div>
      </form>
    </Page>
  );
};

export default EditStatusPage;
