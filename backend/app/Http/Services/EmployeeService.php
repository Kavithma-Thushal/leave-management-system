<?php

namespace App\Http\Services;

use App\Models\Leave;
use App\Repositories\Employee\EmployeeRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class EmployeeService
{
    protected EmployeeRepositoryInterface $employeeRepositoryInterface;

    public function __construct(EmployeeRepositoryInterface $employeeRepositoryInterface)
    {
        $this->employeeRepositoryInterface = $employeeRepositoryInterface;
    }

    public function getRole()
    {
        try {
            return auth()->user();
        } catch (HttpException $e) {
            throw $e;
        }
    }

    public function applyForLeave(array $data)
    {
        DB::beginTransaction();
        try {
            $user = auth()->user();

            $leave = Leave::create([
                'user_id' => $user->id,
                'leave_type' => $data['leave_type'],
                'from_date' => $data['from_date'],
                'to_date' => $data['to_date'],
                'status' => 'pending'
            ]);

            DB::commit();
            return $leave;
        } catch (HttpException $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
