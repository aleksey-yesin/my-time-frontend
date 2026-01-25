import { FC } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { Button } from '@/components/ui/button';
import { refreshTokenAtom, unsetTokenPairAtom } from '@/lib/atoms/auth.atoms';
import { useLogoutMutation } from '@/lib/api/auth.queries';

const DashboardHeader: FC = () => {
  const refreshToken = useAtomValue(refreshTokenAtom);
  const unsetTokenPair = useSetAtom(unsetTokenPairAtom);

  const { mutate: logout } = useLogoutMutation({
    onSuccess: unsetTokenPair,
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
