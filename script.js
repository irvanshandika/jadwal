function cetakPDF() {
  window.print();
}

const toggleButton = document.getElementById("mode-toggle");
const body = document.body;

toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark");
  toggleButton.classList.toggle("dark");
});

let dataJadwal = [];
const formJadwal = document.querySelector("#form-jadwal");

formJadwal.addEventListener("submit", function (e) {
  e.preventDefault();

  const namaMatkul = document.querySelector("#nama-matkul").value;
  const hari = document.querySelector("#hari").value;
  const jamMulai = document.querySelector("#jam-mulai").value;
  const jamSelesai = document.querySelector("#jam-selesai").value;

  const jadwal = {
    namaMatkul,
    hari,
    jamMulai,
    jamSelesai,
  };

  dataJadwal.push(jadwal);
  formJadwal.reset();

  displayDataJadwal();
});
function displayDataJadwal() {
  const tbody = document.querySelector("#tabel-jadwal tbody");
  tbody.innerHTML = "";

  dataJadwal.forEach(function (jadwal, index) {
    const tr = document.createElement("tr");

    const tdNamaMatkul = document.createElement("td");
    tdNamaMatkul.innerText = jadwal.namaMatkul;

    const tdHari = document.createElement("td");
    tdHari.innerText = jadwal.hari;

    const tdJamMulai = document.createElement("td");
    tdJamMulai.innerText = jadwal.jamMulai;

    const tdJamSelesai = document.createElement("td");
    tdJamSelesai.innerText = jadwal.jamSelesai;

    const tdAksi = document.createElement("td");
    const btnEdit = document.createElement("button");
    btnEdit.innerText = "Edit";
    btnEdit.addEventListener("click", function () {
      editDataJadwal(index);
    });

    const btnHapus = document.createElement("button");
    btnHapus.innerText = "Hapus";
    btnHapus.addEventListener("click", function () {
      hapusDataJadwal(index);
    });

    tdAksi.appendChild(btnEdit);
    tdAksi.appendChild(btnHapus);

    tr.appendChild(tdNamaMatkul);
    tr.appendChild(tdHari);
    tr.appendChild(tdJamMulai);
    tr.appendChild(tdJamSelesai);
    tr.appendChild(tdAksi);

    tbody.appendChild(tr);
  });
}
function hapusDataJadwal(index) {
  dataJadwal.splice(index, 1);
  displayDataJadwal();
}

function editDataJadwal(index) {
  const jadwal = dataJadwal[index];

  document.querySelector("#nama-matkul").value = jadwal.namaMatkul;
  document.querySelector("#hari").value = jadwal.hari;
  document.querySelector("#jam-mulai").value = jadwal.jamMulai;
  document.querySelector("#jam-selesai").value = jadwal.jamSelesai;

  const btnTambah = document.querySelector("#btn-tambah");
  btnTambah.style.display = "none";

  const btnSimpan = document.createElement("button");
  btnSimpan.innerText = "Simpan";
  btnSimpan.addEventListener("click", function () {
    dataJadwal.splice(index, 1);
    const namaMatkul = document.querySelector("#nama-matkul").value;
    const hari = document.querySelector("#hari").value;
    const jamMulai = document.querySelector("#jam-mulai").value;
    const jamSelesai = document.querySelector("#jam-selesai").value;

    const jadwalBaru = {
      namaMatkul,
      hari,
      jamMulai,
      jamSelesai,
    };

    dataJadwal.push(jadwalBaru);
    displayDataJadwal();

    document.querySelector("#nama-matkul").value = "";
    document.querySelector("#hari").value = "";
    document.querySelector("#jam-mulai").value = "";
    document.querySelector("#jam-selesai").value = "";

    btnTambah.style.display = "block";
    btnSimpan.remove();
  });

  const form = document.querySelector("#form-jadwal");
  form.appendChild(btnSimpan);
}
function simpanDataJadwal() {
  localStorage.setItem("dataJadwal", JSON.stringify(dataJadwal));
}
displayDataJadwal();
const dataJadwalLocalStorage = localStorage.getItem("dataJadwal");

if (dataJadwalLocalStorage) {
  dataJadwal = JSON.parse(dataJadwalLocalStorage);
}
