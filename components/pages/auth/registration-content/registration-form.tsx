import { FC } from 'react';
import z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
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
    email: z.string().email({ message: 'Введіть валідний email' }),
    password: z
      .string()
      .min(8, { message: 'Мінімум 8 символів' })
      .regex(/[a-z]/, { message: 'Потрібна мінімум 1 строчна буква' })
      .regex(/[A-Z]/, { message: 'Потрібна мінімум 1 заглавна буква' })
      .regex(/[0-9]/, { message: 'Потрібна мінімум 1 цифра' }),
    confirmPassword: z.string().min(1, { message: 'Підтвердіть пароль' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
  });

export type RegistrationFormValues = z.infer<typeof schema>;

interface Props {
  onSubmit: (values: RegistrationFormValues) => void;
  isPending?: boolean;
  initialValues?: RegistrationFormValues;
}

const RegistrationForm: FC<Props> = ({ onSubmit, isPending, initialValues }) => {
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues ?? {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = (values: RegistrationFormValues) => {
    onSubmit(values);
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
                placeholder="Мінімум 8 символів, 1 заглавна, 1 строчна, 1 цифра"
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
          disabled={isPending}
        >
          {isPending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          Зареєструватися
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
