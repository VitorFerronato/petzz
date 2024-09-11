<template>
  <UiContainer class="flex min-h-dvh items-center justify-center">
    <div class="w-full max-w-[340px]">
      <div class="text-center">
        <h1 class="text-3xl font-semibold lg:text-4xl">Sign in</h1>
        <p class="text-muted-foreground">Welcome back! Enter your details to get started</p>
      </div>

      <form @submit="submit" class="mt-10">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput name="email" label="Email *" placeholder="fulano@gmail.com" />
          <UiVeeInput name="password" label="Password *" type="password" />
          <p>
            <NuxtLink
              to="/forgot-password"
              class="text-sm font-semibold text-primary hover:underline"
              >Forgot password?</NuxtLink
            >
          </p>
          <UiButton type="submit" class="w-full">Sign in</UiButton>

          <UiDivider label="or" />

          <UiButton @click="signInWithGoogle" type="button" variant="outline" class="w-full">
            <Icon name="logos:google-icon" />
            Sign in with Google
          </UiButton>
        </fieldset>
      </form>

        <p class="text-sm text-center mt-10">
            Don't have an account?
            <NuxtLink
              to="/register"
              class="text-sm font-semibold text-primary hover:underline"
              >Create one here!</NuxtLink
            >
          </p>
    </div>
  </UiContainer>
</template>

<script lang="ts">
  import { GoogleAuthProvider } from "firebase/auth";

  export const googleAuthProvider = new GoogleAuthProvider();
</script>

<script lang="ts" setup>
  import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

  const auth = useFirebaseAuth();

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(LoginSchema),
  });

  const submit = handleSubmit(async (values, ctx) => {
    const loading = useSonner.loading("Loading...", {
      description: "We are signing you in",
    });

    try {
      await signInWithEmailAndPassword(auth!, values.email, values.password);
      useSonner.success("User logged!", {
        id: loading,
      });

      return await navigateTo("/admin/dashboard", { replace: true });
    } catch (error: any) {
      console.log(error.message);
      useSonner.error(error.message, {
        id: loading,
      });
    }
  });

  const signInWithGoogle = async () => {
    const loading = useSonner.loading("Loading...", {
      description: "We are signing you in",
    });

    try {
      await signInWithPopup(auth!, googleAuthProvider);
      useSonner.success("User logged!", {
        id: loading,
      });
      return await navigateTo("/admin/dashboard", { replace: true });
    } catch (error: any) {
      console.log(error.message);
      useSonner.error(error.message, {
        id: loading,
      });
    }
  };
</script>

<style lang="scss" scoped></style>
