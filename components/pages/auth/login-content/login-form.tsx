import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface LoginFormValues {
  email: string;
  password: string;
}
interface Props {
  onSubmit: (values: LoginFormValues) => void;
}

const LoginForm: FC<Props> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ email, password });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Пароль</Label>
          <Button variant="link" className="h-5" type="button">
            Забыли?
          </Button>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        variant="default-gradient"
        className="mt-6 h-12 w-full text-base font-semibold"
      >
        Войти
      </Button>
    </form>
  );
};

export default LoginForm;
