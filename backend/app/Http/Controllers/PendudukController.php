<?php

namespace App\Http\Controllers;

use App\Models\Penduduk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PendudukController extends Controller
{
    public function index(Request $request)
{
    $query = Penduduk::orderBy('created_at', 'desc');

    if ($request->search) {
        $query->where('nama', 'like', '%' . $request->search . '%')
              ->orWhere('nik', 'like', '%' . $request->search . '%');
    }

    return response()->json($query->paginate(10));
}

    public function store(Request $request)
    {
        $request->validate([
            'nik'           => 'required|string|size:16|unique:penduduks,nik',
            'nama'          => 'required|string|max:100',
            'tempat_lahir'  => 'required|string|max:100',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat'        => 'required|string',
            'agama'         => 'required|string|max:50',
            'pekerjaan'     => 'required|string|max:100',
            'foto'          => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data = $request->except('foto');
        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('foto_penduduk', 'public');
        }

        $penduduk = Penduduk::create($data);
        return response()->json($penduduk, 201);
    }

    public function show($id)
    {
        $penduduk = Penduduk::findOrFail($id);
        return response()->json($penduduk);
    }

    public function update(Request $request, $id)
    {
        $penduduk = Penduduk::findOrFail($id);

        $request->validate([
            'nik'           => 'required|string|size:16|unique:penduduks,nik,' . $id,
            'nama'          => 'required|string|max:100',
            'tempat_lahir'  => 'required|string|max:100',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat'        => 'required|string',
            'agama'         => 'required|string|max:50',
            'pekerjaan'     => 'required|string|max:100',
            'foto'          => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data = $request->except('foto');
        if ($request->hasFile('foto')) {
            if ($penduduk->foto) {
                Storage::disk('public')->delete($penduduk->foto);
            }
            $data['foto'] = $request->file('foto')->store('foto_penduduk', 'public');
        }

        $penduduk->update($data);
        return response()->json($penduduk);
    }

    public function toggleStatus($id)
    {
        $penduduk = Penduduk::findOrFail($id);
        $penduduk->status = $penduduk->status === 'active' ? 'nonactive' : 'active';
        $penduduk->save();
        return response()->json($penduduk);
    }

    public function destroy($id)
    {
        $penduduk = Penduduk::findOrFail($id);
        if ($penduduk->foto) {
            Storage::disk('public')->delete($penduduk->foto);
        }
        $penduduk->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
