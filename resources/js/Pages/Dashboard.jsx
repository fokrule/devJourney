import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <>
            <Head title="Dashboard" />
            <AppLayout auth={auth}>
                <h1 className="text-3xl font-bold mb-4">Welcome, {auth.user.name}</h1>
                <Link
                    href={route('profile.show')}
                    className="text-blue-600 hover:underline"
                >
                    ➤ View Public Profile
                </Link>
            </AppLayout>
        </>
    );
}
