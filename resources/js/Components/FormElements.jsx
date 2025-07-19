import React from 'react';

export const Label = ({ htmlFor, children }) => (
    <label
        htmlFor={htmlFor}
        className="block font-medium text-sm text-gray-700 mb-1"
    >
        {children}
    </label>
);

export const Input = ({ id, type = 'text', value, onChange, error }) => (
    <>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full ${
                error ? 'border-red-500' : ''
            }`}
        />
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </>
);

export const Textarea = ({ id, value, onChange, error }) => (
    <>
        <textarea
            id={id}
            value={value}
            onChange={onChange}
            rows={4}
            className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full ${
                error ? 'border-red-500' : ''
            }`}
        />
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </>
);

export const Select = ({ id, value, onChange, error, children }) => (
    <>
        <select
            id={id}
            value={value}
            onChange={onChange}
            className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full ${
                error ? 'border-red-500' : ''
            }`}
        >
            {children}
        </select>
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </>
);


export const Button = ({ type = 'button', disabled, children, onClick }) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition"
    >
        {children}
    </button>
);