<?php

namespace Database\Seeders;

use App\Models\LeaveDetails;
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
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'role' => 'admin',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Employee',
                'email' => 'employee1@example.com',
                'role' => 'employee',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($data as $userData) {

            // Create or update user
            $user = User::updateOrCreate(
                ['email' => $userData['email']],
                $userData
            );

            // If the user is an employee, create leave_details if not exists
            if ($user->role === 'employee') {
                LeaveDetails::firstOrCreate(
                    ['user_id' => $user->id],
                    [
                        'annual' => 20,
                        'casual' => 10,
                    ]
                );
            }
        }
    }
}
