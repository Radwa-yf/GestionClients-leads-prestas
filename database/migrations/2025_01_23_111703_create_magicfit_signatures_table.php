<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('magicfit_signatures', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('file_url')->nullable();
            $table->text('link')->nullable();
            $table->text('phoneHuman')->nullable();
            $table->text('phone')->nullable();
            $table->text('email')->nullable();
            $table->text('address')->nullable();
            $table->text('addressLink')->nullable();
            $table->text('facebook')->nullable();
            $table->text('instagram')->nullable();
            $table->text('tiktok')->nullable();
            $table->text('youtube')->nullable();
            $table->text('linkedin')->nullable();
            $table->text('linktree')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('magicfit_signatures');
    }
};
