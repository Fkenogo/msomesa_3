
import React, { useState, useCallback, useEffect } from 'react';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import SchoolDashboard from './pages/SchoolDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import LoginPage from './pages/LoginPage';
import ExamPage from './pages/ExamPage';
import LandingPage from './pages/LandingPage';
import Layout from './components/Layout';
import { User, UserRole, Exam, LinkRequest, LinkedAccount, Notification, ExamMode, StudyReminder, QuestionHistoryItem } from './types';
import { mockExams } from './data/exams';
import { mockUsers } from './data/users';
import { mockNotifications } from './data/notifications';
import PricingPage from './pages/PricingPage';
import ExamListPage from './pages/ExamListPage';

type PublicPage = 'landing' | 'past-papers' | 'practice-papers' | 'pricing';

// Custom hook to persist state in localStorage
function usePersistentState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
        try {
            const storedValue = window.localStorage.getItem(key);
            if (storedValue) {
                return JSON.parse(storedValue);
            }
            return defaultValue;
        } catch (error) {
            console.error(`Error parsing localStorage key “${key}”:`, error);
            console.log(`Corrupted value for key "${key}" was:`, window.localStorage.getItem(key));
            // Deleting the corrupted value to prevent future errors on load
            window.localStorage.removeItem(key); 
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error(`Error setting localStorage key “${key}”:`, error);
        }
    }, [key, state]);

    return [state, setState];
}


