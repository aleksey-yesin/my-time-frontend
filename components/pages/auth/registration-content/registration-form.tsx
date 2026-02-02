import { FC } from 'react';
import z from 'zod';
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

const schema = z
  .object({
    email: z.email({ message: 'Введіть валідний email' }),
    password: z.string().min(6, { message: 'Мінімум 6 символів' }),
    confirmPassword: z.string().min(1, { message: 'Підтвердіть пароль' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
  });

export type RegistrationFormValues = z.infer<typeof schema>;

interface Props {
  onSubmit: (values: { email: string; password: string }) => void;
}

const RegistrationForm: FC<Props> = ({ onSubmit }) => {
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = (values: RegistrationFormValues) => {
    onSubmit({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <form className="space-y-11" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="registration-form-email">Email</FieldLabel>
              <Input
                {...field}
                id="registration-form-email"
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
              <FieldLabel htmlFor="registration-form-password">
                Пароль
              </FieldLabel>
              <Input
                {...field}
                id="registration-form-password"
                aria-invalid={fieldState.invalid}
                type="password"
                placeholder="Мінімум 6 символів"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="registration-form-confirm-password">
                Підтвердіть пароль
              </FieldLabel>
              <Input
                {...field}
                id="registration-form-confirm-password"
                aria-invalid={fieldState.invalid}
                type="password"
                placeholder="Повторіть пароль"
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
          Зареєструватися
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
