import { User } from '../types';

export const mockUsers: User[] = [
    { id: '1', name: 'James O.', email: 'student@msomesa.com', role: 'student', password: 'password123', level: 'PLE', school: 'Makerere Primary School', dob: '2010-05-15', xp: 1250, streak: 5, achievements: ['First Steps', 'Streak Starter'], lastExamDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
    { id: '2', name: 'Sarah N.', email: 'parent@msomesa.com', role: 'parent', password: 'password123', phone: '0772123456', subscription: { plan: 'Premium', billingHistory: [{id: 'b1', date: '2024-06-01', amount: 20000, description: 'Premium Plan - Monthly'}] } },
    { id: '3', name: 'Greenhill Academy', email: 'school@msomesa.com', role: 'school', password: 'password123', phone: '0414123456', contactPerson: 'Mr. Okello', subscription: { plan: 'Free', billingHistory: [] } },
    { id: '4', name: 'Super Admin', email: 'admin@msomesa.com', role: 'admin', password: 'password123' },
    { id: '5', name: 'Fred K. (Admin)', email: 'admin.fred@msomesa.com', role: 'admin', password: 'password123' },
    { id: '6', name: 'Community Admin', email: 'community@msomesa.com', role: 'admin', password: 'password123' },
    { id: '7', name: 'Alex Google', email: 'student.google@msomesa.com', role: 'student', password: 'google_oauth_placeholder', level: 'PLE', school: 'Google High', dob: '2011-01-01', xp: 500, streak: 2, achievements: ['First Steps'] },
    { id: '8', name: 'Musa K.', email: 'musa.parent@msomesa.com', role: 'parent', password: 'password123', phone: '0701987654', subscription: { plan: 'Premium', billingHistory: [{id: 'b2', date: '2024-07-01', amount: 20000, description: 'Premium Access - Monthly'}] } },
    { id: '9', name: 'Anita K.', email: 'anita.student@msomesa.com', role: 'student', password: 'password123', level: 'UCE', school: 'Gayaza High School', dob: '2008-03-22', xp: 2100, streak: 12, achievements: ['First Steps', 'Streak Starter', 'High Scorer'], lastExamDate: new Date().toISOString().split('T')[0] },
    { id: '10', name: 'Alice P.', email: 'alice.parent@msomesa.com', role: 'parent', password: 'password123', phone: '0755123456', subscription: { plan: 'Premium', billingHistory: [{id: 'b3', date: '2024-08-01', amount: 20000, description: 'Premium Access - Monthly'}] } },
    { id: '11', name: 'Bob S.', email: 'bob.student@msomesa.com', role: 'student', password: 'password123', level: 'UACE', school: 'Kings College Budo', dob: '2006-11-20', xp: 4500, streak: 25, achievements: ['First Steps', 'Streak Starter', 'High Scorer', 'Dedicated Learner'], lastExamDate: new Date().toISOString().split('T')[0] },
    { id: 'dev-1', name: 'Msomesa Developer', email: 'dev@msomesa.com', role: 'admin', password: 'dev' }
];