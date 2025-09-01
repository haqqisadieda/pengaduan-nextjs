'use client';
import LoginGoogle from './components/Login/LoginGoogle';

export default function Home() {
  return (
    <div className='flex flex-col h-screen items-center bg-gradient-to-r from-cyan-500 to-blue-500'>
      <LoginGoogle />
    </div>
  );
}
