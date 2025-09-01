'use client';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

export default function LoginGoogle() {
  const { data: session } = useSession();
  if (session) return redirect('/pengaduan');
  return (
    <>
      {!session && (
        <div className='w-full p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 font-sans'>
          <div className='w-full sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-2/5 bg-white flex flex-col gap-4 rounded-lg shadow-xl p-6 sm:p-8 space-y-4'>
            {/* Form Header */}
            <div className='flex flex-col border-b border-gray-300 pb-4 sm:pb-6'>
              <h2 className='text-xl sm:text-xl md:text-2xl  text-center font-bold text-gray-700'>
                Untuk Melakukan Pengaduan silahkan Login dengan Google
              </h2>
            </div>

            {/* Form Body */}
            <form
              action={async () => {
                await signIn('google', { callbackUrl: '/pengaduan' });
              }}
              className='space-y-6'>
              {/* Submit Button */}
              <div className='flex flex-col p-3'>
                <button
                  type='submit'
                  className='w-full flex items-center py-3 px-4 mt-auto justify-center text-center border border-transparent rounded-md text-gray-700 text-lg font-bold bg-gray-200 drop-shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5 '>
                  <FcGoogle className='w-6 h-6 mr-4' />
                  Login dengan Google
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
