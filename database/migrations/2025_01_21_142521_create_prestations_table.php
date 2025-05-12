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
        Schema::create('prestations', function (Blueprint $table) {
            $table->id();
            $table->uuid('prestation_uuid')->nullable();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->string('type');
            $table->text('sites');
            $table->decimal('price', 10, 2);
            $table->string('payment_link')->nullable();
            $table->string('file_url')->nullable();
            $table->string('status')->default('pending');
            $table->integer('abonnement_duration')->nullable();
            $table->text('keywords')->nullable(); // Ajout des mots-clés
            $table->integer('recurrence')->nullable(); // Ajout de la récurrence
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prestations');
    }
};
