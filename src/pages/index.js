import Layout from '../components/Layout';
import Link from 'next/link';

const categories = [
  {
    name: 'Finance',
    description: 'A tropical category with a sweet and tangy flavor.',
    image: 'http://www.studiorbd.pro/wp-content/uploads/2018/03/corporate_finance.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    name: 'Biology',
    description: 'A sweet and creamy category that is high in potassium.',
    image: 'https://images.pexels.com/photos/5966630/pexels-photo-5966630.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    name: 'Chemestry',
    description: 'A tropical category with a sweet and juicy flesh.',
    image: 'https://images.pexels.com/photos/5217960/pexels-photo-5217960.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
];

const Home = () => {

  return (
    <Layout>
      <div class="h-screen w-screen py-6 bg-yellow-50 flex items-center justify-center flex-wrap">
        {categories.map(category => (
          <Link href={`/${category.name.toLowerCase()}`} key={category.name}>
          <div class="bg-white w-72 h-96 shadow-md rounded m-3" key={category.name}>
            <div class="h-3/4 w-full">
              <img class="w-full h-full object-cover rounded-t" src={category.image} alt={category.name} />
            </div>
            <div class="w-full h-1/4 p-3">
                <span class="text-lg font-semibold uppercase tracking-wide ">{category.name}</span>
              
              <p class="text-gray-600 text-sm leading-5 mt-1">{category.description}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Home;