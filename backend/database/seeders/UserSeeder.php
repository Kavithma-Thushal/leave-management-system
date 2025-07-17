<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Kavithma',
                'email' => 'kavithma@gmail.com',
                'role' => 'admin',
                'password' => Hash::make('1234'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Kamal',
                'email' => 'kamal@gmail.com',
                'role' => 'user',
                'password' => Hash::make('1234'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($data as $user) {
            User::updateOrCreate(
                ['email' => $user['email']],
                $user
            );
        }
    }
}
