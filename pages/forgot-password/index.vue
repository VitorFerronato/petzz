<template>
  <UiContainer class="flex min-h-dvh items-center justify-center">
    <div class="w-full max-w-[340px]">
      <div class="text-center">
        <h1 class="text-3xl font-semibold lg:text-4xl">Forgot password</h1>
        <p class="text-muted-foreground">Let us help you sign in to your account</p>
      </div>

      <form @submit="submit" class="mt-10">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput name="email" label="Email *" placeholder="fulano@gmail.com" />
          <UiButton type="submit" class="w-full">Send instructions</UiButton>

          <UiDivider label="or" />

          <UiButton to="/" type="button" variant="outline" class="w-full"> Go to sign in </UiButton>
        </fieldset>
      </form>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import { sendPasswordResetEmail } from "firebase/auth";

  definePageMeta({
    middleware: "already-logged-in",
  });

  const auth = useFirebaseAuth();

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(ForgotPasswordSchema),
  });

  const submit = handleSubmit(async (values, ctx) => {
    const loading = useSonner.loading("Loading...", {
      description: "We are sending the instructions to your email",
    });

    try {
      await sendPasswordResetEmail(auth!, values.email, {
        url: "http://localhost:3000",
      });

      useSonner.success("Please check your email!", {
        id: loading,
        description: "We have sent you instructions to reset your password",
      });

      return await navigateTo("/", { replace: true });
    } catch (error: any) {
      console.log(error.message);
      useSonner.error(error.message, {
        id: loading,
      });
    }
  });
</script>

<style lang="scss" scoped></style>
