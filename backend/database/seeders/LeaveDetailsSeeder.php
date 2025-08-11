<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\LeaveDetails;
use Illuminate\Database\Seeder;

class LeaveDetailsSeeder extends Seeder
{
    public function run(): void
    {
        $employees = User::where('role', 'employee')->get();
        foreach ($employees as $employee) {
            LeaveDetails::firstOrCreate(
                ['user_id' => $employee->id],
                [
                    'annual' => 20,
                    'casual' => 10,
                ]
            );
        }
    }
}
