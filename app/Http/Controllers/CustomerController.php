<?php

namespace App\Http\Controllers;

use App\Http\Requests\Customer\CustomerStoreRequest;
use App\Models\Customer;
use App\Models\Lead;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::all();  // Récupérer tous les clients
        return Inertia::render('Customer/Index', [
            'customers' => $customers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CustomerStoreRequest $request)
    {
        $customer = new Customer();
        $customer->name = $request->name;
        $customer->phone = $request->phone;
        $customer->email = $request->email;
        $customer->address = $request->address;
        $customer->zip = $request->zip;
        $customer->city = $request->city;
        $customer->country = $request->country;
        $customer->acces=$request->acces;
        $customer->save();
        if($request->get('lead_id')) {
            $lead = Lead::find($request->get('lead_id'));
            $lead->update(['customer_id' => $customer->id]);
        }
        return redirect()->route('customers.index')->with('success', 'Customer created successfully');


    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        $companies = \App\Models\Company::all(); // Récupérer toutes les entreprises

        return Inertia::render('Customer/Show', [
            'customer'  => $customer->load('leads', 'notes', 'prestations'), // Charger les relations nécessaires
            'companies' => $companies, // Ajouter les entreprises aux props
        ]);
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
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email,' . $id, // Ignore l'email actuel du client
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'acces' => 'nullable|string|max:255',
        ]);
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['error' => 'Client non trouvé'], 404);
        }
        $customer->update($validatedData);
        return redirect()->route('customers.index')->with('success', 'Customer updated successfully');

    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $customer = Customer::find($id);
        $customer->delete();
        return redirect()->route('customers.index')->with('success', 'Customer deleted successfully');
    }
}
