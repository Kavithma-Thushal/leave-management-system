<?php

namespace App\Repositories\Employee;

use App\Models\User;
use App\Repositories\CrudRepository;

class EmployeeRepository extends CrudRepository implements EmployeeRepositoryInterface
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    public function getAllWith(array $relations = [])
    {
        return $this->model->with($relations)->get();
    }
}
