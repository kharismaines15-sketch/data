<?php

namespace Database\Seeders;

use App\Models\Penduduk;
use Illuminate\Database\Seeder;

class PendudukSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['3201010101010001', 'Budi Santoso',    'Jakarta',    '1990-05-10', 'L', 'Jl. Merdeka No.1',      'Islam',   'Pegawai Negeri'],
            ['3201010101010002', 'Siti Rahayu',     'Bandung',    '1992-08-15', 'P', 'Jl. Sudirman No.5',     'Islam',   'Guru'],
            ['3201010101010003', 'Ahmad Fauzi',     'Surabaya',   '1988-03-22', 'L', 'Jl. Diponegoro No.10',  'Islam',   'Wiraswasta'],
            ['3201010101010004', 'Dewi Lestari',    'Yogyakarta', '1995-11-30', 'P', 'Jl. Malioboro No.20',   'Kristen', 'Dokter'],
            ['3201010101010005', 'Eko Prasetyo',    'Semarang',   '1985-07-04', 'L', 'Jl. Pemuda No.15',      'Islam',   'Petani'],
            ['3201010101010006', 'Fitri Handayani', 'Medan',      '1993-01-18', 'P', 'Jl. Imam Bonjol No.8',  'Islam',   'Perawat'],
            ['3201010101010007', 'Gunawan Hadi',    'Makassar',   '1987-09-25', 'L', 'Jl. Sam Ratulangi No.3','Katolik', 'Pengacara'],
            ['3201010101010008', 'Hana Pertiwi',    'Palembang',  '1996-04-12', 'P', 'Jl. Veteran No.7',      'Islam',   'Mahasiswa'],
            ['3201010101010009', 'Irwan Saputra',   'Denpasar',   '1991-06-28', 'L', 'Jl. Gatot Subroto No.4','Hindu',   'Programmer'],
            ['3201010101010010', 'Joko Widodo',     'Solo',       '1989-12-05', 'L', 'Jl. Slamet Riyadi No.9','Islam',   'Pedagang'],
            ['3201010101010011', 'Kartini Suci',    'Malang',     '1994-02-14', 'P', 'Jl. Ijen No.12',        'Kristen', 'Akuntan'],
            ['3201010101010012', 'Lutfi Hakim',     'Bogor',      '1986-10-20', 'L', 'Jl. Pajajaran No.6',    'Islam',   'Insinyur'],
        ];

        foreach ($data as $row) {
            Penduduk::create([
                'nik'          => $row[0],
                'nama'         => $row[1],
                'tempat_lahir' => $row[2],
                'tanggal_lahir'=> $row[3],
                'jenis_kelamin'=> $row[4],
                'alamat'       => $row[5],
                'agama'        => $row[6],
                'pekerjaan'    => $row[7],
                'status'       => 'active',
            ]);
        }
    }
}
