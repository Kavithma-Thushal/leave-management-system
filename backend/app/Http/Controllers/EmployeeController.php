<?php

namespace App\Http\Controllers;

use App\Classes\ErrorResponse;
use App\Http\Resources\SuccessResource;
use App\Http\Resources\UserResource;
use Symfony\Component\HttpKernel\Exception\HttpException;

class EmployeeController extends Controller
{

    public function getRole()
    {
        try {
            return new SuccessResource([
                'message' => 'User role retrieved successfully!',
                'data' => new userResource(auth()->user())
            ]);
        } catch (HttpException $e) {
            ErrorResponse::throwException($e);
        }
    }

    public function applyForLeave()
    {
        try {
            return new SuccessResource([
                'message' => 'Applied for leave successfully!',
                'data' => null
            ]);
        } catch (HttpException $e) {
            ErrorResponse::throwException($e);
        }
    }

    public function viewLeaveStatus()
    {
        try {
            return new SuccessResource([
                'message' => 'Viewed leave status successfully!',
                'data' => null
            ]);
        } catch (HttpException $e) {
            ErrorResponse::throwException($e);
        }
    }
}
