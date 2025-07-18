<?php

namespace App\Http\Controllers;

use App\Models\Endorsement;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EndorsementController extends Controller
{
     public function index()
    {
        return Inertia::render('Endorsements/Index', [
            'endorsements' => Endorsement::with('endorser')
                ->where('user_id', auth()->id())
                ->latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Endorsements/Create', [
            'users' => User::where('id', '!=', auth()->id())->select('id', 'name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'message' => 'required|string|max:500'
        ]);

        Endorsement::create([
            'user_id' => $request->user_id,
            'endorsed_by' => auth()->id(),
            'message' => $request->message
        ]);

        return redirect()->route('endorsements.index')->with('success', 'Endorsement added!');
    }

    public function destroy(Endorsement $endorsement)
    {
        $this->authorize('delete', $endorsement);
        $endorsement->delete();

        return redirect()->route('endorsements.index')->with('success', 'Deleted!');
    }
}
