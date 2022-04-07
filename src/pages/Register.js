import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
import useAuth from '../hooks/useAuth';
import artemisLogo from '../assets/images/logos/artemis-full.png';
import Button from '../components/Button';
import Input from '../components/Input';
import Link from '../components/Link';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useContext(UserContext);
  const { registerUser } = useAuth();

  const onSubmit = (data) => {
    registerUser(data);
  };

  if (user) {
    return <Navigate to="/monitors" replace />;
  }

  return (
    <>
      <div className="absolute inset-0 hidden -translate-y-1/2 -skew-y-12 bg-primary-200 lg:block"></div>

      <div className="relative flex flex-col justify-center min-h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="w-auto h-16 mx-auto sm:h-20"
            src={artemisLogo}
            alt="Artemis"
          />
        </div>

        <div className="z-10 mt-4 sm:mx-auto sm:w-full sm:max-w-md lg:mt-10">
          <div className="px-6 py-8 lg:rounded-lg lg:bg-white lg:px-12 lg:shadow-lg">
            <div className="space-y-3">
              <h1 className="text-xl font-bold tracking-tight lg:text-2xl">
                Sign up
              </h1>

              <p className="text-sm text-gray-600">
                Already have an account? <Link to="/">Sign in →</Link>
              </p>
            </div>

            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6 space-y-4">
                <Input
                  id="name"
                  label="Full name"
                  name="name"
                  register={register}
                  required
                />

                <Input
                  id="email"
                  label="Email address"
                  name="email"
                  type="email"
                  register={register}
                  required
                />

                <Input
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  register={register}
                  required
                />

                <Input
                  id="passwordConfirmation"
                  label="Confirm password"
                  name="passwordConfirmation"
                  type="password"
                  register={register}
                  required
                />
              </div>

              <Button type="submit" fullWidth>
                Sign up
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
