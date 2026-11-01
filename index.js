import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Data In-Memory (Simulasi Database Mahasiswa)
let students = [
  {
    id: 1,
    nim: "452024611028",
    nama: "Muhammad Shahan Syah",
    prodi: "Teknik Informatika",
  },
  {
    id: 2,
    nim: "452024611003",
    nama: "Muhammad Hanan Annafi",
    prodi: "Teknik Informatika",
  },
  {
    id: 3,
    nim: "452024611057",
    nama: "Muhammad Ibnu Nafis",
    prodi: "Teknik Informatika",
  },
];

// 1. GET: Ambil semua data mahasiswa
app.get("/api/students", (req, res) => {
  res.status(200).json({
    status: "success",
    data: students,
  });
});

// 2. GET by ID: Ambil satu data mahasiswa
app.get("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res
      .status(404)
      .json({ status: "error", message: "Mahasiswa tidak ditemukan" });
  }
  res.status(200).json({ status: "success", data: student });
});

// 3. POST: Tambah data mahasiswa baru
app.post("/api/students", (req, res) => {
  const { nim, nama, prodi } = req.body;
  if (!nim || !nama || !prodi) {
    return res
      .status(400)
      .json({ status: "error", message: "Semua field wajib diisi" });
  }
  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    nim,
    nama,
    prodi,
  };
  students.push(newStudent);
  res
    .status(201)
    .json({
      status: "success",
      message: "Data berhasil ditambahkan",
      data: newStudent,
    });
});

// 4. PUT: Update data mahasiswa
app.put("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nim, nama, prodi } = req.body;
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ status: "error", message: "Mahasiswa tidak ditemukan" });
  }

  students[index] = { ...students[index], nim, nama, prodi };
  res
    .status(200)
    .json({
      status: "success",
      message: "Data berhasil diperbarui",
      data: students[index],
    });
});

// 5. DELETE: Hapus data mahasiswa
app.delete("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ status: "error", message: "Mahasiswa tidak ditemukan" });
  }

  students.splice(index, 1);
  res.status(200).json({ status: "success", message: "Data berhasil dihapus" });
});

app.listen(PORT, () => {
  console.log(`Server RESTful API berjalan di http://localhost:${PORT}`);
});
