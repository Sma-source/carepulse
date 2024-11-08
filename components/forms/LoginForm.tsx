"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { useState } from "react";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { LoginFormValidation } from "@/lib/validation";
import { logInUser } from "@/lib/actions/patient.actions";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof LoginFormValidation>) {
    setIsLoading(true);
    try {
      const user = {
        email: values.email,
        password: values.password,
      };
      const session = await logInUser(user);
      console.log("User logged in successfully", session);
      if (session) {
        router.push(`/patients/${session.userId}/details`);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Bonjour 👋</h1>
          <p className="text-dark-700">Se connecter!</p>
        </section>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="password"
          label="Mot de passe"
          type="password"
          placeholder="********"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <SubmitButton isLoading={isLoading}>Commencer</SubmitButton>
      </form>
    </Form>
  );
};

export default LoginForm;
