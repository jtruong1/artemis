import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import auth from '../api/auth';

function LoginPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    auth
      .login(email, password)
      .then((res) => {
        const { token } = res.data;
        console.log(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                Welcome back
              </h1>

              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  className="text-primary-600 transition hover:text-primary-500 focus:underline focus:outline-none"
                  to="/register"
                >
                  Sign up →
                </Link>
              </p>
            </div>

            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6 space-y-6">
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

                  <p className="text-sm text-gray-600">
                    <Link
                      className="text-primary-600 transition hover:text-primary-500 focus:underline focus:outline-none"
                      to="/reset-password"
                    >
                      Forgot your password?
                    </Link>
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full justify-center rounded-lg border border-transparent bg-primary-600 py-1.5 px-4 font-medium tracking-tight text-white shadow transition-colors hover:bg-primary-500 focus:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
