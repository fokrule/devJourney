import React from 'react';
import { Head, Link } from '@inertiajs/react';

// Reusable Section Component
const ProfileSection = ({ title, children }) => (
    <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-6">{title}</h2>
        {children}
    </section>
);

export default function Show({ profileUser, skills, projects, blogs, certifications, goals }) {
    return (
        <>
            <Head title={`${profileUser.name}'s Profile`} />
            <div className="bg-gray-50 min-h-screen">
                <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    {/* Header/Bio Section */}
                    <header className="flex flex-col md:flex-row items-center mb-12">
                        <img className="h-32 w-32 rounded-full object-cover mr-8 mb-4 md:mb-0" src={profileUser.profile_photo_url} alt={profileUser.name} />
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900">{profileUser.name}</h1>
                            <p className="mt-2 text-lg text-gray-600">{profileUser.bio}</p>
                            <div className="mt-4 flex space-x-4">
                                {profileUser.github_handle && <a href={`https://github.com/${profileUser.github_handle}`} className="text-gray-500 hover:text-gray-900">GitHub</a>}
                                {profileUser.linkedin_url && <a href={profileUser.linkedin_url} className="text-gray-500 hover:text-gray-900">LinkedIn</a>}
                            </div>
                        </div>
                    </header>
                    
                    {/* Skills Section */}
                    <ProfileSection title="Skills">
                        <div className="flex flex-wrap gap-4">
                            {skills.map(skill => (
                                <div key={skill.id} className="bg-white p-4 rounded-lg shadow-sm w-full md:w-[calc(50%-0.5rem)]">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-semibold text-gray-800">{skill.name}</h3>
                                        <span className="text-sm text-gray-500">{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ProfileSection>

                    {/* Projects Section */}
                    <ProfileSection title="Projects">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projects.map(project => (
                                <div key={project.id} className="bg-white p-6 rounded-lg shadow-sm">
                                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                    <p className="text-gray-600 mb-4">{project.description}</p>
                                    <div className="flex space-x-4 text-sm font-medium">
                                        {project.github_url && <a href={project.github_url} className="text-indigo-600 hover:text-indigo-900">View Code</a>}
                                        {project.demo_url && <a href={project.demo_url} className="text-green-600 hover:text-green-900">Live Demo</a>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ProfileSection>
                    
                    {/* Latest Blog Posts Section */}
                    <ProfileSection title="Latest Posts">
                        <div className="space-y-6">
                            {blogs.map(blog => (
                                <Link key={blog.id} href={route('blogs.show', blog.slug)} className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                                    <h3 className="text-xl font-bold">{blog.title}</h3>
                                    <p className="text-sm text-gray-500">Published on {new Date(blog.created_at).toLocaleDateString()}</p>
                                </Link>
                            ))}
                        </div>
                    </ProfileSection>

                </main>
            </div>
        </>
    );
}

// This page has its own layout, so we prevent the main AppLayout from being used.
Show.layout = page => page;