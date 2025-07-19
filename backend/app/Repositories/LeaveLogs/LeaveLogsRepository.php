<?php

namespace App\Repositories\LeaveLogs;

use App\Models\LeaveLogs;
use App\Repositories\CrudRepository;

class LeaveLogsRepository extends CrudRepository implements LeaveLogsRepositoryInterface
{
    public function __construct(LeaveLogs $model)
    {
        parent::__construct($model);
    }

    public function updateLeaveStatus(int $leaveLogId, string $status): void
    {
        $leaveLog = $this->model->findOrFail($leaveLogId);
        $leaveLog->status = $status;
        $leaveLog->save();
    }
}
