import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { Button, Input, Label } from '@/Components/FormElements';

export default function Index({ skills }) {
    const { flash = {} } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        level: 50, // Default level (e.g., 1-100 scale)
    });

    useEffect(() => {
        if (editingSkill) {
            setData({
                name: editingSkill.name,
                level: editingSkill.level,
            });
        }
    }, [editingSkill]);

    const openModal = (skill = null) => {
        setEditingSkill(skill);
        reset();
        if (skill) {
            setData({ name: skill.name, level: skill.level });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingSkill(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            onSuccess: () => closeModal(),
        };
        if (editingSkill) {
            put(route('skills.update', editingSkill.id), options);
        } else {
            post(route('skills.store'), options);
        }
    };
    
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            put(route('skills.destroy', id));
        }
    };


    return (
        <>
            <Head title="My Skills" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">My Skills</h1>
                            <Button onClick={() => openModal()}>Add Skill</Button>
                        </div>
                        
                        {flash.success && (
                            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                                {flash.success}
                            </div>
                        )}

                        <div className="space-y-4">
                            {skills.length > 0 ? (
                                skills.map((skill) => (
                                    <div key={skill.id} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-lg">{skill.name}</span>
                                            <div className="flex items-center space-x-4">
                                                <div className="w-48 bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className="bg-indigo-600 h-2.5 rounded-full"
                                                        style={{ width: `${skill.level}%` }}
                                                    ></div>
                                                </div>
                                                <Button onClick={() => openModal(skill)}>Edit</Button>
                                                <button onClick={() => handleDelete(skill.id)} className="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>You haven't added any skills yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal}>
                <form onSubmit={handleSubmit} className="p-2">
                    <h2 className="text-xl font-bold mb-4">{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h2>
                    
                    <div className="mb-4">
                        <Label htmlFor="name">Skill Name</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors.name} />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="level">Proficiency Level: {data.level}%</Label>
                        <input
                            id="level"
                            type="range"
                            min="1"
                            max="100"
                            value={data.level}
                            onChange={(e) => setData('level', e.target.value)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                         {errors.level && <p className="text-sm text-red-600 mt-2">{errors.level}</p>}
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <Button type="button" onClick={closeModal}>Cancel</Button>
                        <Button type="submit" disabled={processing}>{processing ? 'Saving...' : 'Save'}</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}