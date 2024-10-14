import Form from '@/components/common/Form';
import { initialSignUpFormData, signUpFormControls } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { signupUser } from '@/Store/Slices/AuthSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState(initialSignUpFormData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const signupHandler = async (event) => {
    event.preventDefault();

    dispatch(signupUser(formData)).then((data) => {
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
    });
  };

  const validation = () => {
    return (
      formData &&
      formData.userName.trim() !== '' &&
      formData.userEmail.trim() !== ' ' &&
      formData.password.trim() !== ''
    );
  };

  return (
    <div className="mx-auto w-full max-w-xl space-y-6 ">
      <div className="text-center">
        <h1 className="text-4xl text-[#7D0DC3] font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2 bg-green">
          Already have an account?
          <Link
            className="font-medium text-primary hover:underline hover:text-blue-500 ml-2"
            to="/auth/signin"
          >
            Sign in
          </Link>
        </p>
      </div>
      <Form
        formControls={signUpFormControls}
        buttonText={'Signup'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={signupHandler}
        isBtnDisabled={!validation()}
      />
    </div>
  );
};

export default Signup;
