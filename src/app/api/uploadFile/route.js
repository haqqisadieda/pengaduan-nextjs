'use server';
import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
import fs from 'fs';

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({ status: 405 }, { success: false });
  }

  const filePendukung = await req.formData();
  const pendukung = filePendukung.get('pendukung');
  const pelapor = filePendukung.get('pelapor');
  const telepon = filePendukung.get('telepon');
  const tanggal = filePendukung.get('tanggal');
  const extension = filePendukung.get('extension');
  const filePath = process.cwd();

  try {
    if (pendukung.type === 'application/octet-stream' || pendukung.name === '')
      return NextResponse.json({ status: 200 }, { success: true });

    const byte = await pendukung.arrayBuffer();
    const buffer = Buffer.from(byte);

    if (
      !fs.existsSync(
        `${filePath}/public/pendukung/${tanggal}_${pelapor}_${telepon}`,
        {
          recursive: true,
          force: true,
        }
      )
    ) {
      fs.mkdirSync(
        `${filePath}/public/pendukung/${tanggal}_${pelapor}_${telepon}`
      );
    }

    const file = path.join(
      filePath,
      'public',
      'pendukung',
      `${tanggal}_${pelapor}_${telepon}`,
      `${tanggal}_${pelapor}.${extension}`
    );

    console.log(file);
    const response = await writeFile(file, buffer);

    return NextResponse.json({ status: 200 }, { success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 }, { success: false });
  }
}
