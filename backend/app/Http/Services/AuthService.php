<?php

namespace App\Http\Services;

use App\Enums\HttpStatus;
use App\Repositories\LeaveDetails\LeaveDetailsRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AuthService
{
    protected UserRepositoryInterface $userRepositoryInterface;
    protected LeaveDetailsRepositoryInterface $leaveDetailsRepositoryInterface;

    public function __construct(UserRepositoryInterface $userRepositoryInterface, LeaveDetailsRepositoryInterface $leaveDetailsRepositoryInterface)
    {
        $this->userRepositoryInterface = $userRepositoryInterface;
        $this->leaveDetailsRepositoryInterface = $leaveDetailsRepositoryInterface;
    }

    public function register(array $data)
    {
        DB::beginTransaction();
        try {
            $user = $this->userRepositoryInterface->create($data);
            $this->leaveDetailsRepositoryInterface->create([
                'user_id' => $user->id,
                'annual' => 20,
                'casual' => 10,
            ]);

            DB::commit();
            return $user;

        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function login(array $data)
    {
        // Check Email
        $user = $this->userRepositoryInterface->findByEmail($data['email']);
        if (!$user) {
            throw new HttpException(HttpStatus::UNPROCESSABLE_CONTENT, 'Email invalid!');
        }

        // Check Password
        $password = Hash::check($data['password'], $user->password);
        if (!$password) {
            throw new HttpException(HttpStatus::UNPROCESSABLE_CONTENT, 'Password invalid!');
        }

        // Create Token
        $token = $user->createToken('lms')->accessToken;
        if ($token == null) {
            throw new HttpException(HttpStatus::INTERNAL_SERVER_ERROR, 'Token generate failed!');
        }

        return ['user' => $user, 'access_token' => $token];

    }
}
