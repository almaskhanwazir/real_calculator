import { useState } from "react";
import Layout from "../../components/Layout";
import EmbeddDialogue from "../../components/EmbeddDialogue";
import Link from "next/link";

const calculatorData = [
  {
    name: "Compound Interest",
    isNewComponent: false,
    calculatorId: "1",
    description: "A tropical calculator with a sweet and tangy flavor.",
    image:
      "https://cdn.slidesharecdn.com/ss_thumbnails/compound-interest-100310184142-phpapp02-thumbnail-4.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Dividend Calculator",
    isNewComponent: false,
    calculatorId: "2",
    description: "A sweet and creamy calculator that is high in potassium.",
    image:
      "https://th.bing.com/th/id/OIP.FoAnej_CGYSAzCqeCuAD0AHaFy?pid=ImgDet&rs=1",
  },
  {
    name: "NPV Calculator - Net Present Value",
    calculatorId: "3",
    isNewComponent: true,
    routUrl: "npv-calculator",
    description: "NPV formula",
    image:
      "https://th.bing.com/th/id/R.d028ae9b3648e003cc4a57db88c92423?rik=4audq8XTnURT2Q&riu=http%3a%2f%2flh6.ggpht.com%2fmHH9JmPEqYMdpPtL-iZVejVsD7vleaJgdL2dspCjRJQrJ4xq57PeRnm59PV1xUvnRPn9%3dw300&ehk=%2fB60NaiCKs2yVfLjGDNBbQMdJeEl7475WsYCljAJSSw%3d&risl=&pid=ImgRaw&r=0",
  },
];

const Finance = () => {
  const [embedCode, setEmbedCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function handleGenerateEmbedCode(calculator) {
    let embeddedCode = "";

    if (calculator.isNewComponent) {
      embeddedCode = `<iframe src="${window.location.origin}/finance/${calculator.routUrl}" width="100%" height="500px" frameborder="0"></iframe>`;
    } else {
      embeddedCode = `<iframe src="${window.location.origin}/finance/dynamicCalculatorPage?cal=${calculator.calculatorId}" width="100%" height="500px" frameborder="0"></iframe>`;
    }
    setEmbedCode(embeddedCode);
    setIsOpen(true);
  }
  function closePopup() {
    setIsOpen(false);
  }

  return (
    <Layout>
      <div className="h-screen w-screen py-6 bg-yellow-50 flex items-center justify-center flex-wrap">
        {calculatorData.map((calculator) => (
          <div
            className="bg-white w-72 h-96 shadow-md rounded m-3"
            key={calculator.name}
          >
            <div className="h-3/4 w-full">
              <img
                className="w-full h-full object-cover rounded-t"
                src={calculator.image}
                alt={calculator.name}
              />
            </div>
            <div className="w-full h-1/4 p-3">
              <Link
                href={
                  calculator.isNewComponent
                    ? `/finance/${calculator.routUrl}`
                    : `/finance/dynamicCalculatorPage?cal=${calculator.calculatorId}`
                }
              >
                <span className=" hover:text-yellow-600 text-gray-700">
                  <span className="text-lg font-semibold uppercase tracking-wide">
                    {calculator.name}
                  </span>
                </span>
              </Link>
              <p className="text-gray-600 text-sm leading-5 mt-1">
                {calculator.description}
              </p>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={() => handleGenerateEmbedCode(calculator)}
            >
              Create Link
            </button>
          </div>
        ))}
        <div>
          {isOpen == true && (
            <EmbeddDialogue content={embedCode} onClose={() => closePopup()} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Finance;
