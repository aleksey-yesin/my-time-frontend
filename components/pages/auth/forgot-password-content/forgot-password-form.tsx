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
import { Spinner } from '@/components/ui/spinner';

const schema = z.object({
  email: z.email({ message: 'Введіть валідний email' }),
});

export type ForgotPasswordFormValues = z.infer<typeof schema>;

interface Props {
  onSubmit: (values: ForgotPasswordFormValues) => void;
  isPending: boolean;
}

const ForgotPasswordForm: FC<Props> = ({ onSubmit, isPending }) => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
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
              <FieldLabel htmlFor="forgot-password-form-email">
                Email
              </FieldLabel>
              <Input
                {...field}
                id="forgot-password-form-email"
                aria-invalid={fieldState.invalid}
                placeholder="your@email.com"
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
          Надіслати код
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
