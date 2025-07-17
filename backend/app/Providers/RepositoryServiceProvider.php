<?php

namespace App\Providers;

use App\Repositories\Employee\EmployeeRepository;
use App\Repositories\Employee\EmployeeRepositoryInterface;
use App\Repositories\LeaveDetails\LeaveDetailsRepository;
use App\Repositories\LeaveDetails\LeaveDetailsRepositoryInterface;
use App\Repositories\LeaveLogs\LeaveLogsRepository;
use App\Repositories\LeaveLogs\LeaveLogsRepositoryInterface;
use App\Repositories\User\UserRepository;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(EmployeeRepositoryInterface::class, EmployeeRepository::class);
        $this->app->bind(LeaveDetailsRepositoryInterface::class, LeaveDetailsRepository::class);
        $this->app->bind(LeaveLogsRepositoryInterface::class, LeaveLogsRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
