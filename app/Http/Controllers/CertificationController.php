<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CertificationController extends Controller
{
    public function index()
    {
        return Inertia::render('Certifications/Index', [
            'certifications' => Certification::where('user_id', auth()->id())->latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Certifications/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'nullable|string|max:255',
            'issued_on' => 'nullable|date',
            'certificate_url' => 'nullable|url'
        ]);

        auth()->user()->certifications()->create($request->all());

        return redirect()->route('certifications.index')->with('success', 'Certification added!');
    }

    public function edit(Certification $certification)
    {
        $this->authorize('update', $certification);

        return Inertia::render('Certifications/Edit', ['certification' => $certification]);
    }

    public function update(Request $request, Certification $certification)
    {
        $this->authorize('update', $certification);

        $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'nullable|string|max:255',
            'issued_on' => 'nullable|date',
            'certificate_url' => 'nullable|url'
        ]);

        $certification->update($request->all());

        return redirect()->route('certifications.index')->with('success', 'Certification updated!');
    }

    public function destroy(Certification $certification)
    {
        $this->authorize('delete', $certification);
        $certification->delete();

        return redirect()->route('certifications.index')->with('success', 'Deleted!');
    }
}
