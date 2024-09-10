<template>
  <UiContainer class="flex min-h-dvh items-center justify-center">
    <div class="w-full max-w-[340px]">
      <div class="text-center">
        <h1 class="text-3xl font-semibold lg:text-4xl">Create account</h1>
        <p class="text-muted-foreground">Start managing your pets today!</p>
      </div>

      <form @submit="submit" class="mt-10">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput name="name" label="Full name *" placeholder="Fulano algo" />
          <UiVeeInput name="email" label="Email *" placeholder="fulano@gmail.com" />
          <UiVeeInput name="password" label="Password *" type="password" />
          <UiButton type="submit" class="w-full">Create account</UiButton>

          <UiDivider label="or" />

          <UiButton type="button" variant="outline" class="w-full">
            <Icon name="logos:google-icon" />
            Sign up with Google
          </UiButton>
        </fieldset>
      </form>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

  const auth = useFirebaseAuth();
  
  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(RegisterSchema),
  });

  const submit = handleSubmit(async (values, ctx) => {
    const loading = useSonner.loading("Loading...", {
      description: "Creating your account",
    });
    try {
      const { user } = await createUserWithEmailAndPassword(auth!, values.email, values.password);
      console.log(user);
      useSonner.success("Account created successfully!", {
        id: loading,
      });
      // redirect to the dashboard
      //   return await navigateTo("/admin/dashboard", { replace: true });
    } catch (error: any) {
      // show error
      console.log(error.message);
      useSonner.error(error.message, {
        id: loading,
      });
    }
  });
</script>

<style lang="scss" scoped></style>
