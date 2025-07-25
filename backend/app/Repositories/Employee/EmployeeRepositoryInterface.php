<?php

namespace App\Repositories\Employee;

use App\Repositories\CrudRepositoryInterface;

interface EmployeeRepositoryInterface extends CrudRepositoryInterface
{
    public function getAllWith(array $relations = []);
}
