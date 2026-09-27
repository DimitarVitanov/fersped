<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Company-wide facts: phones, address, geo, certifications… one JSON value per key.
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->json('value');
            $table->timestamps();
        });

        // Every editable section of every page, per locale. `data` mirrors the
        // prop shape the Vue pages consume, so the admin edits exactly what renders.
        Schema::create('content_blocks', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 5);
            $table->string('page', 40);      // home | services | about | network | contact | investors | ui | meta
            $table->string('key', 60);       // hero | stats | intro | …
            $table->string('label')->nullable(); // human name shown in admin
            $table->json('data');
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
            $table->unique(['locale', 'page', 'key']);
        });

        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 5);
            $table->string('slug', 60);
            $table->string('icon', 40)->default('layers');
            $table->string('title');
            $table->string('tagline')->nullable();
            $table->text('summary')->nullable();
            $table->json('description')->nullable(); // paragraphs
            $table->json('features')->nullable();    // bullet list
            $table->string('image')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('published')->default(true);
            $table->timestamps();
            $table->unique(['locale', 'slug']);
        });

        Schema::create('document_categories', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 80)->unique();
            $table->string('title_mk');
            $table->string('title_en');
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });

        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('document_category_id')->constrained()->cascadeOnDelete();
            $table->string('title_mk');
            $table->string('title_en')->nullable();
            $table->string('file_path');             // public path e.g. media/docs/x.pdf
            $table->string('source_url')->nullable();// original URL on fersped.com.mk
            $table->unsignedInteger('year')->nullable();
            $table->unsignedBigInteger('size_bytes')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('published')->default(true);
            $table->timestamps();
        });

        // News / announcements ("Актуелно").
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 5);
            $table->string('slug');
            $table->string('title');
            $table->text('excerpt')->nullable();
            $table->longText('body')->nullable();    // sanitized HTML
            $table->string('image')->nullable();
            $table->boolean('published')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->unique(['locale', 'slug']);
        });

        // Corporate pages migrated from the old site (about, sectors, CSR, …).
        Schema::create('site_pages', function (Blueprint $table) {
            $table->id();
            $table->string('group', 40);            // about | investors | responsibility | sectors | network | services | contact
            $table->string('slug', 80);
            $table->string('title_mk')->nullable();
            $table->string('title_en')->nullable();
            $table->longText('body_mk')->nullable();  // sanitized HTML
            $table->longText('body_en')->nullable();
            $table->string('hero_image')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('published')->default(true);
            $table->timestamps();
            $table->unique(['group', 'slug']);
        });

        // Uploaded images / files usable across the site.
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('path')->unique();        // public path
            $table->string('alt')->nullable();
            $table->string('mime', 100)->nullable();
            $table->unsignedBigInteger('size_bytes')->nullable();
            $table->string('source_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media');
        Schema::dropIfExists('posts');
        Schema::dropIfExists('documents');
        Schema::dropIfExists('document_categories');
        Schema::dropIfExists('services');
        Schema::dropIfExists('content_blocks');
        Schema::dropIfExists('settings');
    }
};
