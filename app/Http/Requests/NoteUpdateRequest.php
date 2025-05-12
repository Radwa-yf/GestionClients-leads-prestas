<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NoteUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Modifier si besoin
    }

    public function rules(): array
    {
        return [
            'morphable_type' => 'required|string',
            'morphable_id' => 'required|integer',
            'content' => 'nullable|string',
        ];
    }
}
