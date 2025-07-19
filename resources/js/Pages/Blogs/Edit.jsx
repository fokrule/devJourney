import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button, Input, Label, Textarea } from '@/Components/FormElements';

export default function Edit({ blog }) {
    const { data, setData, put, processing, errors } = useForm({
        title: blog.title || '',
        content: blog.content || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('blogs.update', blog.id));
    };

    return (
        <>
            <Head title="Edit Post" />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-semibold mb-6">Edit Post</h1>
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} error={errors.title} />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="content">Content (Markdown supported)</Label>
                                <Textarea id="content" value={data.content} onChange={(e) => setData('content', e.target.value)} error={errors.content} rows={15} />
                            </div>
                            <div className="mt-6">
                                <Button type="submit" disabled={processing}>Save Changes</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}