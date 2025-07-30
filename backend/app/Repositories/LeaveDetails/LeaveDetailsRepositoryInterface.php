<?php

namespace App\Repositories\LeaveDetails;

use App\Models\LeaveDetails;
use App\Repositories\CrudRepositoryInterface;

interface LeaveDetailsRepositoryInterface extends CrudRepositoryInterface
{
    public function findByUserIdOrFail(int $userId): LeaveDetails;
}
