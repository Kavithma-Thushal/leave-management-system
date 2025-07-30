<?php

namespace App\Repositories\LeaveLogs;

use App\Models\LeaveLogs;
use App\Repositories\CrudRepositoryInterface;

interface LeaveLogsRepositoryInterface extends CrudRepositoryInterface
{
    public function updateLeaveStatus(int $leaveLogId, string $status): void;

    public function findByIdOrFail(int $id): LeaveLogs;
}
