<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LeaveDetailResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'annual' => $this->annual,
            'casual' => $this->casual,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
