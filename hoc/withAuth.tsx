import React, { useEffect, ComponentType, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Redirect to login page if user is not authenticated
function withAuth<P extends {}>(
  WrappedComponent: ComponentType<P>
) {
  function WithAuthComponent(props: P): JSX.Element {
    const {user, loading} = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!user && !loading) router.push('/'); 
    }, [user, router, loading]);

    if (loading) return <LoadingSpinner/>;

    return <WrappedComponent {...props}/>;
  }

  return WithAuthComponent;
}

export default withAuth;
