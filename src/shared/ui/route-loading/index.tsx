import HomeScreen from '@/shared/ui/home-screen';

interface RouteLoadingProps {
  label?: string;
}

const RouteLoading = ({ label = 'Loading...' }: RouteLoadingProps) => {
  return <HomeScreen>{label}</HomeScreen>;
};

export default RouteLoading;
