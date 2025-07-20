import React from 'react';
import { Head } from '@inertiajs/react';
import ReactMarkdown from 'react-markdown';

// The main AppLayout is now applied automatically by your app.jsx file.

export default function Show({ blog }) {
    return (
        <>
            <Head title={blog.title} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-8 md:p-12">
                            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">{blog.title}</h1>
                            <p className="text-gray-500 mb-8">
                                Published on {new Date(blog.created_at).toLocaleDateString()}
                            </p>
                            
                            <article className="prose lg:prose-xl max-w-none">
                                <ReactMarkdown>{blog.content}</ReactMarkdown>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// NOTE: The line 'Show.layout = page => page;' has been removed.