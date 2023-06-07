import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>My App</title>
        <meta name="description" content="My App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-gray-800 text-white">
        <nav className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <span  className="text-xl font-bold">Finance Calculator</span >
          </Link>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>My App &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Layout;