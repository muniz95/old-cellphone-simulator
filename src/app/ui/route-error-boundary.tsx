import { Component, ReactNode } from 'react';
import HomeScreen from '@/shared/ui/home-screen';

interface RouteErrorBoundaryProps {
  children: ReactNode;
  resetKey: string;
  fallback?: ReactNode;
}

interface RouteErrorBoundaryState {
  hasError: boolean;
}

const defaultFallback = (
  <HomeScreen>
    <span role="alert">Unexpected route error.</span>
  </HomeScreen>
);

class RouteErrorBoundary extends Component<
  RouteErrorBoundaryProps,
  RouteErrorBoundaryState
> {
  state: RouteErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): RouteErrorBoundaryState {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: RouteErrorBoundaryProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? defaultFallback;
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
