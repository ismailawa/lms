import React from 'react';
import InvoiceTable from './InvoiceTable';
import PricingSection from './PricingSection';


const Billing: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col  mx-auto bg-[#f8f8f8] border-4 border-solid border-white p-3 rounded-2xl">
      <h1 className="text-lg font-bold mb-1 mt-2  md:mb-2">Plans & Billing </h1>
      <p className="text-xs">Manage your plans and billing history here.</p>
      <div className='flex flex-col w-full mt-2'>
        <div className='rounded-2xl bg-[#FFFFFF80] flex md:flex-row flex-col'>
            <PricingSection />
        </div>
        <div className='w-full'>
            <InvoiceTable />
        </div>
      </div>
    </div>
  );
};

export default Billing;
