import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

// The main AppLayout is applied automatically, so we don't include it here.

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 border-b border-gray-200">
                            <h2 className="text-2xl font-semibold">Welcome, {auth.user.name}</h2>
                            <p className="mt-2 text-gray-600">
                                This is your private dashboard. From here, you can manage all the content for your public portfolio.
                            </p>
                            <Link 
                                href={route('public.profile', auth.user.username)}
                                className="inline-block mt-4 text-sm text-indigo-600 hover:text-indigo-900"
                            >
                                View Your Public Profile &rarr;
                            </Link>
                        </div>

                        {/* Example Stat Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                            <Link href={route('projects.index')} className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition">
                                <h3 className="font-bold text-lg">Projects</h3>
                                <p className="text-sm text-gray-600">Manage your portfolio projects.</p>
                            </Link>
                            <Link href={route('skills.index')} className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition">
                                <h3 className="font-bold text-lg">Skills</h3>
                                <p className="text-sm text-gray-600">Update your skills and proficiency.</p>
                            </Link>
                             <Link href={route('blogs.index')} className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition">
                                <h3 className="font-bold text-lg">Blog</h3>
                                <p className="text-sm text-gray-600">Write and manage your posts.</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}