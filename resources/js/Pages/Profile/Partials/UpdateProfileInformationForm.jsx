import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Button, Input, Label } from '@/Components/FormElements';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const { user } = usePage().props.auth;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} required isFocused autoComplete="name" />
                    {errors.name && <p className="text-sm text-red-600 mt-2">{errors.name}</p>}
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} required autoComplete="username" />
                    {errors.email && <p className="text-sm text-red-600 mt-2">{errors.email}</p>}
                </div>
                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save</Button>
                    {recentlySuccessful && <p className="text-sm text-gray-600">Saved.</p>}
                </div>
            </form>
        </section>
    );
}