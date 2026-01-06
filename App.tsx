import React, { useState, useCallback, useEffect } from 'react';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import SchoolDashboard from './pages/SchoolDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import LoginPage from './pages/LoginPage';
import ExamPage from './pages/ExamPage';
import LandingPage from './pages/LandingPage';
import Layout from './components/Layout';
import { User, UserRole, Exam, LinkRequest, LinkedAccount, Notification, ExamMode, StudyReminder, QuestionHistoryItem, ForumCategory, ForumPost, ForumReply, AuthMode } from './types';
import { mockExams } from './data/exams';
import { mockUsers } from './data/users';
import { mockNotifications } from './data/notifications';
import { mockForumCategories, mockForumPosts, mockForumReplies } from './data/forum';
import PricingPage from './pages/PricingPage';
import ExamListPage from './pages/ExamListPage';

type PublicPage = 'landing' | 'past-papers' | 'practice-papers' | 'pricing';

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
  const [originalUser, setOriginalUser] = usePersistentState<User | null>('msomesa_originalUser', null);
  const [viewAsRole, setViewAsRole] = usePersistentState<UserRole | null>('msomesa_viewAsRole', null);
  
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [activeExamMode, setActiveExamMode] = useState<ExamMode>('simulation');
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  
  const [examsData, setExamsData] = usePersistentState<Exam[]>('msomesa_exams', []);
  const [deletedMockExamIds, setDeletedMockExamIds] = usePersistentState<string[]>('msomesa_deleted_mock_exams', []);

  const [linkRequests, setLinkRequests] = usePersistentState<LinkRequest[]>('msomesa_linkRequests', [
    { id: 'req-1', from: '7', to: '2', status: 'pending' }
  ]);
  
  const [linkedAccounts, setLinkedAccounts] = usePersistentState<LinkedAccount[]>('msomesa_linkedAccounts', [
    { userId1: '1', userId2: '2' },
    { userId1: '8', userId2: '9' },
    { userId1: '10', userId2: '11' } // New Link: Alice P. and Bob S.
  ]);
  
  const [notifications, setNotifications] = usePersistentState<Notification[]>('msomesa_notifications', mockNotifications);

  const [authView, setAuthView] = useState<'landing' | 'login'>(currentUser ? 'login' : 'landing');
  const [publicPage, setPublicPage] = useState<PublicPage>('landing');
  const [initialAuthMode, setInitialAuthMode] = useState<AuthMode>('login');

  const [forumCategories, setForumCategories] = usePersistentState<ForumCategory[]>('msomesa_forum_categories', mockForumCategories);
  const [forumPosts, setForumPosts] = usePersistentState<ForumPost[]>('msomesa_forum_posts', mockForumPosts);
  const [forumReplies, setForumReplies] = usePersistentState<ForumReply[]>('msomesa_forum_replies', mockForumReplies);
  
  useEffect(() => {
    setUsers(currentStoredUsers => {
        const finalUsersMap = new Map(mockUsers.map(u => [u.id, u]));
        currentStoredUsers.forEach(storedUser => {
            const mockUser = finalUsersMap.get(storedUser.id);
            if (mockUser) {
                finalUsersMap.set(storedUser.id, { ...mockUser, ...storedUser });
            } else {
                finalUsersMap.set(storedUser.id, storedUser);
            }
        });
        deletedMockUserIds.forEach(id => finalUsersMap.delete(id));
        return Array.from(finalUsersMap.values());
    });

    setExamsData(currentStoredExams => {
        const finalExamsMap = new Map(mockExams.map(e => [e.id, e]));
        currentStoredExams.forEach(storedExam => {
            const mockExam = finalExamsMap.get(storedExam.id);
            if (mockExam) {
                finalExamsMap.set(storedExam.id, { ...mockExam, ...storedExam });
            } else {
                finalExamsMap.set(storedExam.id, storedExam);
            }
        });
        deletedMockExamIds.forEach(id => finalExamsMap.delete(id));
        return Array.from(finalExamsMap.values());
    });
  }, []); 


  const handleAuthAction = useCallback((user: Partial<User> & { authProvider?: string }) => {
    if (!user.email) {
        alert("Authentication failed: Email is required.");
        return;
    }
    
    const email = user.email.toLowerCase().trim();

    if (user.authProvider === 'google') {
        let existingUser = users.find(u => u.email.toLowerCase().trim() === email);
        if (existingUser) {
            setCurrentUser(existingUser);
            setOriginalUser(null);
            setViewAsRole(null);
        } else {
            const newUser: User = {
                id: Date.now().toString(),
                name: user.name || user.email,
                email: email,
                role: 'student', 
                level: 'PLE', 
                xp: 0,
                streak: 0,
                achievements: [],
                questionHistory: [],
                studyReminders: [],
            };
            setUsers(prevUsers => [...prevUsers, newUser]);
            setCurrentUser(newUser);
            setOriginalUser(null);
            setViewAsRole(null);
        }
        return;
    }

    if (!user.password) {
        alert("Authentication failed: Password is required.");
        return;
    }

    if (user.role) {
        const existingUser = users.find(u => u.email.toLowerCase().trim() === email);
        if (existingUser) {
            alert(`Signup failed: An account with email "${email}" already exists. Please log in instead.`);
            return;
        }

        const newUser: User = {
            id: Date.now().toString(),
            name: user.name || user.email,
            email: email,
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
        setCurrentUser(newUser); 
        setOriginalUser(null);
        setViewAsRole(null);
        alert(`Welcome, ${newUser.name}! Your account has been created.`);
        
    } else { 
        const existingUser = users.find(u => u.email.toLowerCase().trim() === email);

        if (!existingUser) {
            alert("Login failed: No account found with this email.");
            return;
        }

        if (existingUser.password !== user.password) {
            alert("Login failed: Incorrect password.");
            return;
        }
        
        setCurrentUser({ ...existingUser });
        setOriginalUser(null);
        setViewAsRole(null);
    }
  }, [users, setUsers, setCurrentUser, setViewAsRole, setOriginalUser]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setOriginalUser(null);
    setViewAsRole(null);
    setAuthView('landing');
    setPublicPage('landing');
  }, [setCurrentUser, setViewAsRole, setOriginalUser]);
  
  const handleSetViewAsRole = useCallback((role: UserRole | null) => {
    const admin = originalUser || currentUser;
    if (admin?.role === 'admin') {
      setViewAsRole(role);
    }
  }, [currentUser, originalUser, setViewAsRole]);

  const handleImpersonate = useCallback((targetUser: User) => {
      if (currentUser?.role === 'admin' || originalUser?.role === 'admin') {
          if (!originalUser) setOriginalUser(currentUser);
          setCurrentUser(targetUser);
          setViewAsRole(null);
          window.scrollTo(0, 0);
      }
  }, [currentUser, originalUser, setCurrentUser, setOriginalUser, setViewAsRole]);

  const handleStopImpersonating = useCallback(() => {
      if (originalUser) {
          setCurrentUser(originalUser);
          setOriginalUser(null);
          setViewAsRole(null);
      }
  }, [originalUser, setCurrentUser, setOriginalUser, setViewAsRole]);

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
            const reviewDays = [1, 3, 7, 14, 30, 90]; 
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
            const nextReviewDate = new Date(now.setDate(now.getDate() + 1));
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
    if (result && currentUser && !isPreviewMode) {
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
                if (diffDays === 1) newStreak += 1;
                else if (diffDays > 1) newStreak = 1;
            } else {
                newStreak = 1;
            }
            const newXp = (prevUser.xp || 0) + (result.score * 10);
            const newAchievements = [...(prevUser.achievements || [])];
            if (!newAchievements.includes('First Steps')) newAchievements.push('First Steps');
            if (result.total > 0 && (result.score / result.total) >= 0.9 && !newAchievements.includes('High Scorer')) newAchievements.push('High Scorer');
            if (newStreak >= 3 && !newAchievements.includes('Streak Starter')) newAchievements.push('Streak Starter');

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
    alert(`PDF associated and summarized successfully!`);
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
          link => !((link.userId1 === userId1 && link.userId2 === userId2) || (link.userId1 === userId2 && link.userId1 === userId1))
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
    if ((currentUser && userId === currentUser.id) || (originalUser && userId === originalUser.id)) {
        alert("You cannot delete an active admin account.");
        return;
    }
    if (window.confirm('Are you sure you want to delete this user?')) {
        if (mockUsers.some(mock => mock.id === userId)) {
            setDeletedMockUserIds(prev => [...new Set([...prev, userId])]);
        }
        setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
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
      if (window.confirm('Are you sure you want to delete this exam?')) {
          if (mockExams.some(mock => mock.id === examId)) {
              setDeletedMockExamIds(prev => [...new Set([...prev, examId])]);
          }
          setExamsData(prevExams => prevExams.filter(e => e.id !== examId));
      }
  };
  
  const handleSaveReminders = (reminders: StudyReminder[]) => {
      setCurrentUser(prev => prev ? { ...prev, studyReminders: reminders } : null);
  };

  const handleSavePost = (post: ForumPost) => {
    setForumPosts(prev => {
        const exists = prev.some(p => p.id === post.id);
        if (exists) return prev.map(p => p.id === post.id ? post : p);
        return [...prev, post];
    });
  };

  const handleDeletePost = (postId: string) => {
    if(window.confirm('Are you sure you want to delete this post?')) {
        setForumPosts(prev => prev.filter(p => p.id !== postId));
        setForumReplies(prev => prev.filter(r => r.postId !== postId));
    }
  };
  
  const handleSaveReply = (reply: ForumReply) => {
      setForumReplies(prev => {
          const exists = prev.some(r => r.id === reply.id);
          if (exists) return prev.map(r => r.id === reply.id ? reply : r);
          return [...prev, reply];
      });
  };
  
  const handleSaveCategory = (category: ForumCategory) => {
      setForumCategories(prev => {
          const exists = prev.some(c => c.id === category.id);
          if(exists) return prev.map(c => c.id === category.id ? category : c);
          return [...prev, category];
      });
  };
  
  const handleDeleteCategory = (categoryId: string) => {
      if(window.confirm('Are you sure you want to delete this category?')) {
          setForumCategories(prev => prev.filter(c => c.id !== categoryId));
      }
  };

  const handleTogglePostPin = (postId: string) => {
      setForumPosts(prev => prev.map(p => p.id === postId ? { ...p, isPinned: !p.isPinned } : p));
  };
  
  const handleTogglePostLock = (postId: string) => {
      setForumPosts(prev => prev.map(p => p.id === postId ? { ...p, isLocked: !p.isLocked } : p));
  };


  const handleNavigate = (page: PublicPage) => {
    setPublicPage(page);
  };
  
  const handleNavigateToAuth = (mode: AuthMode = 'login') => {
    setInitialAuthMode(mode);
    setAuthView('login');
  };

  const renderContent = () => {
    if (!currentUser) {
        if (authView === 'login') {
            return <LoginPage onAuth={handleAuthAction} onBackToHome={() => { setAuthView('landing'); setPublicPage('landing'); }} initialMode={initialAuthMode} />;
        }

        switch(publicPage) {
            case 'landing': return <LandingPage onNavigateToAuth={handleNavigateToAuth} onNavigate={handleNavigate} />;
            case 'past-papers': return <ExamListPage pageType="Past Paper" allExams={examsData} onNavigateToAuth={handleNavigateToAuth} onNavigate={handleNavigate} />;
            case 'practice-papers': return <ExamListPage pageType="Practice Paper" allExams={examsData} onNavigateToAuth={handleNavigateToAuth} onNavigate={handleNavigate} />;
            case 'pricing': return <PricingPage onNavigateToAuth={handleNavigateToAuth} onNavigate={handleNavigate} />;
            default: return <LandingPage onNavigateToAuth={handleNavigateToAuth} onNavigate={handleNavigate} />;
        }
    }

    if (activeExam) {
      return <ExamPage exam={activeExam} onExit={handleExitExam} mode={activeExamMode} isPreview={isPreviewMode} onPartAttempt={handleQuestionPartAttempt} />;
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

    const forumProps = {
        forumCategories,
        forumPosts,
        forumReplies,
        onSavePost: handleSavePost,
        onSaveReply: handleSaveReply,
    };

    const effectiveRole = viewAsRole || currentUser.role;
    const viewUser = { ...currentUser, role: effectiveRole, name: viewAsRole ? `${currentUser.name} (Viewing as ${effectiveRole})` : currentUser.name };
    
    let dashboardContent;
    switch (effectiveRole) {
      case 'student':
        dashboardContent = <StudentDashboard currentUser={viewUser} originalRole={originalUser?.role || currentUser.role} onStartExam={handleStartExam} onStartReviewSession={handleStartReviewSession} onSaveReminders={handleSaveReminders} {...sharedProps} allExams={examsData} />;
        break;
      case 'parent':
        dashboardContent = <ParentDashboard currentUser={viewUser} {...sharedProps} {...forumProps} />;
        break;
      case 'school':
        dashboardContent = <SchoolDashboard currentUser={viewUser} {...sharedProps}/>;
        break;
      case 'admin':
         dashboardContent = <SuperAdminDashboard currentUser={currentUser} exams={examsData} onPdfUpload={handlePdfUpload} allUsers={users} onSaveUser={handleSaveUser} onDeleteUser={handleDeleteUser} onSaveExam={handleSaveExam} onDeleteExam={handleDeleteExam} onPreviewExam={handlePreviewExam} forumCategories={forumCategories} forumPosts={forumPosts} onSaveCategory={handleSaveCategory} onDeleteCategory={handleDeleteCategory} onDeletePost={handleDeletePost} onTogglePostPin={handleTogglePostPin} onTogglePostLock={handleTogglePostLock} onImpersonate={handleImpersonate} />;
        break;
      default:
        dashboardContent = <StudentDashboard currentUser={currentUser} originalRole={originalUser?.role || currentUser.role} onStartExam={handleStartExam} onStartReviewSession={handleStartReviewSession} onSaveReminders={handleSaveReminders} {...sharedProps} allExams={examsData} />;
    }

    return (
        <Layout 
            user={viewUser}
            onLogout={handleLogout}
            originalRole={originalUser?.role || currentUser.role}
            setViewAsRole={handleSetViewAsRole}
            notifications={notifications}
            onMarkNotificationRead={handleMarkNotificationRead}
            isImpersonating={!!originalUser}
            onStopImpersonating={handleStopImpersonating}
            originalUser={originalUser}
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