# CRUD Application with Neon PostgreSQL Database

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

