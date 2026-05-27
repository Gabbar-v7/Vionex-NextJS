"use client";

import { ZodErrorUtils, z } from "@packages/utilities";
import { useState } from "react";
import { BetterFetchError } from "@packages/auth/client";

type UseZodFormOptions<T extends z.ZodObject> = {
    schema: T;
    /** Called with validated data on submit. Use `setFieldErrors` to surface server-side errors. */
    onSubmit: (
        data: z.output<T>,
        setFieldErrors: React.Dispatch<React.SetStateAction<FieldErrors<T>>>
    ) => Promise<void>;
    /** If provided, a success toast is shown after `onSubmit` resolves. */
    successToast?: string;
};

type FormFields<T extends z.ZodObject> = {
    [K in keyof z.output<T>]: {
        label: { htmlFor: K };
        input: { id: K; name: K };
    };
};

/** Field-level errors keyed by field name. `global` and `auth` are reserved for non-field errors. */
type FieldErrors<T extends z.ZodObject> = Partial<Record<"global" | "auth" | keyof z.output<T>, string>>;

type UseZodFormReturn<T extends z.ZodObject> = {
    isSubmitting: boolean;
    formFields: FormFields<T>;
    fieldErrors: FieldErrors<T>;
    /** Pass directly to a `<form>` element's `onSubmit` prop. */
    handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
};

/**
 * Integrates Zod validation with native HTML form submission.
 *
 * @example
 * const { isSubmitting, fieldErrors, handleSubmit } = useZodForm({
 *   schema: z.object({ email: z.string().email() }),
 *   onSubmit: async (data, setFieldErrors) => {
 *     const err = await login(data);
 *     if (err) setFieldErrors({ auth: "Invalid credentials." });
 *   },
 * });
 */
export function useZodForm<T extends z.ZodObject>({
    schema,
    onSubmit,
    successToast,
}: UseZodFormOptions<T>): UseZodFormReturn<T> {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors<T>>({});

    const formFields = Object.keys(schema.shape).reduce((acc, key) => {
        const k = key as keyof z.output<T>;
        acc[k] = {
            label: { htmlFor: k },
            input: { id: k, name: k },
        };
        return acc;
    }, {} as FormFields<T>);

    const handleSubmit = async (
        event: React.SubmitEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        setIsSubmitting(true);
        setFieldErrors({});

        try {
            const rawFormData = Object.fromEntries(new FormData(event.currentTarget));
            const parsedData = schema.parse(rawFormData);

            if (onSubmit) await onSubmit(parsedData, setFieldErrors);

            if (successToast) {
                console.log(successToast);
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const zodErrors = ZodErrorUtils.zodErrorsToRecord(error) as typeof fieldErrors;
                setFieldErrors(zodErrors);
            } else if (error instanceof BetterFetchError) {
                setFieldErrors((prev) => ({ ...prev, auth: error.message }));
            } else {
                setFieldErrors((prev) => ({
                    ...prev,
                    global: "An unexpected error occurred. Please try again.",
                }));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return { isSubmitting, formFields, fieldErrors, handleSubmit };
}