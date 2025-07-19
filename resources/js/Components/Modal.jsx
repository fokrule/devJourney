import React from 'react';

export default function Modal({ show, onClose, children }) {
    if (!show) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="fixed inset-0 bg-black opacity-50"
                aria-hidden="true"
            ></div>
            <div
                className="relative w-full max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg z-50"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}