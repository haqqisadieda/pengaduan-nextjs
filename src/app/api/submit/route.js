'use server';

import Bidang from '@/app/utils/Bidang';
import { NextResponse } from 'next/server';

const googleSheetUrl = process.env.SPREAD_SCRIPT_URL;

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({ status: 405 }, { success: false });
  }

  const body = await req.json();
  const { pelapor, telepon, bidang, tglKejadian, aduan } = body;
  const tanggal = new Date().toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const tglKejadianFormated = new Date(tglKejadian).toLocaleDateString(
    'id-ID',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  );

  const namaBidang = Bidang(bidang).namaBidang;

  try {
    const response = await fetch(googleSheetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pelapor,
        telepon,
        tanggal,
        bidang: namaBidang,
        tglKejadian: tglKejadianFormated,
        aduan,
      }),
    });

    const responseOK = await response.json();

    return NextResponse.json({ status: 200 }, { success: true });
  } catch (error) {
    return NextResponse.json({ status: 500 }, { success: false });
  }
}
