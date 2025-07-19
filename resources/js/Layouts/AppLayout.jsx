import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function AppLayout({ title, children }) {
    const { auth } = usePage().props;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title={title} />

            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* Logo */}
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <span className="text-lg font-semibold">DevJourney</span>
                                </Link>
                            </div>

                            {/* Navigation Links for authenticated user */}
                            {auth.user && (
                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <Link href={route('dashboard')} className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition">
                                        Dashboard
                                    </Link>
                                    <Link href={route('projects.index')} className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition">
                                        Projects
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* User Dropdown or Login/Register Links */}
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            {auth.user ? (
                                <div className="ml-3 relative flex items-center">
                                    <span className="mr-3 text-sm text-gray-700">
                                        Welcome, {auth.user.name} 
                                    </span>
                                    <form onSubmit={handleLogout}>
                                        <button type="submit" className="underline text-sm text-gray-600 hover:text-gray-900">
                                            Log Out
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-sm text-gray-700 underline">
                                        Log in
                                    </Link>
                                    <Link href={route('register')} className="ml-4 text-sm text-gray-700 underline">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <main>{children}</main>
        </div>
    );
}