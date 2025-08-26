<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();

        // Clear cached permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Truncate relevant tables
        Permission::truncate();
        Role::truncate();

        $guard = 'api';

        // Create Roles
        $admin = Role::firstOrCreate(['name' => 'admin', 'guard_name' => $guard]);
        $employee = Role::firstOrCreate(['name' => 'employee', 'guard_name' => $guard]);

        // Create Permissions
        $applyForLeave = Permission::updateOrCreate(['name' => 'apply-for-leave', 'guard_name' => $guard]);
        $getLeaveLogs = Permission::updateOrCreate(['name' => 'get-leave-logs', 'guard_name' => $guard]);
        $getLeaveDetails = Permission::updateOrCreate(['name' => 'get-leave-details', 'guard_name' => $guard]);
        $changeLeaveStatus = Permission::updateOrCreate(['name' => 'change-leave-status', 'guard_name' => $guard]);
        $getEmployeeDetails = Permission::updateOrCreate(['name' => 'get-employee-details', 'guard_name' => $guard]);

        // Assign Permissions
        $employee->syncPermissions([
            $applyForLeave,
            $getLeaveLogs,
            $getLeaveDetails,
        ]);
        $admin->syncPermissions([
            $changeLeaveStatus,
            $getEmployeeDetails,
        ]);

        Schema::enableForeignKeyConstraints();
    }
}
