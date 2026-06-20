<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('penduduks', function (Blueprint $table) {
            $table->id();
            $table->string('nik', 16)->unique();
            $table->string('nama');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->text('alamat');
            $table->string('agama');
            $table->string('pekerjaan');
            $table->string('foto')->nullable();
            $table->enum('status', ['active', 'nonactive'])->default('active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('penduduks');
    }
};
