<?php

namespace App\Repositories\LeaveDetails;

use App\Models\LeaveDetails;
use App\Repositories\CrudRepository;

class LeaveDetailsRepository extends CrudRepository implements LeaveDetailsRepositoryInterface
{
    public function __construct(LeaveDetails $model)
    {
        parent::__construct($model);
    }

    public function findById(int $userId)
    {
        return $this->model->where('user_id', $userId)->first();
    }
}
