<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests; 
class ProjectController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a list of the user's projects.
     */
    public function index(): Response
    {
        return Inertia::render('Projects/Index', [
            'projects' => auth()->user()->projects()->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new project.
     */
    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    /**
     * Store a newly created project in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => ['required', Rule::in(['In Progress', 'Completed', 'Archived'])],
            'tech_stack' => 'nullable|string|max:255',
            'github_url' => 'nullable|url|max:255',
            'demo_url' => 'nullable|url|max:255',
            // We will handle file uploads for cover_image later
        ]);

        auth()->user()->projects()->create($validated);

        return Redirect::route('projects.index')->with('success', 'Project created successfully.');
    }

    /**
     * Show the form for editing the specified project.
     */
    public function edit(Project $project): Response
    {
        $this->authorize('update', $project);

        return Inertia::render('Projects/Edit', [
            'project' => $project
        ]);
    }

    /**
     * Update the specified project in storage.
     */
    public function update(Request $request, Project $project)
    {
        $this->authorize('update', $project);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => ['required', Rule::in(['In Progress', 'Completed', 'Archived'])],
            'tech_stack' => 'nullable|string|max:255',
            'github_url' => 'nullable|url|max:255',
            'demo_url' => 'nullable|url|max:255',
        ]);

        $project->update($validated);

        return Redirect::route('projects.index')->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified project from storage.
     */
    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);

        $project->delete();

        return Redirect::route('projects.index')->with('success', 'Project deleted successfully.');
    }
}