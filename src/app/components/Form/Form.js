'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { RiseLoader } from 'react-spinners';
import {
  FcVoicePresentation,
  FcPhone,
  FcBusiness,
  FcAdvertising,
  FcCalendar,
} from 'react-icons/fc';
import { HiMiniPaperClip } from 'react-icons/hi2';
import { usePathname } from 'next/navigation';
export default function Form() {
  const itemBidang = [
    {
      id: 1,
      bidang: 'Sekertariat',
      value: 'sekertariat',
    },
    {
      id: 2,
      bidang: 'Perencanaan dan Pengembangan',
      value: 'renbang',
    },
    {
      id: 3,
      bidang: 'Pajak Daerah Lainnya',
      value: 'pjdl',
    },
    {
      id: 4,
      bidang: 'PBB dan BPHTB',
      value: 'pbb',
    },
    {
      id: 5,
      bidang: 'Evaluasi dan Pengendalian',
      value: 'evdal',
    },
  ];

  const [pelapor, setPelapor] = useState('');
  const [tglKejadian, setTglKejadian] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [telepon, setTelepon] = useState('');
  const [bidang, setBidang] = useState('');
  const [aduan, setAduan] = useState('');
  const [keyFile, setKeyFile] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const pelapor = formData.get('pelapor');
    const tglKejadian = formData.get('tglKejadian');
    const telepon = formData.get('telepon');
    const bidang = formData.get('bidang');
    const aduan = formData.get('aduan');
    const pendukung = formData.get('pendukung');
    const tanggalSekarang = new Date().toISOString().split('T')[0];
    const extension = pendukung.name.split('.')[1];

    const filePendukung = new FormData();
    filePendukung.append('pendukung', pendukung);
    filePendukung.append('pelapor', pelapor);
    filePendukung.append('telepon', telepon);
    filePendukung.append('tanggal', tanggalSekarang);
    filePendukung.append('extension', extension);
    const rootURL = 'https://pengaduan-nextjs.vercel.app/';
    const pendukungURL = `${rootURL}/pendukung/${tanggalSekarang}_${pelapor}_${telepon}/${tanggalSekarang}_${pelapor}.${extension}`;

    try {
      if (
        pelapor === '' ||
        telepon === '' ||
        bidang === '' ||
        tglKejadian === '' ||
        aduan === ''
      ) {
        toast.error('Semua data harus diisi', {
          duration: 5000,
          position: 'bottom-center',
        });
        setLoading(false);
        return;
      } else if (
        pendukung.type !== 'application/pdf' &&
        pendukung.type !== 'application/octet-stream'
      ) {
        toast.error('Pendukung harus berformat PDF', {
          duration: 5000,
          position: 'bottom-center',
        });
        setLoading(false);
        return;
      } else {
        const responseUploadFile = await fetch('/api/uploadFile', {
          method: 'POST',
          body: filePendukung,
        });

        const responseSubmit = await fetch('/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pelapor,
            telepon,
            bidang,
            tglKejadian,
            aduan,
            pendukung,
            pendukungURL,
          }),
        });

        /*const responseMessage = await fetch('/api/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pelapor, telepon, bidang, aduan }),
        });*/

        const uploadFileOK = await responseUploadFile.json();
        const submitOK = await responseSubmit.json();
        // const messageOK = await responseMessage.json();

        //if (!uploadFileOK.ok || !submitOK.ok || !messageOK.ok) {
        if (!uploadFileOK.ok || !submitOK.ok) {
          setLoading(false);
          setPelapor('');
          setTglKejadian(new Date().toISOString().split('T')[0]);
          setTelepon('');
          setBidang('');
          setAduan('');
          setKeyFile((prevKeyFile) => prevKeyFile + 1);
          setLoading(false);
          toast.success('Pengaduan Berhasil Dikirim', {
            duration: 5000,
            position: 'bottom-center',
          });
        }
      }
    } catch (error) {
      toast.error('Pengaduan Gagal Dikirim', {
        duration: 5000,
        position: 'bottom-center',
      });
    }
  };

  return (
    <>
      <div className='w-full p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 font-sans'>
        <div className='w-full sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-2/5 bg-white flex flex-col gap-4 rounded-lg shadow-xl p-6 sm:p-8 space-y-4'>
          {/* Form Header */}
          <div className='flex flex-col justify-center items-center border-b border-gray-300 pb-4 sm:pb-6'>
            <div className='flex flex-col w-[80%] text-center'>
              <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-700'>
                Formulir Pengaduan PBB dan BPHTB
              </h2>
              <p className='mt-1 text-sm sm:text-base md:text-lg text-gray-500'>
                Isi Formulir Pengaduan ini dengan sebenar-benarnya.
              </p>
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <Toaster />
            <div className='flex flex-col gap-6'>
              {/* Nama Pelapor (Reporter Name) */}
              <div>
                <label
                  htmlFor='pelapor'
                  className='flex items-center text-sm sm:text-base font-medium text-gray-700 mb-1'>
                  <FcVoicePresentation className='w-5 h-5 mr-1.5' /> Nama
                  Pelapor
                </label>
                <input
                  type='text'
                  id='pelapor'
                  name='pelapor'
                  value={pelapor}
                  onChange={(e) => setPelapor(e.target.value)}
                  placeholder='Masukkan Nama Anda'
                  className='w-full text-sm sm:text-base py-2.5 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out'
                  aria-label='Nama Pelapor'
                  required
                />
              </div>

              {/* Telepon (Phone Number) */}
              <div>
                <label
                  htmlFor='telepon'
                  className='flex items-center text-sm sm:text-base font-medium text-gray-700 mb-1'>
                  <FcPhone className='w-5 h-5 mr-1.5' /> Nomor Telepon
                </label>
                <input
                  type='tel'
                  id='telepon'
                  name='telepon'
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                  placeholder='Contoh: 08789488xxx'
                  className='w-full text-sm sm:text-base py-2.5 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out'
                  aria-label='Nomor Telepon'
                  required
                />
              </div>

              {/* Bidang (Field/Category) */}
              <div className='hidden'>
                <label
                  htmlFor='bidang'
                  className='flex items-center text-sm sm:text-base font-medium text-gray-700 mb-1'>
                  <FcBusiness className='w-5 h-5 mr-1.5' /> Bidang
                </label>
                <div className='relative'>
                  <select
                    id='bidang'
                    name='bidang'
                    value='pbb'
                    onChange={(e) => setBidang(e.target.value)}
                    autoComplete='bidang'
                    className='w-full text-sm sm:text-base py-2.5 px-3 appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10 bg-white transition duration-200 ease-in-out'
                    aria-label='Pilih Bidang'
                    required>
                    <option hidden value=''>
                      Pilih Bidang
                    </option>
                    {itemBidang.map((item) => (
                      <option
                        className='text-sm sm:text-base'
                        key={item.id}
                        value={item.value}>
                        {item.bidang}
                      </option>
                    ))}
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                    <svg
                      viewBox='0 0 16 16'
                      fill='currentColor'
                      data-slot='icon'
                      aria-hidden='true'
                      className='size-4 sm:size-5'>
                      <path
                        d='M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z'
                        clipRule='evenodd'
                        fillRule='evenodd'
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Tanggal Kejadian (Incident Date) */}
              <div>
                <label
                  htmlFor='tglKejadian'
                  className='flex items-center text-sm sm:text-base font-medium text-gray-700 mb-1'>
                  <FcCalendar className='w-5 h-5 mr-1.5' /> Tanggal Kejadian
                </label>
                <input
                  id='tglKejadian'
                  name='tglKejadian'
                  value={tglKejadian}
                  type='date'
                  onChange={(e) => setTglKejadian(e.target.value)}
                  placeholder='Pilih Tanggal Kejadian'
                  className='w-full text-sm sm:text-base py-2.5 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out'
                  aria-label='Nama Pelapor'
                  required
                />
              </div>

              {/* Aduan (Complaint) */}
              <div>
                <label
                  htmlFor='aduan'
                  className='flex items-center text-sm sm:text-base font-medium text-gray-700 mb-1'>
                  <FcAdvertising className='w-5 h-5 mr-1.5' /> Aduan
                </label>
                <textarea
                  id='aduan'
                  name='aduan'
                  value={aduan}
                  onChange={(e) => setAduan(e.target.value)}
                  rows='4' // Increased rows for better usability
                  placeholder='Tuliskan Aduan Anda Disini'
                  className='w-full text-sm sm:text-base py-2.5 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out resize-y'
                  aria-label='Detail Aduan'
                  required
                />
              </div>

              {/* Pendukung (Attachment) */}
              <div className='w-full border-b border-gray-300 pb-6 sm:pb-7'>
                <label className='flex items-center text-sm md:text-base text-gray-700 font-medium mb-1'>
                  <HiMiniPaperClip className='w-5 h-5 mr-1.5' /> Upload
                  Pendukung
                </label>
                <input
                  type='file'
                  key={keyFile}
                  id='pendukung'
                  name='pendukung'
                  className='w-full text-slate-500 font-medium text-sm border border-gray-300 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-slate-500 rounded'
                />
                <p className='text-xs text-slate-500 mt-2 px-1'>
                  * Silahkan kumpulkan bukti pendukung dalam satu berkas PDF.
                  (Max 2MB)
                </p>
              </div>

              {/* Submit Button */}
              <div className='flex flex-col p-3'>
                <button
                  type='submit'
                  disabled={loading}
                  className={`${
                    loading
                      ? ''
                      : 'hover:from-blue-600 hover:to-indigo-700 drop-shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5'
                  } w-full flex justify-center items-center mt-auto py-3 px-4 text-center border border-transparent rounded-md text-white text-base font-medium bg-gradient-to-r from-blue-500 to-indigo-600`}>
                  {loading ? (
                    <RiseLoader color='#ffffff' size={10} />
                  ) : (
                    'Kirim Pengaduan'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
