import { NextResponse } from 'next/server';

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({ status: 405 }, { success: false });
  }

  const file = new FormData();
  const filePendukung = await req.formData();
  const token = filePendukung.get('token');
  const pendukung = filePendukung.get('pendukung');
  const metadata = filePendukung.get('metadata');

  file.append('metadata', metadata);
  file.append('pendukung', pendukung);

  console.log(filePendukung);
  console.log(pendukung, token, metadata);

  try {
    const response = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files/?uploadType=multipart',
      {
        method: 'POST',
        body: file,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = await response.json();

    console.log(responseData, responseData.id);

    return NextResponse.json({ status: 200 }, { success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 }, { success: false });
  }
}
