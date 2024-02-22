import React, { useContext, useEffect, useState } from 'react';
import { LoadingContext } from '../context/LoadingContext';
import { handleGoogleSignIn } from './Signup';
import { Google as GoogleIcon } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const PostShifts = () => {

  const { user } = useContext(LoadingContext);
  const [ shouldRedirect, setShouldRedirect ] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      setShouldRedirect(true);
    } else { 
      setShouldRedirect(false);
    }
  }, [user]);

  useEffect(() => {
    if (shouldRedirect) {
      navigate('/signup');
    }
  }, [shouldRedirect]);

  return (
    <div>
        Post Shifts
    </div>
  )
}

export default PostShifts