<?php

namespace App\Http\Controllers;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        return Inertia::render('Blogs/Index', [
            'blogs' => Blog::where('user_id', auth()->id())->latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Blogs/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        auth()->user()->blogs()->create($request->only('title', 'content'));

        return redirect()->route('blogs.index')->with('success', 'Blog created!');
    }

    public function edit(Blog $blog)
    {
        $this->authorize('update', $blog);

        return Inertia::render('Blogs/Edit', ['blog' => $blog]);
    }

    public function update(Request $request, Blog $blog)
    {
        $this->authorize('update', $blog);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        $blog->update($request->only('title', 'content'));

        return redirect()->route('blogs.index')->with('success', 'Blog updated!');
    }

    public function destroy(Blog $blog)
    {
        $this->authorize('delete', $blog);
        $blog->delete();

        return redirect()->route('blogs.index')->with('success', 'Blog deleted!');
    }
}
