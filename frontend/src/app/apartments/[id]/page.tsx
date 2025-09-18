import apartmentService from "@/services/apartmentService";
import { Apartment } from "@/types/apartment";
// FC import'una artık gerek yok
// import { FC } from 'react';

// Props tipi tanımı doğru, bu kalacak
interface ApartmentPageProps {
  params: {
    id: string;
  };
}


async function getApartmentById(id: string): Promise<Apartment | null> {
  try {
    return await apartmentService.getById(id);
  } catch (error) {
    console.warn("API call failed, could not fetch apartment:", error);
    return null;
  }
}

// CORRECTED: Removed the `: FC<ApartmentPageProps>` annotation
// and typed `params` directly in the function signature.
  const ApartmentPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const apartment = await getApartmentById(id);

  if (!apartment) {
    return (
      <div className='text-center py-12'>
        <h1 className='text-2xl font-bold text-gray-900'>
          Apartment Not Found
        </h1>
        <p className='text-gray-600 mt-2'>
          The apartment you're looking for doesn't exist or the API is unavailable.
        </p>
      </div>
    );
  }

  return (
    <main className='max-w-4xl mx-auto space-y-8 p-4'>
      <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
        {apartment.imageUrl ? (
          <img
            src={apartment.imageUrl}
            alt={apartment.unitName}
            className='w-full h-96 object-cover'
          />
        ) : (
          <div className='w-full h-96 bg-gray-100 flex items-center justify-center'>
            <svg
              className='w-24 h-24 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              />
            </svg>
          </div>
        )}

        <div className='p-8'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                {apartment.unitName}
              </h1>
              <p className='text-gray-500 mt-1'>Unit: {apartment.unitNumber}</p>
            </div>
            <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
              {apartment.project}
            </span>
          </div>

          <p className='text-gray-600 text-lg leading-relaxed mb-8'>
            {apartment.description}
          </p>

          <div className='text-right'>
            <div className='text-4xl font-bold text-gray-900'>
              EGP {apartment.price.toLocaleString()}
            </div>
            <div className='text-gray-500'>per month</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ApartmentPage;