<?php

namespace App\Http\Controllers;

use App\Models\Customer;
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
            'acces' => 'nullable|string',
            'keywords' => 'nullable|string',
            'recurrence' => 'nullable|string',
            'payment_mode' => 'required|in:one_time,subscription',
        ]);

        // Créer une instance de Prestation sans l'insérer
        $prestation = new \App\Models\Prestation($data);

        $prestation->customer()->associate($customer);


        // Générer le lien de paiement et l'UUID
        $prestation->payment_link = $this->createPaymentLink($prestation);
        $prestation->prestation_uuid = Uuid::uuid4()->toString();

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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    private function createPaymentLink($prestation)
    {
        // Configure Stripe avec la clé privée
        Stripe::setApiKey(env('STRIPE_PRIVATE_KEY'));

        // Récupérer l'entreprise associée à la prestation
        $company = \App\Models\Company::find($prestation->company_id);
        $companyName = $company ? $company->name : 'Hostay';

        // Construire le nom du produit
        $productName = $companyName . ' - ' . $prestation->type . ' pour ' . $prestation->sites;

        // Calculer le prix en centimes
        $price = $prestation->price * 100;
        $transaction_id = uniqid('trans_', true);

        // Définir les URLs de succès et d'annulation
        $successUrl = 'https://hostay.fr/paiement-merci?value=' . $price . '&transaction_id=' . $transaction_id;
        $cancelUrl = 'https://hostay.fr/';

        // Récupérer les informations du client lié à la prestation
        $customer = $prestation->customer;

        // Préparer les données de la session
        $sessionData = [
            'payment_method_types' => ['card', 'paypal', 'sepa_debit', 'klarna'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $productName,
                    ],
                    'unit_amount' => $price,
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => $successUrl,
            'cancel_url' => $cancelUrl,
            'automatic_tax' => ['enabled' => false],
            'phone_number_collection' => ['enabled' => true],
            'consent_collection' => ['terms_of_service' => 'required'],
            'tax_id_collection' => ['enabled' => true],
            'billing_address_collection' => 'required',
            // Permet à Stripe de mettre à jour automatiquement le nom du client, requis pour la collecte des Tax ID
            'customer_update' => ['name' => 'auto']
        ];

        // Si un client est lié à la prestation, créer un client Stripe pour préremplir ses infos
        if ($customer) {
            $stripeCustomer = \Stripe\Customer::create([
                'email' => $customer->email,
                'phone' => $customer->phone,
                'name' => $customer->name,
                'address' => [
                    'line1' => $customer->address,
                    'city' => $customer->city,
                    'postal_code' => $customer->zip,
                    'country' => $customer->country,
                ],
            ]);
            // Associer ce client à la session Stripe
            $sessionData['customer'] = $stripeCustomer->id;
        }

        // Créer la session Stripe
        $session = \Stripe\Checkout\Session::create($sessionData);

        // Retourner l'URL de la session
        return $session->url;
    }
}
