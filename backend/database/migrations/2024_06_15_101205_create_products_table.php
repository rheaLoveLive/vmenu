<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('nm_product', 60);
            $table->string('no_product', 10);
            $table->smallInteger('id_categ')->default(0);
            $table->string('descr_product', 100);
            $table->text('img_product')->nullable();
            $table->integer('price_product')->default(0);
            $table->integer('qty_product');
            $table->enum('status_product',['instock','outstock']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
