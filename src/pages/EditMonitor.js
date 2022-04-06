import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  getMonitor,
  updateMonitor,
  deleteMonitor,
} from '../api/services/Monitors';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Page from '../components/Page';
import RadioGroup from '../components/RadioGroup';

const notificationMethods = [
  { id: 'email', title: 'Email', value: 'email', enabled: true },
  { id: 'sms', title: 'Phone (SMS)', value: 'sms', enabled: false },
  { id: 'slack', title: 'Slack', value: 'slack', enabled: false },
  { id: 'discord', title: 'Discord', value: 'discord', enabled: false },
];

const monitorSchema = yup
  .object({
    url: yup.string().url().required(),
    label: yup.string(),
  })
  .required();

const EditMonitor = () => {
  const [monitor, setMonitor] = useState({ url: '', label: '' });

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: monitor,
    resolver: yupResolver(monitorSchema),
  });

  const onSubmit = (data) => {
    updateMonitor(id, data)
      .then(() => {
        navigate('/monitors');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeMonitor = () => {
    deleteMonitor(id)
      .then(() => {
        navigate('/monitors');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMonitor(id)
      .then((res) => {
        setMonitor(res.data);
        reset(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, reset]);

  return (
    <Page title={`Edit Monitor (${monitor.label})`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 lg:mt-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Website
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
                      id="url"
                      label="URL"
                      name="url"
                      placeholder="www.example.com"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-2">
                    <Input
                      id="label"
                      label="Label"
                      hint="Optional"
                      name="label"
                      placeholder="example.com"
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
                  Notifications
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Decide how you would like to be notified if an incident
                  occurs.
                </p>
              </div>
            </div>

            <div className="mt-5 md:col-span-2 md:mt-0">
              <Card>
                <RadioGroup>
                  <RadioGroup.Label>Notification method</RadioGroup.Label>
                  <div className="space-y-4">
                    {notificationMethods.map((notificationMethod) => (
                      <RadioGroup.Option
                        key={notificationMethod.id}
                        id={notificationMethod.id}
                        name="notification-method"
                        value={notificationMethod.value}
                        checked={notificationMethod.value === 'email'}
                        disabled={!notificationMethod.enabled}
                      >
                        {notificationMethod.title}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4 space-x-2 sm:mt-6">
          <Button type="submit">Edit monitor</Button>
          <Button color="danger" onClick={removeMonitor}>
            Remove monitor
          </Button>
        </div>
      </form>
    </Page>
  );
};

export default EditMonitor;
