import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { resetTokenAndCredentials } from '@/Store/Slices/AuthSlice';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StudentHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();


  const handleLogout = () => {
    dispatch(resetTokenAndCredentials());

    sessionStorage.clear();

    navigate('/auth/signin');

    toast({
      title: 'Logged out successfully!',
    });
  };

  return (
    <div className=''>
      <Button onClick={handleLogout} >Log out</Button>
    </div>
  )
}

export default StudentHome
