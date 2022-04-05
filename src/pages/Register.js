import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
import useAuth from '../hooks/useAuth';

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
      <div className="absolute inset-0 hidden -translate-y-1/2 -skew-y-12 bg-primary-100 lg:block"></div>

      <div className="relative flex min-h-screen flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
            alt="Artemis"
          />
        </div>

        <div className="z-10 mt-4 sm:mx-auto sm:w-full sm:max-w-md lg:mt-10">
          <div className="bg-white px-6 py-8 lg:rounded-xl lg:px-12 lg:shadow-lg">
            <div className="space-y-3">
              <h1 className="text-xl font-bold tracking-tight md:text-2xl">
                Sign up
              </h1>

              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  className="text-primary-600 transition hover:text-primary-500 focus:underline focus:outline-none"
                  to="/"
                >
                  Sign in →
                </Link>
              </p>
            </div>

            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6 space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="inline-block text-sm font-medium leading-4 text-gray-700"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      className="block h-10 w-full rounded-lg border-gray-300 shadow-sm transition duration-75 focus:border-primary-600 focus:ring-1 focus:ring-inset focus:ring-primary-600"
                      {...register('name', { required: true })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="inline-block text-sm font-medium leading-4 text-gray-700"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      className="block h-10 w-full rounded-lg border-gray-300 shadow-sm transition duration-75 focus:border-primary-600 focus:ring-1 focus:ring-inset focus:ring-primary-600"
                      {...register('email', { required: true })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="inline-block text-sm font-medium leading-4 text-gray-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      className="block h-10 w-full rounded-lg border-gray-300 shadow-sm transition duration-75 focus:border-primary-600 focus:ring-1 focus:ring-inset focus:ring-primary-600"
                      {...register('password', { required: true })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="passwordConfirmation"
                    className="inline-block text-sm font-medium leading-4 text-gray-700"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <input
                      id="passwordConfirmation"
                      type="password"
                      className="block h-10 w-full rounded-lg border-gray-300 shadow-sm transition duration-75 focus:border-primary-600 focus:ring-1 focus:ring-inset focus:ring-primary-600"
                      {...register('passwordConfirmation', { required: true })}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full justify-center rounded-lg border border-transparent bg-primary-600 py-1.5 px-4 font-medium tracking-tight text-white shadow transition-colors hover:bg-primary-500 focus:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
