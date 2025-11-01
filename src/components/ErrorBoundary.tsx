import React, { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-light-foreground dark:text-dark-foreground bg-light-background dark:bg-dark-background">
          <div className="border-2 border-light-red dark:border-dark-red rounded p-4">
            <h2 className="text-light-red dark:text-dark-red font-bold mb-2">
              ⚠ An error occurred
            </h2>
            <p className="text-sm mb-2">{this.state.error?.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-light-blue dark:text-dark-blue underline hover:opacity-80"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
