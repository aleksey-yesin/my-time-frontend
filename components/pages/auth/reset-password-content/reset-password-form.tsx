import { FC } from 'react';
import z from 'zod';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';

const schema = z
  .object({
    code: z.string().length(6, { message: 'Код повинен містити 6 цифр' }),
    password: z
      .string()
      .min(8, { message: 'Мінімум 8 символів' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
        message: 'Повинен містити цифри, великі та малі літери',
      }),
    confirmPassword: z.string().min(1, { message: 'Підтвердіть пароль' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<ResetPasswordFormValues> | null;
  onSubmit: (values: ResetPasswordFormValues) => void;
  isPending: boolean;
}

const ResetPasswordForm: FC<Props> = ({
  defaultValues,
  onSubmit,
  isPending,
}) => {
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: '',
      password: '',
      confirmPassword: '',
      ...defaultValues,
    },
  });

  return (
    <form className="space-y-11" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="reset-password-code">
                Код підтвердження
              </FieldLabel>
              <div className="flex justify-center">
                <InputOTP
                  {...field}
                  id="reset-password-code"
                  aria-invalid={fieldState.invalid}
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                >
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="size-12 text-lg"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="reset-password-password">
                Новий пароль
              </FieldLabel>
              <Input
                {...field}
                id="reset-password-password"
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
              <FieldLabel htmlFor="reset-password-confirm-password">
                Підтвердіть пароль
              </FieldLabel>
              <Input
                {...field}
                id="reset-password-confirm-password"
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
          className="h-12 w-full gap-3.5 text-base font-semibold"
          type="submit"
          disabled={isPending}
        >
          {isPending && <Spinner />}
          Скинути пароль
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
