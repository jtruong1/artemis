import Heading from './Heading';
import Navbar from './Navbar';

const Page = ({ title, actions, children }) => {
  return (
    <div className="min-h-full">
      <Navbar />

      <header className="bg-white shadow">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Heading heading={title} actions={actions} />
        </div>
      </header>

      <main>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default Page;
