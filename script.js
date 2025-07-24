let dataPostingan = JSON.parse(localStorage.getItem('postingan')) || [];

function tampilkanPostingan() {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';
  dataPostingan.reverse().forEach((post, index) => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <strong>${post.nama}</strong>
      <p>${post.teks}</p>
      ${post.gambar ? `<img src="${post.gambar}" alt="Gambar Postingan">` : ''}
      <span class="timestamp">${post.waktu || ''}</span>
      <span class="like-btn" onclick="likePosting(${dataPostingan.length - 1 - index})">❤️ ${post.like || 0} Suka</span>
    `;


    timeline.appendChild(div);
  });
}

function buatPostingan() {
  const teks = document.getElementById('postText').value;
  const gambarInput = document.getElementById('postImage');
  const nama = localStorage.getItem('username') || "Anonim";

  if (!teks && !gambarInput.files.length) return;

  const reader = new FileReader();
  reader.onload = function () {
    const gambar = gambarInput.files.length ? reader.result : null;
    const waktu = new Date().toLocaleString('id-ID');

    dataPostingan.push({ teks, gambar, like: 0, waktu, nama });

    localStorage.setItem('postingan', JSON.stringify(dataPostingan));
    document.getElementById('postText').value = '';
    document.getElementById('postImage').value = '';
    tampilkanPostingan();
  };

  if (gambarInput.files.length) {
    reader.readAsDataURL(gambarInput.files[0]);
  } else {
    reader.onload();
  }
}

function likePosting(index) {
  dataPostingan[index].like++;
  localStorage.setItem('postingan', JSON.stringify(dataPostingan));
  tampilkanPostingan();
}

tampilkanPostingan();

function tambahPostingan(teks) {
  const waktu = new Date().toLocaleString('id-ID'); // ambil tanggal dan jam sekarang

  const elemen = document.createElement('div');
  elemen.className = 'post';
  elemen.innerHTML = `
    <p>${teks}</p>
    <span class="timestamp">${waktu}</span>
  `;
  document.getElementById('beranda').prepend(elemen);
}

function simpanNama() {
  const nama = document.getElementById('usernameInput').value;
  localStorage.setItem('username', nama);
}

document.addEventListener("DOMContentLoaded", () => {
  // isi nama dari localStorage kalau ada
  const simpananNama = localStorage.getItem('username');
  if (simpananNama) {
    document.getElementById('usernameInput').value = simpananNama;
  }

  // Lanjutkan fungsi awal kamu
  loadPostingan();
});
