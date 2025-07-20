import React from 'react';
import { Head, Link } from '@inertiajs/react';

// A reusable component to keep the page structure clean
const ProfileSection = ({ title, children }) => (
    <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">{title}</h2>
        {children}
    </section>
);

// A card for displaying a single GitHub repository
const GitHubRepoCard = ({ repo }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col h-full border hover:border-indigo-500 transition">
        <div className="flex-grow">
            <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 text-gray-500"><path d="M12 2.25a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 6a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9z" /><path fillRule="evenodd" d="M3.75 8.25a.75.75 0 01.75-.75h15a.75.75 0 01.75.75v10.5a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25zm1.5 0V18h12V8.25H5.25z" clipRule="evenodd" /></svg>
                <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-indigo-600 hover:text-indigo-800 truncate">{repo.name}</a>
            </div>
            <p className="text-gray-600 text-sm mb-4 h-16">{repo.description}</p>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-auto">
            {repo.primaryLanguage && (<div className="flex items-center mr-4"><span className="h-3 w-3 rounded-full mr-1.5" style={{ backgroundColor: repo.primaryLanguage.color }}></span>{repo.primaryLanguage.name}</div>)}
            <span className="flex items-center mr-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>{repo.stargazers.totalCount}</span>
        </div>
    </div>
);


export default function Show({ profileUser, skills, projects, blogs, certifications, goals, githubRepos }) {
    return (
        <>
            <Head title={`${profileUser.name}'s Profile`} />
            <div className="bg-gray-50 min-h-screen font-sans">
                <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <header className="flex flex-col md:flex-row items-center mb-16 text-center md:text-left">
                        <img className="h-32 w-32 rounded-full object-cover mr-0 md:mr-8 mb-4 md:mb-0 ring-4 ring-white shadow-lg" src={profileUser.profile_photo_url} alt={profileUser.name} />
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900">{profileUser.name}</h1>
                            <p className="mt-2 text-lg text-gray-600">{profileUser.bio}</p>
                            <div className="mt-4 flex space-x-4 justify-center md:justify-start">
                                {profileUser.github_handle && <a href={`https://github.com/${profileUser.github_handle}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 font-medium">GitHub</a>}
                                {profileUser.linkedin_url && <a href={profileUser.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 font-medium">LinkedIn</a>}
                            </div>
                        </div>
                    </header>
                    {console.log(githubRepos)}
                    {githubRepos && githubRepos.length > 0 && (
                        <ProfileSection title="Pinned Repositories">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {githubRepos.map(repo => <GitHubRepoCard key={repo.name} repo={repo} />)}
                            </div>
                        </ProfileSection>
                    )}

                    {skills && skills.length > 0 && (
                        <ProfileSection title="Skills">
                            <div className="flex flex-wrap gap-4">
                                {skills.map(skill => (
                                    <div key={skill.id} className="bg-white p-4 rounded-lg shadow-sm w-full md:w-[calc(50%-0.5rem)] border">
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
                    )}

                    {certifications && certifications.length > 0 && (
                        <ProfileSection title="Certifications">
                            <div className="space-y-4">
                                {certifications.map(cert => (
                                    <div key={cert.id} className="bg-white p-4 rounded-lg shadow-sm border">
                                        <h3 className="font-bold text-gray-800">{cert.title}</h3>
                                        <p className="text-sm text-gray-600">Issued by {cert.issuer} - {new Date(cert.issued_on).toLocaleDateString()}</p>
                                        {cert.certificate_url && <a href={cert.certificate_url} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-900">View Credential</a>}
                                    </div>
                                ))}
                            </div>
                        </ProfileSection>
                    )}

                    {projects && projects.length > 0 && (
                        <ProfileSection title="Projects">
                            <div className="space-y-6">
                                {projects.map(project => (
                                    <div key={project.id} className="bg-white p-6 rounded-lg shadow-sm border">
                                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-gray-600 mb-4">{project.description}</p>
                                        <div className="flex space-x-4 text-sm font-medium">
                                            {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">View Code &rarr;</a>}
                                            {project.demo_url && <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-900">Live Demo &rarr;</a>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ProfileSection>
                    )}
                    
                    {goals && goals.length > 0 && (
                        <ProfileSection title="Learning & Goals">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {goals.map(goal => (
                                    <div key={goal.id} className="bg-white p-4 rounded-lg shadow-sm border">
                                        <h3 className="font-semibold text-gray-800">{goal.title}</h3>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${goal.status === 'done' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {goal.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </ProfileSection>
                    )}
                    
                    {blogs && blogs.length > 0 && (
                        <ProfileSection title="Latest Posts">
                            <div className="space-y-4">
                                {blogs.map(blog => (
                                    <Link key={blog.id} href={route('blogs.show', blog.slug)} className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition border">
                                        <h3 className="text-xl font-bold text-gray-800 hover:text-indigo-600">{blog.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">Published on {new Date(blog.created_at).toLocaleDateString()}</p>
                                    </Link>
                                ))}
                            </div>
                        </ProfileSection>
                    )}

                </main>
            </div>
        </>
    );
}

Show.layout = page => page;