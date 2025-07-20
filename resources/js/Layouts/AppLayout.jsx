import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';

const NavLink = ({ href, active, children }) => (
    <Link
        href={href}
        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition ${
            active
                ? 'border-indigo-400 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
    >
        {children}
    </Link>
);

const ResponsiveNavLink = ({ as, href, active, children }) => {
    const commonClasses = `block w-full pl-3 pr-4 py-2 border-l-4 text-base font-medium transition`;
    const activeClasses = 'border-indigo-400 text-indigo-700 bg-indigo-50';
    const inactiveClasses = 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300';
    const className = `${commonClasses} ${active ? activeClasses : inactiveClasses}`;

    if (as === 'button') {
        return <button className={className}>{children}</button>;
    }
    return <Link href={href} className={className}>{children}</Link>;
};

export default function AppLayout({ title, children }) {
    const { auth } = usePage().props;
    const [showingMobileMenu, setShowingMobileMenu] = useState(false);
    const [showingProfileDropdown, setShowingProfileDropdown] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title={title} />

            <nav className="bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <span className="text-lg font-semibold">DevJourney</span>
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</NavLink>
                                <NavLink href={route('projects.index')} active={route().current('projects.index')}>Projects</NavLink>
                                <NavLink href={route('skills.index')} active={route().current('skills.index')}>Skills</NavLink>
                                <NavLink href={route('certifications.index')} active={route().current('certifications.index')}>Certifications</NavLink>
                                <NavLink href={route('blogs.index')} active={route().current('blogs.index')}>Blog</NavLink>
                                <NavLink href={route('goals.index')} active={route().current('goals.index')}>Goals</NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            {auth.user ? (
                                <div className="ml-3 relative">
                                    <button onClick={() => setShowingProfileDropdown(prev => !prev)} className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                                        {auth.user.name}
                                        <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                    </button>
                                    <div className={`absolute z-50 mt-2 w-48 rounded-md shadow-lg origin-top-right right-0 ${showingProfileDropdown ? 'block' : 'hidden'}`}>
                                        <div className="rounded-md ring-1 ring-black ring-opacity-5 py-1 bg-white">
                                            {/* THIS IS THE FIX */}
                                            <Link href={route('profile.show')} onClick={() => setShowingProfileDropdown(false)} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                                            <form onSubmit={handleLogout}>
                                                <button type="submit" className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">Log Out</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-sm text-gray-700 underline">Log in</Link>
                                    <Link href={route('register')} className="ml-4 text-sm text-gray-700 underline">Register</Link>
                                </>
                            )}
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button onClick={() => setShowingMobileMenu(prev => !prev)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!showingMobileMenu ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={showingMobileMenu ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingMobileMenu ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>
                         {/* Add other responsive links here later if needed */}
                    </div>
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        {auth.user ? (
                            <>
                                <div className="px-4">
                                    <div className="font-medium text-base text-gray-800">{auth.user.name}</div>
                                    <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                                </div>
                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink href={route('profile.show')}>Profile</ResponsiveNavLink>
                                    <form onSubmit={handleLogout}>
                                        <ResponsiveNavLink as="button">Log Out</ResponsiveNavLink>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-1">
                                <ResponsiveNavLink href={route('login')}>Log In</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('register')}>Register</ResponsiveNavLink>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}