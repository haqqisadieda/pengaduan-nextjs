import Link from 'next/link';
import Image from 'next/image';
import logoBapenda from '../../../../public/logo_bapenda.jpg';

export default function Navbar(params) {
  return (
    <nav className='w-full bg-white text-gray-800 p-3 sm:p-4 drop-shadow-md'>
      <div className='flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 md:gap-6'>
        {/* Logo Section */}
        <div className='flex justify-center items-center flex-shrink-0'>
          {/* Using a standard <img> tag with a placeholder URL */}
          {/* If you have a local image, you'd import it: import logoBapenda from './path/to/logo.png'; */}
          <Link href='/'>
            {' '}
            {/* Replaced Link with <a> for standalone React */}
            <Image
              src={logoBapenda} // Placeholder image
              alt='Logo Bapenda'
              loading='lazy'
              className='rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover'
            />
          </Link>
        </div>
        {/* Text Section */}
        <div className='flex flex-col justify-center items-center text-center gap-1 sm:gap-2'>
          <h1 className='text-lg sm:text-xl md:text-3xl font-bold text-gray-700 leading-tight'>
            Badan Pendapatan Daerah
          </h1>
          <h2 className='text-sm sm:text-base md:text-xl text-gray-600 leading-tight'>
            Kabupaten Indramayu 2025
          </h2>
          <hr className='w-1/2 sm:w-1/3 border-t-2 border-gray-300 rounded shadow-sm mt-2 sm:mt-3' />
        </div>
      </div>
    </nav>
  );
}
