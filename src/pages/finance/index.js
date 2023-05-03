import { useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';

const Finance = () => {
  const [embedCode, setEmbedCode] = useState('');

  const handleGenerateEmbedCode = () => {
    const code = `<iframe src="${window.location.origin}/modules/finance/CompoundInterest" width="100%" height="400px" frameborder="0"></iframe>`;
    setEmbedCode(code);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Finance</h1>
        <ul className="space-y-2">
          <li>
            <Link href="/finance/compoundInterest">
              <span  className="text-blue-500 hover:text-blue-600">Compound Interest Calculator</span >
            </Link>
          </li>
        </ul>
        <div className="mb-4">
          <button onClick={handleGenerateEmbedCode} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Generate Embed Code</button>
        </div>
        {embedCode.length > 0 && (
          <div className="bg-gray-100 p-4 rounded mb-4">
            <h2 className="text-xl font-bold mb-2">Embed Code</h2>
            <textarea className="w-full border border-gray-400 p-2 rounded" value={embedCode} readOnly />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Finance;