const App: React.FC = () => {
  const [users, setUsers] = usePersistentState<User[]>('msomesa_users', []);
  const [deletedMockUserIds, setDeletedMockUserIds] = usePersistentState<string[]>('msomesa_deleted_mock_users', []);
  
  const [currentUser, setCurrentUser] = usePersistentState<User | null>('msomesa_currentUser', null);
  const [viewAsRole, setViewAsRole] = usePersistentState<UserRole | null>('msomesa_viewAsRole', null);
  
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [activeExamMode, setActiveExamMode] = useState<ExamMode>('simulation');
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  
  const [examsData, setExamsData] = usePersistentState<Exam[]>('msomesa_exams', []);
  const [deletedMockExamIds, setDeletedMockExamIds] = usePersistentState<string[]>('msomesa_deleted_mock_exams', []);

  const [linkRequests, setLinkRequests] = usePersistentState<LinkRequest[]>('msomesa_linkRequests', []);
  const [linkedAccounts, setLinkedAccounts] = usePersistentState<LinkedAccount[]>('msomesa_linkedAccounts', []);
  const [notifications, setNotifications] = usePersistentState<Notification[]>('msomesa_notifications', mockNotifications);

  const [authView, setAuthView] = useState<'landing' | 'login'>(currentUser ? 'login' : 'landing');
  const [publicPage, setPublicPage] = useState<PublicPage>('landing');
  
  // --- Data Reconciliation Hooks ---
  // This robust logic runs once on mount to synchronize stored data with the base mock data.
  // It ensures that user-created data is always preserved, updates to mock data are applied safely
  // without overwriting user changes, and mock items deleted by the user stay deleted.
  useEffect(() => {
    setUsers(currentStoredUsers => {
        const storedUsersMap = new Map(currentStoredUsers.map(u => [u.id, u]));

        mockUsers.forEach(mockUser => {
            // If a mock user was explicitly deleted by an admin, ensure it stays deleted.
            if (deletedMockUserIds.includes(mockUser.id)) {
                if (storedUsersMap.has(mockUser.id)) {
                    storedUsersMap.delete(mockUser.id);
                }
                return; // Continue to next mock user
            }

            const storedUser = storedUsersMap.get(mockUser.id);
            if (storedUser) {
                // If user exists in storage, merge mock data underneath stored data
                // to add new properties from mock data without overwriting stored data.
                const updatedUser = { ...mockUser, ...storedUser };
                storedUsersMap.set(mockUser.id, updatedUser);
            } else {
                // If mock user doesn't exist in storage, add it.
                storedUsersMap.set(mockUser.id, mockUser);
            }
        });

        return Array.from(storedUsersMap.values());
    });

    setExamsData(currentStoredExams => {
        const storedExamsMap = new Map(currentStoredExams.map(e => [e.id, e]));

        mockExams.forEach(mockExam => {
            if (deletedMockExamIds.includes(mockExam.id)) {
                if (storedExamsMap.has(mockExam.id)) {
                   storedExamsMap.delete(mockExam.id);
                }
                return;
            }
           
            const storedExam = storedExamsMap.get(mockExam.id);
            if (storedExam) {
                 const updatedExam = { ...mockExam, ...storedExam };
                 storedExamsMap.set(mockExam.id, updatedExam);
            } else {
                storedExamsMap.set(mockExam.id, mockExam);
            }
        });

        return Array.from(storedExamsMap.values());
    });
  }, []); // IMPORTANT: Empty dependency array ensures this runs only once on initial app load.


  // --- Study Reminder Notifications ---
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'student' || !currentUser.studyReminders) {
        return;
    }

    const checkReminders = () => {
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        currentUser.studyReminders?.forEach(reminder => {
            if (reminder.active && reminder.time === currentTime) {
                const alreadyNotified = notifications.some(n => 
                    n.userId === currentUser.id &&
                    n.text.includes(reminder.subject) &&
                    new Date(n.date).toDateString() === now.toDateString()
                );

                if (!alreadyNotified) {
                     setNotifications(prev => [...prev, {
                        id: `notif-${Date.now()}`,
                        userId: currentUser.id,
                        text: `Time to study ${reminder.subject}! Why not start a practice session?`,
                        date: new Date().toISOString(),
                        read: false,
                    }]);
                }
            }
        });
    };

    const intervalId = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(intervalId);
  }, [currentUser, notifications, setNotifications]);


  const handleAuthAction = useCallback((user: Partial<User>) => {
    if (!user.email || !user.password) {
        alert("Authentication failed: Email and password are required.");
        return;
    }
    
    const email = user.email.toLowerCase();

    // Sign Up Logic
    if (user.role) {
        const existingUser = users.find(u => u.email.toLowerCase() === email);
        if (existingUser) {
            alert("Signup failed: An account with this email already exists. Please log in.");
            return;
        }

        const newUser: User = {
            id: Date.now().toString(),
            name: user.name || user.email,
            email: user.email,
            password: user.password,
            role: user.role,
            level: user.level,
            school: user.school,
            dob: user.dob,
            xp: 0,
            streak: 0,
            achievements: [],
            questionHistory: [],
            studyReminders: [],
            phone: user.phone,
            contactPerson: user.contactPerson,
            subscription: (user.role === 'parent' || user.role === 'school') ? { plan: 'Free', billingHistory: [] } : undefined,
        };

        setUsers(prevUsers => [...prevUsers, newUser]);
        setCurrentUser(newUser); // Log in the new user immediately
        setViewAsRole(null);
        
    } else { // Login Logic
        const existingUser = users.find(u => u.email.toLowerCase() === email);

        if (!existingUser) {
            alert("Login failed: No account found with this email address. Please check the email or sign up.");
            return;
        }

        if (existingUser.password !== user.password) {
            alert("Login failed: The password you entered is incorrect. Please try again.");
            return;
        }
        
        let userToLogin = { ...existingUser };
        
        setCurrentUser(userToLogin);
        setViewAsRole(null);
    }
  }, [users, setUsers, setCurrentUser, setViewAsRole]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setViewAsRole(null);
    setAuthView('landing');
    setPublicPage('landing');
  }, [setCurrentUser, setViewAsRole]);
  
  const handleSetViewAsRole = useCallback((role: UserRole | null) => {
    if (currentUser?.role === 'admin') {
      setViewAsRole(role);
    }
  }, [currentUser, setViewAsRole]);

  const handleStartExam = (examId: string, mode: ExamMode) => {
    const exam = examsData.find(e => e.id === examId);
    if (exam) {
        setActiveExam(exam);
        setActiveExamMode(mode);
        setIsPreviewMode(false);
    }
  };
  
  const handlePreviewExam = (examId: string) => {
    const exam = examsData.find(e => e.id === examId);
     if (exam) {
        setActiveExam(exam);
        setActiveExamMode('simulation');
        setIsPreviewMode(true);
    }
  };
  
  const handleStartReviewSession = (reviewExam: Exam) => {
      setActiveExam(reviewExam);
      setActiveExamMode('practice');
      setIsPreviewMode(false);
  };

  // --- Spaced Repetition Logic ---
  const handleQuestionPartAttempt = (questionPartId: string, examId: string, isCorrect: boolean) => {
    setCurrentUser(prevUser => {
        if (!prevUser) return null;

        const history = [...(prevUser.questionHistory || [])];
        const itemIndex = history.findIndex(item => item.questionPartId === questionPartId);
        
        let newItem: QuestionHistoryItem;
        const now = new Date();

        if (itemIndex > -1) {
            const oldItem = history[itemIndex];
            const newStreak = isCorrect ? oldItem.streak + 1 : 0;
            const reviewDays = [1, 3, 7, 14, 30, 90]; // Spacing in days based on streak
            const daysToAdd = reviewDays[Math.min(newStreak, reviewDays.length - 1)];
            const nextReviewDate = new Date(now.setDate(now.getDate() + daysToAdd));
            
            newItem = {
                ...oldItem,
                isCorrect,
                streak: newStreak,
                lastAttempt: new Date().toISOString(),
                nextReview: nextReviewDate.toISOString(),
            };
            history[itemIndex] = newItem;
        } else {
            const nextReviewDate = new Date(now.setDate(now.getDate() + 1)); // Review tomorrow
            newItem = {
                questionPartId,
                examId,
                isCorrect,
                streak: isCorrect ? 1 : 0,
                lastAttempt: new Date().toISOString(),
                nextReview: nextReviewDate.toISOString(),
            };
            history.push(newItem);
        }

        return { ...prevUser, questionHistory: history };
    });
  };

  const handleExitExam = (result?: { score: number; total: number; }) => {
    if (result && currentUser && !isPreviewMode && activeExamMode === 'simulation') {
        // --- Gamification Logic ---
        setCurrentUser(prevUser => {
            if (!prevUser) return null;

            const today = new Date().toISOString().split('T')[0];
            const lastDate = prevUser.lastExamDate;
            let newStreak = prevUser.streak || 0;

            if (lastDate) {
                const lastExamDay = new Date(lastDate);
                const todayDay = new Date(today);
                const diffTime = todayDay.getTime() - lastExamDay.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays === 1) {
                    newStreak += 1; // It's the next day, increment streak
                } else if (diffDays > 1) {
                    newStreak = 1; // Streak is broken, reset to 1
                }
                 // If diffDays is 0, do nothing to the streak.
            } else {
                newStreak = 1; // First exam
            }

            const newXp = (prevUser.xp || 0) + (result.score * 10);
            
            const newAchievements = [...(prevUser.achievements || [])];
            if (!newAchievements.includes('First Steps')) {
                newAchievements.push('First Steps');
            }
            if (result.score / result.total >= 0.9 && !newAchievements.includes('High Scorer')) {
                newAchievements.push('High Scorer');
            }
            if (newStreak >= 3 && !newAchievements.includes('Streak Starter')) {
                 newAchievements.push('Streak Starter');
            }

            return {
                ...prevUser,
                xp: newXp,
                streak: newStreak,
                lastExamDate: today,
                achievements: newAchievements,
            };
        });
    }

    setActiveExam(null);
    setIsPreviewMode(false);
  };

  const handlePdfUpload = (examId: string, fileUrl: string, summary: string) => {
    setExamsData(prevExams => 
      prevExams.map(exam => 
        exam.id === examId ? { ...exam, pdfSummary: summary, explanationPdfUrl: fileUrl } : exam
      )
    );
    alert(`PDF for exam ${examId} has been associated and summarized successfully!`);
  };

  const handleSendRequest = (fromUserId: string, toUserId: string) => {
      const newRequest: LinkRequest = { from: fromUserId, to: toUserId, status: 'pending', id: Date.now().toString() };
      setLinkRequests(prev => [...prev, newRequest]);
      alert('Connection request sent!');
  };
  
  const handleAcceptRequest = (requestId: string) => {
      const request = linkRequests.find(r => r.id === requestId);
      if(request) {
          const newLink: LinkedAccount = { userId1: request.from, userId2: request.to };
          setLinkedAccounts(prev => [...prev, newLink]);
          setLinkRequests(prev => prev.filter(r => r.id !== requestId));
      }
  };

  const handleDeclineRequest = (requestId: string) => {
      setLinkRequests(prev => prev.filter(r => r.id !== requestId));
  };
  
  const handleUnlink = (userId1: string, userId2: string) => {
      setLinkedAccounts(prev => prev.filter(
          link => !((link.userId1 === userId1 && link.userId2 === userId2) || (link.userId1 === userId2 && link.userId2 === userId1))
      ));
  };

  const handleMarkNotificationRead = (notificationId: string) => {
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
  };

  const handleSaveUser = (userToSave: User) => {
    setUsers(prevUsers => {
        const userExists = prevUsers.some(u => u.id === userToSave.id);
        if (userExists) {
            return prevUsers.map(u => u.id === userToSave.id ? userToSave : u);
        } else {
            return [...prevUsers, { ...userToSave, id: Date.now().toString() }];
        }
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (currentUser && userId === currentUser.id) {
        alert("You cannot delete your own account.");
        return;
    }
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        // If the user being deleted is from the original mock set, track its ID
        if (mockUsers.some(mock => mock.id === userId)) {
            setDeletedMockUserIds(prev => [...new Set([...prev, userId])]);
        }
        setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
        alert('User successfully deleted.');
    }
  };

  const handleSaveExam = (examToSave: Exam) => {
      const fullExamData = {
        ...examToSave,
        questionCount: examToSave.questions.length
      };
      setExamsData(prevExams => {
          const examExists = prevExams.some(e => e.id === fullExamData.id);
          if (examExists) {
              return prevExams.map(e => e.id === fullExamData.id ? fullExamData : e);
          } else {
              return [...prevExams, { ...fullExamData, id: `exam-${Date.now()}` }];
          }
      });
  };
  
  const handleDeleteExam = (examId: string) => {
      if (window.confirm('Are you sure you want to delete this exam? This will also delete all its questions.')) {
          // If the exam being deleted is from the original mock set, track its ID
          if (mockExams.some(mock => mock.id === examId)) {
              setDeletedMockExamIds(prev => [...new Set([...prev, examId])]);
          }
          setExamsData(prevExams => prevExams.filter(e => e.id !== examId));
          alert('Exam successfully deleted.');
      }
  };
  
  const handleSaveReminders = (reminders: StudyReminder[]) => {
      setCurrentUser(prev => prev ? { ...prev, studyReminders: reminders } : null);
  };

  const handleNavigate = (page: PublicPage) => {
    setPublicPage(page);
  };
  
  const handleNavigateToAuth = () => {
    setAuthView('login');
  };

  const renderContent = () => {
    if (!currentUser) {
        if (authView === 'login') {
            return <LoginPage onAuth={handleAuthAction} onBackToHome={() => { setAuthView('landing'); setPublicPage('landing'); }} />;
        }

        switch(publicPage) {
            case 'landing':
                return <LandingPage onNavigateToAuth={handleNavigateToAuth} onNavigate={handleNavigate} />;
            case 'past-papers':
                return <ExamListPage pageType="Past Paper" allExams={examsData} onNavigateToAuth={handleNavigateToAuth} onNavigate={handleNavigate} />;
            case 'practice-papers':
                return <ExamListPage pageType="Practice Paper" allExams={examsData} onNavigateToAuth={handleNavigateToAuth} onNavigate={handleNavigate} />;
            case 'pricing':
                return <PricingPage onNavigateToAuth={handleNavigateToAuth} onNavigate={handleNavigate} />;
            default:
                 return <LandingPage onNavigateToAuth={handleNavigateToAuth} onNavigate={handleNavigate} />;
        }
    }

    if (activeExam) {
      return <ExamPage 
                exam={activeExam} 
                onExit={handleExitExam} 
                mode={activeExamMode} 
                isPreview={isPreviewMode} 
                onPartAttempt={handleQuestionPartAttempt}
             />;
    }
    
    const sharedProps = {
        allUsers: users,
        linkRequests,
        linkedAccounts,
        notifications,
        onSendRequest: handleSendRequest,
        onAcceptRequest: handleAcceptRequest,
        onDeclineRequest: handleDeclineRequest,
        onUnlink: handleUnlink,
        onMarkNotificationRead: handleMarkNotificationRead,
    };

    const effectiveRole = viewAsRole || currentUser.role;
    
    const viewUser = { ...currentUser, role: effectiveRole, name: viewAsRole ? `${currentUser.name} (Viewing as ${effectiveRole})` : currentUser.name };
    
    let dashboardContent;
    switch (effectiveRole) {
      case 'student':
        dashboardContent = <StudentDashboard 
            currentUser={viewUser} 
            onStartExam={handleStartExam}
            onStartReviewSession={handleStartReviewSession}
            onSaveReminders={handleSaveReminders}
            {...sharedProps} 
            allExams={examsData} 
         />;
        break;
      case 'parent':
        dashboardContent = <ParentDashboard currentUser={viewUser} {...sharedProps}/>;
        break;
      case 'school':
        dashboardContent = <SchoolDashboard currentUser={viewUser} {...sharedProps}/>;
        break;
      case 'admin':
         dashboardContent = <SuperAdminDashboard 
                    currentUser={currentUser}
                    exams={examsData} 
                    onPdfUpload={handlePdfUpload} 
                    allUsers={users}
                    onSaveUser={handleSaveUser}
                    onDeleteUser={handleDeleteUser}
                    onSaveExam={handleSaveExam}
                    onDeleteExam={handleDeleteExam}
                    onPreviewExam={handlePreviewExam}
                />;
        break;
      default:
        dashboardContent = <StudentDashboard 
            currentUser={currentUser} 
            onStartExam={handleStartExam} 
            onStartReviewSession={handleStartReviewSession}
            onSaveReminders={handleSaveReminders}
            {...sharedProps}
            allExams={examsData} />;
    }

    return (
        <Layout 
            user={viewUser}
            onLogout={handleLogout}
            originalRole={currentUser.role}
            setViewAsRole={handleSetViewAsRole}
            notifications={notifications}
            onMarkNotificationRead={handleMarkNotificationRead}
        >
            {dashboardContent}
        </Layout>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {renderContent()}
    </div>
  );
}

export default App;
