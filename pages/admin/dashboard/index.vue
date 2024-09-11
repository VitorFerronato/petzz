<template>
  <div>
    <UiNavbar sticky>
      <UiContainer>
        <NuxtLink to="/admin/dashboard">Petzz</NuxtLink>
        <div>
          <UiButton size="icon-sm" variant="ghost" title="Toggle theme">
            <span class="sr-only">Toggle theme</span>
            <Icon name="lucide:sun-medium" />
          </UiButton>
        </div>
      </UiContainer>
    </UiNavbar>
    <h1>Welcome back {{ user?.displayName }}</h1>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: "auth",
  });
</script>

<style lang="scss" scoped></style>
