import React, { useMemo, useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
// This line has been updated with the correct imports
import { DndContext, PointerSensor, useSensor, useSensors, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Modal from '@/Components/Modal';
import { Button, Input, Label, Textarea, SecondaryButton } from '@/Components/FormElements';

// Draggable Card Component
const GoalCard = ({ goal, isOverlay }) => {
    // This now uses the correctly imported useDraggable hook
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: goal.id,
        data: { goal },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging && !isOverlay ? 0.5 : 1,
    };

    const overlayStyle = {
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        cursor: 'grabbing',
    };

    return (
        <div ref={setNodeRef} style={isOverlay ? overlayStyle : style} {...listeners} {...attributes} className="bg-white p-4 rounded-md shadow-sm border">
            <h3 className="font-semibold text-gray-800">{goal.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{goal.details}</p>
        </div>
    );
};

// Droppable Column Component
const KanbanColumn = ({ status, goals }) => {
    // This now uses the correctly imported useDroppable hook
    const { setNodeRef } = useDroppable({ id: status });

    return (
        <div ref={setNodeRef} className="bg-gray-100 rounded-lg p-4 w-full md:w-1/3 flex flex-col">
            <h2 className="font-bold text-lg text-gray-700 mb-4 capitalize">{status.replace('_', ' ')}</h2>
            <div className="space-y-4 min-h-[100px] flex-grow">
                {goals.map(goal => <GoalCard key={goal.id} goal={goal} />)}
            </div>
        </div>
    );
};

// The rest of the file remains the same...
export default function Index({ goals: initialGoals }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [localGoals, setLocalGoals] = useState(initialGoals);
    const [activeGoal, setActiveGoal] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        details: '',
    });

    useEffect(() => {
        setLocalGoals(initialGoals);
    }, [initialGoals]);

    const columns = useMemo(() => ({
        planned: localGoals.filter(g => g.status === 'planned'),
        in_progress: localGoals.filter(g => g.status === 'in_progress'),
        done: localGoals.filter(g => g.status === 'done'),
    }), [localGoals]);

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('goals.store'), { onSuccess: () => closeModal() });
    };
    
    function handleDragStart(event) {
        setActiveGoal(event.active.data.current?.goal);
    }
    
    function handleDragEnd(event) {
        const { active, over } = event;
        setActiveGoal(null);
        
        if (!over) return;

        const originalStatus = active.data.current?.goal?.status;
        const newStatus = over.id;

        if (originalStatus && newStatus && originalStatus !== newStatus) {
            setLocalGoals(prev => prev.map(goal => 
                goal.id === active.id ? { ...goal, status: newStatus } : goal
            ));
            
            router.put(route('goals.update', active.id), { status: newStatus }, {
                preserveScroll: true,
                preserveState: true,
                onError: () => setLocalGoals(initialGoals),
            });
        }
    }

    return (
        <>
            <Head title="Learning Goals" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Learning Goals</h1>
                            <Button onClick={openModal}>Add Goal</Button>
                        </div>
                        
                        <DndContext 
                            sensors={sensors} 
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                <KanbanColumn status="planned" goals={columns.planned} />
                                <KanbanColumn status="in_progress" goals={columns.in_progress} />
                                <KanbanColumn status="done" goals={columns.done} />
                            </div>
                            <DragOverlay>
                                {activeGoal ? <GoalCard goal={activeGoal} isOverlay /> : null}
                            </DragOverlay>
                        </DndContext>
                    </div>
                </div>
            </div>
            <Modal show={isModalOpen} onClose={closeModal}>
                <form onSubmit={handleSubmit} className="p-2">
                    <h2 className="text-xl font-bold mb-4">Add New Goal</h2>
                    <div className="mb-4">
                        <Label htmlFor="title">Goal Title</Label>
                        <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} error={errors.title} />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="details">Details</Label>
                        <Textarea id="details" value={data.details} onChange={(e) => setData('details', e.target.value)} error={errors.details} />
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