<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class GoalController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        return Inertia::render('Goals/Index', [
            'goals' => Goal::where('user_id', auth()->id())->orderBy('created_at', 'desc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'details' => 'nullable|string',
        ]);

        auth()->user()->goals()->create(array_merge($validated, ['status' => 'planned']));

        return redirect()->route('goals.index')->with('success', 'Goal added!');
    }

    public function update(Request $request, Goal $goal)
    {
        $this->authorize('update', $goal);

        $validated = $request->validate([
            'status' => 'required|in:planned,in_progress,done'
        ]);

        $goal->update($validated);

        // THE FIX IS HERE: Return back instead of redirecting to the index route.
        return back();
    }

    public function destroy(Goal $goal)
    {
        $this->authorize('delete', $goal);
        $goal->delete();

        return redirect()->route('goals.index')->with('success', 'Goal deleted!');
    }
}