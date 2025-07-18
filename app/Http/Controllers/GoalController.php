<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;
use Inertia\Inertia;


class GoalController extends Controller
{
    public function index()
    {
        return Inertia::render('Goals/Index', [
            'goals' => Goal::where('user_id', auth()->id())->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Goals/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'details' => 'nullable|string',
            'status' => 'required|in:planned,in_progress,done'
        ]);

        auth()->user()->goals()->create($request->all());

        return redirect()->route('goals.index')->with('success', 'Goal added!');
    }

    public function edit(Goal $goal)
    {
        $this->authorize('update', $goal);
        return Inertia::render('Goals/Edit', ['goal' => $goal]);
    }

    public function update(Request $request, Goal $goal)
    {
        $this->authorize('update', $goal);

        $request->validate([
            'title' => 'required|string|max:255',
            'details' => 'nullable|string',
            'status' => 'required|in:planned,in_progress,done'
        ]);

        $goal->update($request->all());

        return redirect()->route('goals.index')->with('success', 'Goal updated!');
    }

    public function destroy(Goal $goal)
    {
        $this->authorize('delete', $goal);
        $goal->delete();

        return redirect()->route('goals.index')->with('success', 'Goal deleted!');
    }
}
