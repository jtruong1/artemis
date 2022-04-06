import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { generateSlug } from 'random-word-slugs';
import { getAllMonitors } from '../api/services/Monitors';
import { createStatusPage } from '../api/services/StatusPages';
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

const AddStatusPage = () => {
  const [monitors, setMonitors] = useState([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      slug: generateSlug(),
    },
    reValidateMode: 'onBlur',
    resolver: yupResolver(statusPageSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    createStatusPage(data)
      .then(() => {
        navigate('/status-pages');
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

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
    <Page title="Add Status Page">
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
        <div className="flex justify-end mt-4 sm:mt-6">
          <Button type="submit" disabled={monitors.length === 0}>
            Add status page
          </Button>
        </div>
      </form>
    </Page>
  );
};

export default AddStatusPage;
