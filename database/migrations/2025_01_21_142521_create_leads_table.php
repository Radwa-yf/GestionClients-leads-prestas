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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('sites')->nullable();
            $table->text('project')->nullable();
            $table->string('status')->default('pending'); // Statut du lead
            $table->string('source')->nullable();
            $table->string('gclid')->nullable(); // Google Click ID (gclid)
            $table->text('note')->nullable(); // Champ pour les notes sur le lead
            $table->foreignId('customer_id')->nullable()->constrained(
                'customers'
            );
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
