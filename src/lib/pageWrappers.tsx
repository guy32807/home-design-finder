import { Suspense, ReactNode } from 'react';

interface LoadingProps {
  title: string;
  message?: string;
}

export function LoadingFallback({ title, message }: LoadingProps) {
  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem 1rem',
      textAlign: 'center' 
    }}>
      <h1>{title}</h1>
      <p>{message || 'Please wait while we load the content...'}</p>
    </div>
  );
}

export function withSuspense<T>(
  Component: React.ComponentType<T>, 
  loadingProps: LoadingProps
) {
  return function WithSuspenseWrapper(props: T & Record<string, any>) {
    return (
      <Suspense fallback={<LoadingFallback {...loadingProps} />}>
        <Component {...props} />
      </Suspense>
    );
  };
}