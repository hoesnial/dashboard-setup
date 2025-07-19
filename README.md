# CRUD Application with Neon PostgreSQL Database

Aplikasi CRUD (Create, Read, Update, Delete) lengkap menggunakan Next.js yang terhubung dengan Neon PostgreSQL database serverless.

## 🚀 Fitur Utama

### ✅ CRUD Lengkap dengan Database
- **Create**: Menambahkan produk baru ke Neon database
- **Read**: Menampilkan semua produk dari Neon database
- **Update**: Mengedit produk yang ada di Neon database
- **Delete**: Menghapus produk dari Neon database

### 🗄️ Database Integration
- **Neon PostgreSQL**: Database cloud yang reliable dan cepat
- **Real-time Updates**: Data tersinkronisasi secara real-time
- **Data Persistence**: Data tersimpan permanen di database
- **Serverless**: Auto-scaling database tanpa maintenance

### 🎨 User Interface
- **Modern Design**: UI yang clean dan profesional
- **Responsive Layout**: Bekerja di desktop dan mobile
- **Loading States**: Feedback visual saat loading
- **Toast Notifications**: Notifikasi untuk setiap aksi
- **Form Validation**: Validasi input di client dan server

## 🛠️ Teknologi yang Digunakan

- **Next.js 14+**: React framework dengan App Router
- **TypeScript**: Type safety untuk development
- **Neon**: Serverless PostgreSQL database
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library yang modern
- **Sonner**: Toast notifications

## 📦 Setup Neon Database

### 1. Buat Project Neon
1. Kunjungi [console.neon.tech](https://console.neon.tech)
2. Buat akun dan project baru
3. Catat Database URL dari connection string

### 2. Setup Environment Variables
Buat file `.env.local` dan isi dengan kredensial Neon:

```env
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

### 3. Jalankan Schema SQL
Jalankan SQL migration di Neon SQL Editor:
- Buka file `neon/schema.sql`
- Copy dan paste ke SQL Editor di Neon Console
- Jalankan query untuk membuat tabel dan data sample

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Buka browser di http://localhost:3000
```

## 📱 Cara Menggunakan

### 1. Akses Halaman Management
- Klik "Manage Products" di sidebar
- Atau kunjungi `/products/manage`

### 2. Operasi CRUD
- **Tambah**: Klik tombol "Tambah Produk"
- **Edit**: Klik icon edit di tabel
- **Hapus**: Klik icon hapus dan konfirmasi
- **Lihat**: Data otomatis tampil di tabel

### 3. Fitur Dashboard
- Statistik real-time dari database
- Filter dan pencarian produk
- Export data (coming soon)

## 🗃️ Struktur Database

### Tabel Products
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL CHECK (price > 0),
  description text DEFAULT '',
  category text DEFAULT 'General',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Sample Data
- Dashboard Pro (Analytics) - Rp 1.499.000
- Security Suite (Security) - Rp 2.199.000  
- Mobile App Builder (Development) - Rp 1.199.000

## 🔒 Keamanan

- **SSL Connection**: Koneksi terenkripsi ke Neon database
- **Input Validation**: Validasi di client dan server
- **SQL Injection Protection**: Menggunakan parameterized queries
- **Type Safety**: TypeScript untuk mencegah error

## 📊 API Endpoints

### Products API
- `GET /api/products` - Ambil semua produk
- `POST /api/products` - Tambah produk baru
- `GET /api/products/[id]` - Ambil produk by ID
- `PUT /api/products/[id]` - Update produk
- `DELETE /api/products/[id]` - Hapus produk

### Response Format
```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

## 🎯 Keunggulan Aplikasi

1. **Data Persistence**: Data tersimpan permanen di Neon PostgreSQL
2. **Real-time Updates**: Perubahan data langsung terlihat
3. **Serverless**: Auto-scaling tanpa maintenance
4. **Fast**: Performance optimal dengan Neon
5. **Secure**: SSL dan input validation
6. **Responsive**: UI yang adaptif di semua device

## 🔧 Development

### Struktur Project
```
├── app/
│   ├── api/products/          # API routes
│   ├── products/manage/       # Management page
│   └── layout.tsx            # Root layout
├── components/
│   ├── ui/                   # UI components
│   ├── sidebar.tsx           # Navigation
│   └── top-bar.tsx          # Header
├── lib/
│   └── neon.ts              # Database client
├── neon/
│   └── schema.sql           # Neon database schema
└── README.md
```

### Best Practices
- TypeScript untuk type safety
- Error handling yang komprehensif
- Loading states untuk UX yang baik
- Responsive design first
- Clean code architecture

## 📈 Roadmap

- [ ] Advanced filtering dan sorting
- [ ] Bulk operations (import/export)
- [ ] Image upload untuk produk
- [ ] User authentication
- [ ] Analytics dashboard
- [ ] API rate limiting
- [ ] Automated testing

---

**Dibuat dengan ❤️ menggunakan Next.js dan Neon PostgreSQL**