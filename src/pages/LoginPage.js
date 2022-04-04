import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <>
      <div class="absolute inset-0 hidden -translate-y-1/2 -skew-y-12 bg-primary-100 lg:block"></div>

      <div className="relative flex min-h-screen flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
            alt="Artemis"
          />
        </div>

        <div className="z-10 mt-4 sm:mx-auto sm:w-full sm:max-w-md lg:mt-10">
          <div class="bg-white px-6 py-8 lg:rounded-xl lg:px-12 lg:shadow-lg">
            <div class="space-y-3">
              <h1 class="text-xl font-bold tracking-tight md:text-2xl">
                Welcome back
              </h1>

              <p class="text-sm font-medium text-gray-600">
                Don't have an account?{' '}
                <Link
                  class="text-primary-600 transition hover:text-primary-500 focus:underline focus:outline-none"
                  to="/register"
                >
                  Sign up →
                </Link>
              </p>
            </div>

            <form class="mt-6">
              <div class="mb-6 space-y-6">
                <div class="space-y-2">
                  <label
                    for="email"
                    class="inline-block text-sm font-medium leading-4 text-gray-700"
                  >
                    Email address
                  </label>

                  <div class="group relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      class="block h-10 w-full rounded-lg border-gray-300 shadow-sm transition duration-75 focus:border-primary-600 focus:ring-1 focus:ring-inset focus:ring-primary-600"
                      required
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label
                    for="password"
                    class="inline-block text-sm font-medium leading-4 text-gray-700"
                  >
                    Password
                  </label>

                  <div class="group relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      class="block h-10 w-full rounded-lg border-gray-300 shadow-sm transition duration-75 focus:border-primary-600 focus:ring-1 focus:ring-inset focus:ring-primary-600"
                      required
                    />
                  </div>

                  <p class="text-sm text-gray-600">
                    <Link
                      class="font-medium text-primary-600 transition hover:text-primary-500 focus:underline focus:outline-none"
                      to="/reset-password"
                    >
                      Forgot your password?
                    </Link>
                  </p>
                </div>
              </div>

              <button
                type="submit"
                class="w-full justify-center rounded-lg border border-transparent bg-primary-600 py-1.5 px-4 font-medium tracking-tight text-white shadow transition-colors hover:bg-primary-500 focus:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700"
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
