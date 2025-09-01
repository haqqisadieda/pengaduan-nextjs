'use server';

import Bidang from '@/app/utils/Bidang';
import { NextResponse } from 'next/server';

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({ status: 405 }, { success: false });
  }

  const body = await req.json();
  const { pelapor, telepon, bidang, aduan } = body;
  const tanggal = new Date().toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const namaBidang = Bidang(bidang).namaBidang;
  const teleponBidang = Bidang(bidang).teleponBidang;

  const messagePelapor = `Halo *${pelapor}*,\n\nTerimakasih atas pengaduan anda, pengaduan anda kami terima pada tanggal *${tanggal}*, kami akan segera menangani pengaduan anda.\n\nPengaduan anda:\n*${aduan}.*`;
  const messageAdmin = `Halo *${namaBidang}*, Ada pengaduan baru.\n\nPelapor:\n*${pelapor}*\n\nNomor Telepon:\n*${telepon}*\n\nPengaduan:\n*${aduan}.*\n\nLink Data Pengaduan:\n*${process.env.DATA_PENGADUAN_URL}*`;

  try {
    // Kirim data ke Pelapor
    const responsePelapor = await fetch(process.env.FONNTE_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: process.env.FONNTE_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: telepon,
        message: messagePelapor,
      }),
    });

    // Kirim data ke Pelapor
    const responseAdmin = await fetch(process.env.FONNTE_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: process.env.FONNTE_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: teleponBidang,
        message: messageAdmin,
      }),
    });

    const pelaporOK = await responsePelapor.json();
    const adminOK = await responseAdmin.json();

    return NextResponse.json({ status: 200 }, { success: true });
  } catch (error) {
    return NextResponse.json({ status: 500 }, { success: false });
  }
}
