import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createMonitor } from '../api/services/Monitors';
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

const AddMonitor = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onBlur',
    resolver: yupResolver(monitorSchema),
  });

  const onSubmit = (data) => {
    createMonitor(data)
      .then(() => {
        navigate('/monitors');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Page title="Add Monitor">
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
                      value="https://"
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

        <div className="flex justify-end mt-4 sm:mt-6">
          <Button type="submit">Add monitor</Button>
        </div>
      </form>
    </Page>
  );
};

export default AddMonitor;
