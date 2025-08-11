<?php

namespace App\Repositories\LeaveDetails;

use App\Repositories\CrudRepositoryInterface;

interface LeaveDetailsRepositoryInterface extends CrudRepositoryInterface
{
    public function findById(int $userId);
}
