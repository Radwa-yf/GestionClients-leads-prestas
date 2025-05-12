<?php

namespace App\Http\Controllers;
use App\Http\Requests\NoteStoreRequest;
use App\Http\Requests\NoteUpdateRequest;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function store(NoteStoreRequest $request)
    {
       $note= Note::create($request->validated());
        $note->user_id = auth()->id();
        $note->save();

        return redirect()->back()->with('success', 'Note created successfully');
    }

    public function update(NoteUpdateRequest $request, Note $note)
    {
        $note->update($request->validated());

        return redirect()->back()->with('success', 'Note updated successfully');
    }


    public function destroy(Note $note)
    {
        $note->delete();
        return redirect()->back()->with('success', 'Note deleted successfully');
    }

}
