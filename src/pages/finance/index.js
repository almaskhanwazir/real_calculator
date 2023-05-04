import { useState } from 'react';
import Layout from '../../components/Layout';
import EmbeddDialogue from '../../components/EmbeddDialogue';
import Link from 'next/link';
const calculatorData = [
  {
    name: 'compoundInterest',
    description: 'A tropical calculator with a sweet and tangy flavor.',
    image: 'https://cdn.slidesharecdn.com/ss_thumbnails/compound-interest-100310184142-phpapp02-thumbnail-4.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    name: 'Biology',
    description: 'A sweet and creamy calculator that is high in potassium.',
    image: 'https://images.pexels.com/photos/5966630/pexels-photo-5966630.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    name: 'Chemestry',
    description: 'A tropical calculator with a sweet and juicy flesh.',
    image: 'https://images.pexels.com/photos/5217960/pexels-photo-5217960.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
];

const Finance = () => {
  const [embedCode, setEmbedCode] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  function handleGenerateEmbedCode(name) {
    const embeddedCode = `<iframe src="${window.location.origin}/finance/${name}" width="100%" height="400px" frameborder="0"></iframe>`;
    setEmbedCode(embeddedCode);
    setIsOpen(true);
  }
  function closePopup() {
    debugger
    setIsOpen(false);
  }

  return (
    <Layout>
      <div class="h-screen w-screen py-6 bg-yellow-50 flex items-center justify-center flex-wrap">
        {calculatorData.map(calculator => (
          <div class="bg-white w-72 h-96 shadow-md rounded m-3" key={calculator.name}>
            <div class="h-3/4 w-full">
              <img class="w-full h-full object-cover rounded-t" src={calculator.image} alt={calculator.name} />
            </div>
            <div class="w-full h-1/4 p-3">
              <Link href={`/finance/${calculator.name}`}>
                <span class=" hover:text-yellow-600 text-gray-700">
                  <span class="text-lg font-semibold uppercase tracking-wide">{calculator.name}</span>
                </span>
              </Link>
              <p class="text-gray-600 text-sm leading-5 mt-1">{calculator.description}</p>
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => handleGenerateEmbedCode(calculator.name)}>Create Link</button>
          </div>
        ))}
        <div>
          {isOpen==true && <EmbeddDialogue content={embedCode} onClose={() => closePopup()} />}
        </div>
      </div>


    </Layout>
  );
};

export default Finance;