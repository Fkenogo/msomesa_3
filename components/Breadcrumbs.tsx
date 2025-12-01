
import React from 'react';
import { ChevronRightIcon } from './icons';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    onBreadcrumbClick?: (href: string) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onBreadcrumbClick }) => {
    return (
        <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
                {items.map((item, index) => (
                    <li key={item.label}>
                        <div className="flex items-center">
                            {index > 0 && (
                                <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            )}
                            {item.href ? (
                                <a
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if(onBreadcrumbClick) onBreadcrumbClick(item.href as string);
                                    }}
                                    className={`ml-2 text-sm font-medium ${index > 0 ? 'text-gray-500 hover:text-gray-700' : 'text-gray-700 font-bold'}`}
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <span className="ml-2 text-sm font-medium text-gray-500">{item.label}</span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
