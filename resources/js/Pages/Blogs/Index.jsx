import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function Index({ blogs }) {
    const { flash = {} } = usePage().props;

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            router.delete(route('blogs.destroy', id));
        }
    };

    return (
        <>
            <Head title="My Blog Posts" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">My Blog Posts</h1>
                            <Link href={route('blogs.create')} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700">
                                Write a Post
                            </Link>
                        </div>

                        {flash.success && (
                            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                                {flash.success}
                            </div>
                        )}

                        <div className="space-y-4">
                            {blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <div key={blog.id} className="border rounded-lg p-4 flex justify-between items-center">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">{blog.title}</h2>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Last updated: {new Date(blog.updated_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex space-x-4">
                                            <Link href={route('blogs.show', blog.slug)} className="px-3 py-1 text-sm font-medium text-green-600 hover:text-green-900">View</Link>
                                            <Link href={route('blogs.edit', blog.id)} className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-900">Edit</Link>
                                            <button onClick={() => handleDelete(blog.id)} className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-900">Delete</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>You haven't written any blog posts yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}