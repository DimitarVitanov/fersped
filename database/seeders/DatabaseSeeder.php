<?php

namespace Database\Seeders;

use App\Models\User;
use App\Support\SiteContent;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@fersped.com.mk'],
            [
                'name' => 'Administrator',
                'password' => Hash::make(env('ADMIN_PASSWORD', 'fersped-admin-2026')),
            ],
        );

        $this->call([
            ConfigContentSeeder::class,
            LegacyContentSeeder::class,
        ]);

        SiteContent::bump();
    }
}
