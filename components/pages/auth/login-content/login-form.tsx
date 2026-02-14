import { FC } from 'react';
import z from 'zod';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

const schema = z.object({
  email: z.email({ message: 'Введіть валідний email' }),
  password: z.string().min(3, { message: 'Мінімум 3 символи' }),
});

export type LoginFormValues = z.infer<typeof schema>;

interface Props {
  onSubmit: (values: LoginFormValues) => void;
}

const LoginForm: FC<Props> = ({ onSubmit }) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form className="space-y-11" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-form-email">Email</FieldLabel>
              <Input
                {...field}
                id="login-form-email"
                aria-invalid={fieldState.invalid}
                placeholder="your@email.com"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="login-form-password">Пароль</FieldLabel>
                <Button
                  variant="link"
                  className="h-5 cursor-default"
                  type="button"
                  asChild
                >
                  <Link href="/forgot-password">Забули?</Link>
                </Button>
              </div>
              <Input
                {...field}
                id="login-form-password"
                aria-invalid={fieldState.invalid}
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Submit group */}
      <div>
        <Button
          variant="default-gradient"
          className="h-12 w-full text-base font-semibold"
          type="submit"
        >
          Увійти
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
