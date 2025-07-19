import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import {
    Button,
    Input,
    Label,
    Select,
    Textarea,
} from '@/Components/FormElements'; // We'll create this component next

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        status: 'In Progress',
        tech_stack: '',
        github_url: '',
        demo_url: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    return (
        <>
            <Head title="Add Project" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-semibold mb-6">
                                Add a New Project
                            </h1>
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        error={errors.title}
                                    />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData('description', e.target.value)
                                        }
                                        error={errors.description}
                                    />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData('status', e.target.value)
                                        }
                                        error={errors.status}
                                    >
                                        <option>In Progress</option>
                                        <option>Completed</option>
                                        <option>Archived</option>
                                    </Select>
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="tech_stack">
                                        Tech Stack (comma-separated)
                                    </Label>
                                    <Input
                                        id="tech_stack"
                                        type="text"
                                        value={data.tech_stack}
                                        onChange={(e) =>
                                            setData('tech_stack', e.target.value)
                                        }
                                        error={errors.tech_stack}
                                    />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="github_url">
                                        GitHub URL
                                    </Label>
                                    <Input
                                        id="github_url"
                                        type="url"
                                        value={data.github_url}
                                        onChange={(e) =>
                                            setData('github_url', e.target.value)
                                        }
                                        error={errors.github_url}
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <Label htmlFor="demo_url">
                                        Demo URL
                                    </Label>
                                    <Input
                                        id="demo_url"
                                        type="url"
                                        value={data.demo_url}
                                        onChange={(e) =>
                                            setData('demo_url', e.target.value)
                                        }
                                        error={errors.demo_url}
                                    />
                                </div>


                                <div className="mt-6">
                                    <Button type="submit" disabled={processing}>
                                        Create Project
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}