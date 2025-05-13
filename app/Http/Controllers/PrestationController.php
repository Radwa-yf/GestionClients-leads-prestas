<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Prestation;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;
use Stripe\Stripe;

class PrestationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Customer $customer)
    {

        $companies = \App\Models\Company::all();
        return Inertia::render('Prestations/Create', [
            'customer' => $customer,
            'companies' => $companies,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Customer $customer)
    {
        $data = $request->validate([
            'company_id' => 'required|exists:company,id',
            'type' => 'required|string',
            'sites' => 'nullable|string',
            'price' => 'required|numeric',
            'abonnement_duration' => 'nullable|integer',
            'keywords' => 'nullable|string',
            'recurrence' => 'nullable|string',
        ]);

        // Créer une instance de Prestation sans l'insérer
        $prestation = new \App\Models\Prestation($data);

        $prestation->customer()->associate($customer);


        // Enregistrer la prestation associée au client
        $customer->prestations()->save($prestation);

        return redirect()->route('customers.show', $customer->id)
            ->with('success', 'Prestation créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function update(Request $request, $customer, $prestation)
    {
        $validatedData = $request->validate([
            'company_id' => 'required|exists:company,id',
            'type' => 'required|string|max:255',
            'sites' => 'nullable|string|max:255',
            'price' => 'required|numeric',
            'abonnement_duration' => 'nullable|integer',
            'keywords' => 'nullable|string|max:255',
            'recurrence' => 'nullable|string|max:255',
        ]);

        $prestationModel = \App\Models\Prestation::find($prestation);

        if (!$prestationModel) {
            return redirect()->route('customers.show', ['customer' => $customer])
                ->with('error', 'Prestation non trouvée.');
        }

        $prestationModel->update($validatedData);

        return redirect()
            ->route('customers.show', ['customer' => $customer]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer, Prestation $prestation)
    {
        $prestation->delete();

        return redirect()->route('customers.show', $customer->id);
    }

}
