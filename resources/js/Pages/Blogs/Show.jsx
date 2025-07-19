import React from 'react';
import { Head } from '@inertiajs/react';
import ReactMarkdown from 'react-markdown';

export default function Show({ blog }) {
    return (
        <>
            <Head title={blog.title} />
            
            {/* We use a custom layout for the public blog view */}
            <div className="bg-gray-100 font-sans leading-normal tracking-normal">
                <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">{blog.title}</h1>
                        <p className="text-gray-500 mb-8">Published on {new Date(blog.created_at).toLocaleDateString()}</p>
                        
                        <div className="prose lg:prose-xl max-w-none">
                            <ReactMarkdown>{blog.content}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// This line prevents the main dashboard layout from being applied
Show.layout = page => page;