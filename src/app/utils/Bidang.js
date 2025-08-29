export default function Bidang(nama) {
  let namaBidang = '';
  let teleponBidang = '';

  if (nama === 'sekertariat') {
    namaBidang = 'Sekertariat';
    teleponBidang = '085320023116';
  } else if (nama === 'renbang') {
    namaBidang = 'Perencanaan dan Pengembangan';
    teleponBidang = '085320023116';
  } else if (nama === 'pjdl') {
    namaBidang = 'Pajak Daerah Lainnya';
    teleponBidang = '085320023116';
  } else if (nama === 'pbb') {
    namaBidang = 'PBB dan BPHTB';
    teleponBidang = '085320023116';
  } else if (nama === 'evdal') {
    namaBidang = 'Evaluasi dan Pengendalian';
    teleponBidang = '085320023116';
  } else {
    namaBidang = 'Bidang Tidak Ditemukan';
    teleponBidang = 'Telepon Tidak Ditemukan';
  }

  return { namaBidang, teleponBidang };
}
