<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeadPotentialValueRequest;
use App\Http\Requests\LeadStatusRequest;
use App\Http\Requests\LeadNoteRequest;

use App\Http\Requests\LeadStoreRequest;
use Illuminate\Http\Request;
use App\Models\Lead;
use App\Models\Company;



class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $leads = Lead::with(['notes', 'company'])
            ->orderBy('created_at', 'desc')
            ->get();
        $sources = Lead::select('source')->distinct()->orderBy('source')->get();
        // Récupérer les leads paginés
        $companies = Company::whereIn('id', [1, 2, 3])->get();




        return inertia("Lead/Index" , [
            'leads' => $leads, // Les leads paginés
            'sources' => $sources, // Les sources distinctes
            'companies' => $companies,

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LeadStoreRequest $request)
    {
        Lead::create($request->validated());
        return redirect()->route('leads.index')->with('success', 'Lead created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show($leadId)
    {

    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,Lead $lead)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string',
            'source' => 'required|string|max:255',
            'company_id' => 'required|exists:company,id',
            'status' => 'required|string|in:new,no-response,waiting',
            'sites' => 'nullable|string|max:1000',
            'project' => 'nullable|string|max:10000',
        ]);

        $lead->update($validated);
        return redirect()->route('leads.index')->with('success', 'Lead updated successfully');
    }
    public function updateStatus(LeadStatusRequest $request, Lead $lead)
    {
        $lead->update($request->only('status'));
        return redirect()->route('leads.index')->with('success', 'Lead status updated successfully');
    }
    public function updatePotentialValue(LeadPotentialValueRequest $request, Lead $lead)
    {
        $lead->update($request->only('valeur_potentielle'));
        return redirect()->route('leads.index')->with('success', 'Lead value updated successfully');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lead $lead)
    {
        $lead->delete();
        return redirect()->route('leads.index')->with('success', 'Lead deleted successfully');
    }
    public function spam(Lead $lead)
    {
        $lead->update(['status' => 'spam']);
        $lead->delete();
        return redirect()->route('leads.index')->with('success', 'Lead deleted successfully');
    }

}
