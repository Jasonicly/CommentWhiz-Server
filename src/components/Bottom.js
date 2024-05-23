import React from 'react';
import { FaHome, FaInfoCircle, FaCog } from 'react-icons/fa';

export function Bottom() {
    return (
        <div className="fixed bottom-0 right-0 p-4">
            <div className="flex space-x-4">
                <a href="/home"><FaHome size="3em" /></a>
                <a href="/info"><FaInfoCircle size="3em" /></a>
                <a href="/settings"><FaCog size="3em" /></a>
            </div>
        </div>
    );
}