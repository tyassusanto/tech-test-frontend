# Technical Test Frontend React JS

## Halaman dan Fitur

### Halaman dan Fitur
1. Halaman Login
    - Menampilkan input username dan password untuk login ke dalam aplikasi

2. Halaman Laporan Per Hari dan Laporan Lalu Lintas (Lalin).
    - Menampilkan data laporan per hari berdasarkan searchAll dan tanggal. Tampilan data laporan dipisah berdasarkan jenis pembayarannya.
    - Fitur untuk menampilkan detail data yang dipilih berdasarkan jenis pembayarannya yaitu Total Tunai, Total E-Toll, Total Flo, Total KTP, Total Keseluruhan, Total E-Toll+Tunai+Flo.
    - Fitur filter, reset, export, dan pagination.
     
      Note : 
       - Fitur pagination menggunakan fungsi pagination dari library frontend dikarenakan api tidak menyediakan parameter /  fungsi pagination.
       - Fitur filter tanggal otomatis berdasarkan tanggal pada hari ini ketika halaman pertama kali dibuka, filter tanggal bisa di reset sehingga menampilkan seluruh data tanpa filter tanggal.
       - Untuk fitur export Excel, data yg di download adalah data sesuai pada filter, tanggal yg dipilih, dan juga tab metode pambayaran yg dipilih. 
  
3. Halaman Master Data Gerbang
    - Menampilkan table data gerbang
    - Fitur CRUD data gerbang
    - Fitur search dan pagination
     Note : Fitur pagination menggunakan fungsi pagination dari library frontend dikarenakan api tidak menyediakan parameter /  fungsi pagination

4. Dashboard
   - Fitur search all dan tanggal
   - Fitur menampilkan bar chart berdasarkan metode pembayaran
   - Menampilkan bar chart berdasarkan gerbang 
   - Menampilkan pie chart berdasarkan shift
   - menampilkan pie chart berasarkan ruas
   Note : Dashboard menggunakan endpoint yg sama dengan Halaman Laporan Lalu Lintas Per Hari

---

## 🚀 Cara Menjalankan Project di Local

### 1. Clone Repository

```bash
git clone https://github.com/tyassusanto/tech-test-frontend
cd tech-test-frontend
npm install
tambahkan .env VITE_BASE_URL=http://localhost:8080 atau sesuaikan dengan host backend
npm run dev
