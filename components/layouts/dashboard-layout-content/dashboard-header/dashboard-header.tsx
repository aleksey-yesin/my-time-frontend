import { FC } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { Button } from '@/components/ui/button';
import { accessTokenAtom, refreshTokenAtom } from '@/lib/atoms/auth.atoms';
import { useLogoutMutation } from '@/lib/api/auth.queries';

const DashboardHeader: FC = () => {
  const setAccessToken = useSetAtom(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);

  const { mutate: logout } = useLogoutMutation({
    onSuccess: () => {
      setAccessToken(null);
      setRefreshToken(null);
    },
  });

  const handleLogout = () => {
    if (refreshToken) {
      logout({ refresh_token: refreshToken });
    }
  };

  return (
    <div>
      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default DashboardHeader;
