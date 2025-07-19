import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';

// AppLayout is no longer imported or used here

export default function Index({ projects }) {
    const { flash = {} } = usePage().props;

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            router.delete(route('projects.destroy', id));
        }
    };

    return (
        <>
            <Head title="My Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">My Projects</h1>
                            <Link
                                href={route('projects.create')}
                                className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition"
                            >
                                Add Project
                            </Link>
                        </div>

                        {flash.success && (
                            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md" role="alert">
                                {flash.success}
                            </div>
                        )}

                        <div className="space-y-4">
                            {projects.length > 0 ? (
                                projects.map((project) => (
                                    <div key={project.id} className="border rounded-lg p-4 flex justify-between items-center transition hover:shadow-md">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">{project.title}</h2>
                                            <p className="text-sm text-gray-500 mt-1">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    project.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {project.status}
                                                </span>
                                            </p>
                                            <p className="mt-2 text-gray-600">{project.description.substring(0, 150)}...</p>
                                        </div>
                                        <div className="flex-shrink-0 flex space-x-2">
                                            <Link
                                                href={route('projects.edit', project.id)}
                                                className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                type="button"
                                                className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">You haven't added any projects yet. Click "Add Project" to get started!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}