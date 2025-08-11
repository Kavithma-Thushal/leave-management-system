<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LoginResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'user_data' => new UserResource($this['user_data']),
            'access_token' => $this['access_token']
        ];
    }
}
