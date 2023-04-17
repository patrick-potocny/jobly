import React, { useEffect, ComponentType } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { auth } from "@/lib/firebase";

// Redirect to login page if user is not authenticated
function withAuth<P extends {}>(
  WrappedComponent: ComponentType<P>
) {
  function WithAuthComponent(props: P): JSX.Element {
    const [user] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
      if (!user) router.push('/'); 
    }, [user, router]);

    return <WrappedComponent {...props} />;
  }

  return WithAuthComponent;
}

export default withAuth;
