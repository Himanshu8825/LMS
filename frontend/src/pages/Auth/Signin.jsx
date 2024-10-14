import Form from '@/components/common/Form';
import { initialSignInFormData, signInFormControls } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/Store/Slices/AuthSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState(initialSignInFormData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();


  const loginHandler = async (event) => {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data)=>{
      if (data?.payload?.success) {
        console.log('Data ', data);

        toast({
          title: data?.payload?.message,
        });
        navigate('/auth/signin');
      } else {
        toast({
          title: data?.payload?.message,
          variant: 'destructive',
        });
      }
    })

  };

  const validation = () => {
    return (
      formData &&
      formData.userEmail.trim() !== '' &&
      formData.password.trim() !== ''
    );
  };

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="text-center">
        <h1 className="text-4xl text-[#7D0DC3] font-bold tracking-tight text-foreground">
          Signin to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium text-primary hover:underline hover:text-blue-500 ml-2"
            to="/auth/signup"
          >
            Signup
          </Link>
        </p>
      </div>
      <Form
        formControls={signInFormControls}
        buttonText={'Signin'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={loginHandler}
        isBtnDisabled={!validation()}
      />
    </div>
  );
};

export default Signin;
