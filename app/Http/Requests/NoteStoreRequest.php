<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NoteStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Modifier si besoin pour gérer l'authentification
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
