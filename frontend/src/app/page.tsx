"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import apartmentService from "@/services/apartmentService";
import { Apartment } from "@/types/apartment";

export default function Page() {
  const [apartments, setApartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    unitName: "",
    unitNumber: "",
    description: "",
    price: "",
    project: "",
    imageUrl: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        if (debouncedSearchQuery.trim()) {
          const data = await apartmentService.searchByTitle(debouncedSearchQuery);
          setApartments(data.items);
        } else {
          const data = await apartmentService.getAll();
          setApartments(data.items);
        }
      } catch (error) {
        console.warn("API not available, using mock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, [debouncedSearchQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newApartmentData = {
        unitName: formData.unitName,
        unitNumber: formData.unitNumber,
        description: formData.description,
        price: parseInt(formData.price),
        project: formData.project,
        imageUrl:
          formData.imageUrl ||
          "https://picsum.photos/400/300?random=default",
      };

      try {
        const createdApartment = await apartmentService.create(newApartmentData);
        // Refresh the apartments list after successful creation
        const updatedApartments = await apartmentService.getAll();
        setApartments(updatedApartments.items);
      } catch (apiError) {
        console.warn("API not available, using local state:", apiError);
        const newApartment: Apartment = {
          id: (Math.max(...apartments.map((a) => parseInt(a.id))) + 1).toString(),
          ...newApartmentData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setApartments([newApartment, ...apartments]);
      }

      setFormData({
        unitName: "",
        unitNumber: "",
        description: "",
        price: "",
        project: "",
        imageUrl: "",
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating apartment:", error);
    }
  };

      if (loading) {
    return (
      <main className='space-y-8'>
        <div className='text-center py-12'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
          <p className='text-gray-600 mt-4'>Loading apartments...</p>
        </div>
      </main>
    );
      }

  return (
    <main className='space-y-8'>
      {/* Hero Section */}
      <div className='text-center py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>
          Find Your Perfect Home
        </h1>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto mb-6'>
          Discover amazing apartments across Cairo, Giza, and New Cairo
        </p>
        <button
          onClick={() => setIsDialogOpen(true)}
          className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors'>
          + Add New Apartment
        </button>
      </div>

      {/* Search Bar */}
      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
        <div className='max-w-2xl mx-auto'>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg
                className='h-5 w-5 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <input
              type='text'
              placeholder='Search by unit name, unit number, or project...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500'
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                <svg
                  className='h-5 w-5 text-gray-400 hover:text-gray-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            )}
          </div>
          {debouncedSearchQuery && (
            <p className='text-sm text-gray-500 mt-2'>
              Searching for: <span className='font-medium'>{debouncedSearchQuery}</span>
            </p>
          )}
        </div>
      </div>

      {/* Listings Grid */}
      {loading ? (
        <div className='text-center py-12'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
          <p className='text-gray-600 mt-4'>
            {debouncedSearchQuery ? 'Searching apartments...' : 'Loading apartments...'}
          </p>
        </div>
      ) : apartments.length === 0 ? (
        <div className='text-center py-12'>
          <div className='text-gray-400 mb-4'>
            <svg className='w-16 h-16 mx-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </div>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>
            {debouncedSearchQuery ? 'No apartments found' : 'No apartments available'}
          </h3>
          <p className='text-gray-600'>
            {debouncedSearchQuery 
              ? `No apartments match your search for "${debouncedSearchQuery}"`
              : 'There are currently no apartments in the database.'
            }
          </p>
          {debouncedSearchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className='mt-4 text-blue-600 hover:text-blue-700 font-medium'>
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          <div className='mb-6'>
                      <h2 className='text-xl font-semibold text-gray-900 mb-2'>
            {debouncedSearchQuery ? `Search Results (${apartments.length} found)` : `All Apartments (${apartments.length} total)`}
          </h2>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {apartments.map((apartment) => (
          <Link
            key={apartment.id}
            href={`/apartments/${apartment.id}`}
            className='group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 block'>
            <div className='relative overflow-hidden'>
              {apartment.imageUrl ? (
                <img
                  src={apartment.imageUrl}
                  alt={apartment.unitName}
                  className='w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300'
                />
              ) : (
                <div className='w-full h-56 bg-gray-100 flex items-center justify-center'>
                  <svg
                    className='w-16 h-16 text-gray-400'
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
              <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700'>
                {apartment.project}
              </div>
            </div>

            <div className='p-4'>
              <h3 className='text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors'>
                {apartment.unitName}
              </h3>

              <div className='flex items-center justify-between'>
                <div className='text-sm text-gray-500'>
                  {apartment.project}
                </div>

                <div className='text-right'>
                  <div className='text-2xl font-bold text-gray-900'>
                    EGP {apartment.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
        </>
      )}

      {/* Dialog */}
      {isDialogOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-2xl p-6 w-full max-w-md'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
              Add New Apartment
            </h2>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Unit Name
                </label>
                <input
                  type='text'
                  required
                  value={formData.unitName}
                  onChange={(e) =>
                    setFormData({ ...formData, unitName: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Unit Number
                </label>
                <input
                  type='text'
                  required
                  value={formData.unitNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, unitNumber: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  rows={3}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Price (EGP)
                </label>
                <input
                  type='number'
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Project
                </label>
                <input
                  type='text'
                  required
                  value={formData.project}
                  onChange={(e) =>
                    setFormData({ ...formData, project: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Image URL (optional)
                </label>
                <input
                  type='url'
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div className='flex gap-3 pt-4'>
                <button
                  type='button'
                  onClick={() => setIsDialogOpen(false)}
                  className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                  Create Apartment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
