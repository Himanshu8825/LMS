import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { InstructorCourses, InstructorDashboard } from '@/Index';
import { resetTokenAndCredentials } from '@/Store/Slices/AuthSlice';
import { BarChart, Book, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const InstructorDashboardPage = () => {
  const [activeTabs, setActiveTabs] = useState('dashboard');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems = [
    {
      icon: BarChart,
      label: 'Dashboard',
      value: 'dashboard',
      component: <InstructorDashboard />,
    },
    {
      icon: Book,
      label: 'Courses',
      value: 'courses',
      component: <InstructorCourses />,
    },
    {
      icon: LogOut,
      label: 'Logout',
      value: 'logout',
      component: null,
    },
  ];

  const handleLogout = () => {
    dispatch(resetTokenAndCredentials());

    sessionStorage.clear();

    navigate('/auth/signin');

    toast({
      title: 'Logged out successfully!',
    });
  };

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="font-bold text-2xl mb-4">Instructor View</h2>

          <nav>
            {menuItems.map((item) => (
              <Button
                className={`w-full justify-start mb-2 text-md ${
                  activeTabs === item.value
                    ? 'btn-color'
                    : 'bg-transparent border-2 border-[#3B8CFF] hover:bg-[#3B8CFF] hover:text-white text-[#3B8CFF] '
                }`}
                key={item.value}
                onClick={() =>
                  item.value === 'logout'
                    ? handleLogout()
                    : setActiveTabs(item.value)
                }
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

          <Tabs value={activeTabs} onValueChange={setActiveTabs}>
            {menuItems.map((item) => (
              <TabsContent key={item.value} value={item.value}>
                {item.component !== null ? item.component : null}
              </TabsContent>
            ))}

            <Outlet />


          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboardPage;
