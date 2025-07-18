<?php

namespace App\Http\Services;

use App\Repositories\Employee\EmployeeRepositoryInterface;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AdminService
{
    protected EmployeeRepositoryInterface $employeeRepositoryInterface;

    public function __construct(EmployeeRepositoryInterface $employeeRepositoryInterface)
    {
        $this->employeeRepositoryInterface = $employeeRepositoryInterface;
    }

    public function viewAllLeaveStatus()
    {
        try {
            $admin = auth()->user();

            if ($admin->role !== 'admin') {
                throw new HttpException(403, 'Unauthorized access!');
            }

            $employees = $this->employeeRepositoryInterface->getAllWith(['leaveDetails', 'leaveLogs']);
            $filtered = $employees->reject(fn($user) => $user->role === 'admin');
            return $filtered;
        } catch (HttpException $e) {
            throw $e;
        }
    }
}
