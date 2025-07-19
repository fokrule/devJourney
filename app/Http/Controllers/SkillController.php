<?php

namespace App\Http\Controllers;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillController extends Controller
{
    public function index()
    {
        return Inertia::render('Skills/Index', [
            'skills' => Skill::where('user_id', auth()->id())->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Skills/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'level' => 'required|integer|min:1|max:100'
        ]);

        auth()->user()->skills()->create($request->only('name', 'level'));

        return redirect()->route('skills.index')->with('success', 'Skill added!');
    }

    public function edit(Skill $skill)
    {
        $this->authorize('update', $skill);

        return Inertia::render('Skills/Edit', ['skill' => $skill]);
    }

    public function update(Request $request, Skill $skill)
    {
        $this->authorize('update', $skill);

        $request->validate([
            'name' => 'required|string|max:255',
            'level' => 'required|integer|min:1|max:5'
        ]);

        $skill->update($request->only('name', 'level'));

        return redirect()->route('skills.index')->with('success', 'Skill updated!');
    }

    public function destroy(Skill $skill)
    {
        $this->authorize('delete', $skill);
        $skill->delete();

        return redirect()->route('skills.index')->with('success', 'Skill deleted!');
    }
}
