import React from 'react';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  description: string;
  isCurrent: boolean;
  onSelect: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  description,
  isCurrent,
  onSelect,
}) => {
  return (
    <div
      className={`p-3 w-[250px] cursor-pointer rounded-2xl flex flex-col justify-between ${
        isCurrent
          ? 'bg-[#00550E] text-white '
          : 'bg-[#FFFFFF80] text-black mt-3'
      }`}
    >
      {isCurrent && (
        <p className='flex justify-end text-green-500  text-[10px] '>
          MOST POPULAR
        </p>
      )}
      <p className='text-2xl font-bold mb-2'>{price}</p>
      <h2 className='text-md font-bold mb-2'>{title}</h2>
      <p className='text-sm mb-4'>{description}</p>
      <ul className='mb-4'>
        {features.map((feature, index) => (
          <li key={index} className='mb-2 text-sm font-bold'>
            ✅ {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        className={`w-full py-2 mt-4 text-xs font-bold ${
          isCurrent
            ? 'bg-white hover:bg-[#fffffff2] text-green-500'
            : 'bg-[#0D9422] hover:bg-[#0D9533] text-white'
        } rounded-2xl`}
      >
        {isCurrent ? 'Current plan' : 'Choose plan'}
      </button>
    </div>
  );
};

export default PricingCard;
