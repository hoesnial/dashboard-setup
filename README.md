# Dashboard Setup - CRUD Application with Database

Aplikasi CRUD (Create, Read, Update, Delete) lengkap menggunakan Next.js yang terhubung dengan database Supabase.

## 🚀 Fitur Utama

### ✅ CRUD Lengkap dengan Database
- **Create**: Menambahkan produk baru ke database
- **Read**: Menampilkan semua produk dari database
- **Update**: Mengedit produk yang ada di database
- **Delete**: Menghapus produk dari database

### 🗄️ Database Integration
- **Supabase PostgreSQL**: Database cloud yang reliable
- **Real-time Updates**: Data tersinkronisasi secara real-time
- **Data Persistence**: Data tersimpan permanen di database
- **Row Level Security**: Keamanan data terjamin

### 🎨 User Interface
- **Modern Design**: UI yang clean dan profesional
- **Responsive Layout**: Bekerja di desktop dan mobile
- **Loading States**: Feedback visual saat loading
- **Toast Notifications**: Notifikasi untuk setiap aksi
- **Form Validation**: Validasi input di client dan server

## 🛠️ Teknologi yang Digunakan

- **Next.js 13+**: React framework dengan App Router
- **TypeScript**: Type safety untuk development
- **Supabase**: Database PostgreSQL cloud
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library yang modern
- **Sonner**: Toast notifications

## 📦 Setup Database

### 1. Buat Project Supabase
1. Kunjungi [supabase.com](https://supabase.com)
2. Buat akun dan project baru
3. Catat URL dan Anon Key dari project

### 2. Setup Environment Variables
Buat file `.env.local` dan isi dengan kredensial Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Jalankan Migration
Jalankan SQL migration di Supabase SQL Editor:
- Buka file `supabase/migrations/create_products_table.sql`
- Copy dan paste ke SQL Editor di Supabase Dashboard
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
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL CHECK (price > 0),
  description text DEFAULT '',
  category text DEFAULT 'General',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### Sample Data
- Dashboard Pro (Analytics) - Rp 1.499.000
- Security Suite (Security) - Rp 2.199.000  
- Mobile App Builder (Development) - Rp 1.199.000

## 🔒 Keamanan

- **Row Level Security (RLS)**: Aktif di semua tabel
- **Input Validation**: Validasi di client dan server
- **SQL Injection Protection**: Menggunakan Supabase client
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

1. **Data Persistence**: Data tersimpan permanen di database cloud
2. **Real-time Updates**: Perubahan data langsung terlihat
3. **Scalable**: Dapat menangani ribuan produk
4. **Secure**: Keamanan tingkat enterprise
5. **Fast**: Performance optimal dengan caching
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
│   └── supabase.ts          # Database client
└── supabase/
    └── migrations/          # Database migrations
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
- [ ] Role-based access control
- [ ] Analytics dashboard
- [ ] API rate limiting
- [ ] Automated testing

---

**Dibuat dengan ❤️ menggunakan Next.js dan Supabase**