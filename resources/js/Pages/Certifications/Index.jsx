import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { Button, Input, Label, SecondaryButton } from '@/Components/FormElements';

export default function Index({ certifications }) {
    const { flash = {} } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCert, setEditingCert] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        issuer: '',
        issued_on: '',
        certificate_url: '',
    });

    useEffect(() => {
        if (editingCert) {
            setData({
                title: editingCert.title,
                issuer: editingCert.issuer,
                issued_on: editingCert.issued_on,
                certificate_url: editingCert.certificate_url || '',
            });
        }
    }, [editingCert]);

    const openModal = (cert = null) => {
        setEditingCert(cert);
        reset();
        if (cert) {
            setData({
                title: cert.title,
                issuer: cert.issuer,
                issued_on: cert.issued_on,
                certificate_url: cert.certificate_url || '',
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCert(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = { onSuccess: () => closeModal() };
        if (editingCert) {
            put(route('certifications.update', editingCert.id), options);
        } else {
            post(route('certifications.store'), options);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this certification?')) {
            router.delete(route('certifications.destroy', id));
        }
    };

    return (
        <>
            <Head title="My Certifications" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">My Certifications</h1>
                            <Button onClick={() => openModal()}>Add Certification</Button>
                        </div>

                        {flash.success && (
                            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                                {flash.success}
                            </div>
                        )}

                        <div className="space-y-4">
                            {certifications.length > 0 ? (
                                certifications.map((cert) => (
                                    <div key={cert.id} className="border rounded-lg p-4 flex justify-between items-center">
                                        <div>
                                            <h2 className="font-bold text-lg text-gray-900">{cert.title}</h2>
                                            <p className="text-gray-600">Issued by {cert.issuer} on {new Date(cert.issued_on).toLocaleDateString()}</p>
                                            {cert.certificate_url && (
                                                <a href={cert.certificate_url} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-900">
                                                    View Credential
                                                </a>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <button onClick={() => openModal(cert)} className="text-blue-600 hover:text-blue-900 text-sm font-medium">Edit</button>
                                            <button onClick={() => handleDelete(cert.id)} className="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>You haven't added any certifications yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal}>
                <form onSubmit={handleSubmit} className="p-2">
                    <h2 className="text-xl font-bold mb-4">{editingCert ? 'Edit Certification' : 'Add New Certification'}</h2>
                    
                    <div className="mb-4">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} error={errors.title} />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="issuer">Issuing Organization</Label>
                        <Input id="issuer" value={data.issuer} onChange={(e) => setData('issuer', e.target.value)} error={errors.issuer} />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="issued_on">Date Issued</Label>
                        <Input id="issued_on" type="date" value={data.issued_on} onChange={(e) => setData('issued_on', e.target.value)} error={errors.issued_on} />
                    </div>
                    
                    <div className="mb-4">
                        <Label htmlFor="certificate_url">Credential URL</Label>
                        <Input id="certificate_url" type="url" value={data.certificate_url} onChange={(e) => setData('certificate_url', e.target.value)} error={errors.certificate_url} />
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <SecondaryButton type="button" onClick={closeModal}>Cancel</SecondaryButton>
                        <Button type="submit" disabled={processing}>{processing ? 'Saving...' : 'Save'}</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}