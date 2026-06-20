<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penduduk extends Model
{
    protected $fillable = [
        'nik', 'nama', 'tempat_lahir', 'tanggal_lahir',
        'jenis_kelamin', 'alamat', 'agama', 'pekerjaan',
        'foto', 'status',
    ];
}
