import React, { useState, FormEvent } from 'react';
import { User, UserRole, EducationLevel, AuthMode } from '../types';
import { SparklesIcon, BookOpenIcon, UsersIcon, BuildingOfficeIcon, GoogleIcon } from '../components/icons';

interface LoginPageProps {
    onAuth: (user: Partial<User> & { authProvider?: string }) => void;
    onBackToHome: () => void;
    initialMode?: AuthMode;
}

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        type="button"
        onClick={onClick}
        className={`px-4 py-2 font-semibold border-b-2 transition-colors duration-300 ${active ? 'border-sky-500 text-sky-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
    >
        {children}
    </button>
);

const LoginPage: React.FC<LoginPageProps> = ({ onAuth, onBackToHome, initialMode }) => {
    const [mode, setMode] = useState<AuthMode>(initialMode || 'login');

    const handleSignupFormSubmit = (event: FormEvent<HTMLFormElement>, role: UserRole) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        const newUser: Partial<User> = {
            name: (formData.get('name') as string || formData.get('schoolName') as string || formData.get('email') as string).trim(),
            email: (formData.get('email') as string).trim(),
            password: password,
            role: role,
            level: formData.get('level') as EducationLevel,
            school: formData.get('school') as string,
            dob: formData.get('dob') as string,
            phone: formData.get('phone') as string,
            contactPerson: formData.get('contactPerson') as string,
        };
        onAuth(newUser);
    };

    const handleLoginFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const loginAttempt: Partial<User> = {
            email: (formData.get('email') as string).trim(),
            password: formData.get('password') as string,
        };
        onAuth(loginAttempt);
    };

    const handleGoogleSignIn = () => {
        onAuth({ 
            email: 'student.google@msomesa.com',
            name: 'Alex Google',
            authProvider: 'google' 
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <SparklesIcon className="w-12 h-12 mx-auto text-sky-500" />
                    <h1 className="text-4xl font-bold text-gray-800 mt-2">Welcome to Msomesa</h1>
                    <p className="text-gray-500 mt-1">Your journey to exam success starts here.</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex justify-center border-b mb-6">
                        <TabButton active={mode === 'login'} onClick={() => setMode('login')}>Login</TabButton>
                        <TabButton active={mode.startsWith('signup')} onClick={() => setMode('signup-student')}>Sign Up</TabButton>
                    </div>

                    <div className="space-y-4">
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm bg-white"
                        >
                            <GoogleIcon className="w-5 h-5" />
                            <span className="text-sm font-semibold text-gray-700">Continue with Google</span>
                        </button>

                        <div className="flex items-center">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink mx-4 text-xs text-gray-400 uppercase">OR</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>
                    </div>


                    {mode === 'login' && (
                        <form onSubmit={handleLoginFormSubmit} className="space-y-4 mt-4">
                            <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Sign in with your email</h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Email</label>
                                <input type="email" name="email" required className="mt-1 w-full input-style" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Password</label>
                                <input type="password" name="password" required className="mt-1 w-full input-style" />
                            </div>
                            <button type="submit" className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition-colors font-bold mt-2">Login</button>
                        </form>
                    )}

                    {mode.startsWith('signup') && (
                        <div className="mt-4">
                            <div className="grid grid-cols-3 gap-2 mb-6">
                                <RoleButton icon={<BookOpenIcon className="w-5 h-5"/>} label="Student" active={mode === 'signup-student'} onClick={() => setMode('signup-student')} />
                                <RoleButton icon={<UsersIcon className="w-5 h-5"/>} label="Parent" active={mode === 'signup-parent'} onClick={() => setMode('signup-parent')} />
                                <RoleButton icon={<BuildingOfficeIcon className="w-5 h-5"/>} label="School" active={mode === 'signup-school'} onClick={() => setMode('signup-school')} />
                            </div>
                            
                            {mode === 'signup-student' && <StudentSignupForm onSubmit={handleSignupFormSubmit} />}
                            {mode === 'signup-parent' && <ParentSignupForm onSubmit={handleSignupFormSubmit} />}
                            {mode === 'signup-school' && <SchoolSignupForm onSubmit={handleSignupFormSubmit} />}
                        </div>
                    )}
                     <div className="text-center mt-6">
                        <button onClick={onBackToHome} className="text-sm text-sky-600 hover:underline">
                            &larr; Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RoleButton: React.FC<{icon: React.ReactNode; label: string; active: boolean; onClick: () => void;}> = ({ icon, label, active, onClick }) => (
    <button type="button" onClick={onClick} className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ${active ? 'bg-sky-100 border-sky-50 text-sky-600' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100 hover:border-gray-300'}`}>
        {icon}
        <span className="text-xs font-semibold mt-1">{label}</span>
    </button>
);

const PasswordFields: React.FC = () => (
    <>
        <input type="password" name="password" placeholder="Password" required className="w-full input-style" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" required className="w-full input-style" />
    </>
);

const StudentSignupForm: React.FC<{ onSubmit: (e: FormEvent<HTMLFormElement>, role: UserRole) => void }> = ({ onSubmit }) => (
    <form onSubmit={(e) => onSubmit(e, 'student')} className="space-y-4 animate-fade-in">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Create Student Account</h2>
        <input name="name" placeholder="Full Name" required className="w-full input-style" />
        <input name="school" placeholder="School Name" required className="w-full input-style" />
        <select name="level" required className="w-full input-style bg-white">
            <option value="">Select Grade Level</option>
            <option value="PLE">PLE</option>
            <option value="UCE">UCE</option>
            <option value="UACE">UACE</option>
        </select>
        <input type="date" name="dob" placeholder="Date of Birth" required className="w-full input-style text-gray-900" />
        <input type="email" name="email" placeholder="Email Address" required className="w-full input-style" />
        <PasswordFields />
        <button type="submit" className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 font-bold">Sign Up</button>
    </form>
);

const ParentSignupForm: React.FC<{ onSubmit: (e: FormEvent<HTMLFormElement>, role: UserRole) => void }> = ({ onSubmit }) => (
    <form onSubmit={(e) => onSubmit(e, 'parent')} className="space-y-4 animate-fade-in">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Create Parent Account</h2>
        <input name="name" placeholder="Full Name" required className="w-full input-style" />
        <input type="email" name="email" placeholder="Email Address" required className="w-full input-style" />
        <input type="tel" name="phone" placeholder="Phone Number" required className="w-full input-style" />
        <PasswordFields />
        <button type="submit" className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 font-bold">Sign Up</button>
    </form>
);

const SchoolSignupForm: React.FC<{ onSubmit: (e: FormEvent<HTMLFormElement>, role: UserRole) => void }> = ({ onSubmit }) => (
    <form onSubmit={(e) => onSubmit(e, 'school')} className="space-y-4 animate-fade-in">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Register Your School</h2>
        <input name="schoolName" placeholder="School Name" required className="w-full input-style" />
        <input name="contactPerson" placeholder="Contact Person" required className="w-full input-style" />
        <input type="email" name="email" placeholder="Official Email" required className="w-full input-style" />
        <input type="tel" name="phone" placeholder="Contact Number" required className="w-full input-style" />
        <PasswordFields />
        <button type="submit" className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 font-bold">Register</button>
    </form>
);


const style = document.createElement('style');
style.innerHTML = `
.input-style {
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    background-color: white !important;
    color: #111827 !important;
}
.input-style:focus {
    outline: none;
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.2);
}
@keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
}
`;
document.head.appendChild(style);

export default LoginPage;