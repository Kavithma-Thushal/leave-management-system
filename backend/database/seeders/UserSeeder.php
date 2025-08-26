<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Employee',
                'email' => 'employee1@example.com',
                'password' => Hash::make('password'),
                'role' => 'employee',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($data as $userData) {
            $role = $userData['role'];
            unset($userData['role']);

            $user = User::updateOrCreate(['email' => $userData['email']], $userData);
            $user->assignRole($role);
        }
    }
}
