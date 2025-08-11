<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ApplyForLeaveRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => ['required', 'in:annual,casual'],
            'from' => ['required', 'date', 'after:today'],
            'to' => ['required', 'date', 'after_or_equal:from'],
        ];
    }
}
