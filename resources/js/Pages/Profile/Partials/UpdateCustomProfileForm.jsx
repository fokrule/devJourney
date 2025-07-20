import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Button, Input, Label, Textarea } from '@/Components/FormElements';

export default function UpdateCustomProfileForm({ className = '' }) {
    const { user } = usePage().props.auth;

    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        username: user.username || '',
        bio: user.bio || '',
        github_handle: user.github_handle || '',
        linkedin_url: user.linkedin_url || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('user-profile-information.update'));
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Custom Profile Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's custom profile information for your public portfolio.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" value={data.username} onChange={e => setData('username', e.target.value)} error={errors.username} className="mt-1 block w-full" />
                </div>
                <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" value={data.bio} onChange={e => setData('bio', e.target.value)} error={errors.bio} className="mt-1 block w-full" />
                </div>
                <div>
                    <Label htmlFor="github_handle">GitHub Handle</Label>
                    <Input id="github_handle" value={data.github_handle} onChange={e => setData('github_handle', e.target.value)} error={errors.github_handle} className="mt-1 block w-full" />
                </div>
                <div>
                    <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                    <Input id="linkedin_url" value={data.linkedin_url} onChange={e => setData('linkedin_url', e.target.value)} error={errors.linkedin_url} className="mt-1 block w-full" />
                </div>
                
                <div className="flex items-center gap-4">
                    {/* THIS IS THE FIX: Added type="submit" */}
                    <Button type="submit" disabled={processing}>Save</Button>
                    {recentlySuccessful && <p className="text-sm text-gray-600">Saved.</p>}
                </div>
            </form>
        </section>
    );
}