<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Lead;
use App\Models\Prestation;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'leadsCount' => Lead::count(),
            'customersCount' => Customer::count(),
            'prestationsCount' => Prestation::count(),
        ]);
    }
}
