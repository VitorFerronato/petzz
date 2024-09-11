<template>
  <div>
    <UiNavbar class="fixed left-0 top-0 z-50 w-full">
      <div class="flex h-14 w-full items-center justify-between pl-4 pr-4">
        <NuxtLink to="/admin/dashboard">Petzz</NuxtLink>
        <div>
          <UiButton
            @click="$colorMode.preference = $colorMode.value == 'dark' ? 'ligth' : 'dark'"
            size="icon-sm"
            variant="ghost"
            title="Toggle theme"
          >
            <span class="sr-only">Toggle theme</span>
            <Icon class="h-4 w-4" name="lucide:sun-medium" />
          </UiButton>
          <UiButton @click="logout" size="icon-sm" variant="ghost" title="Logout">
            <span class="sr-only">Logout</span>
            <Icon class="h-4 w-4" name="lucide:log-out" />
          </UiButton>
        </div>
      </div>
    </UiNavbar>
    <UiContainer class="py-10">
      <div class="flex flex-col justify-between gap-5 lg:flex-row">
        <h1 class="pt-16">Welcome back {{ user?.displayName }}</h1>
        <UiButton @click="dialog = true"> Add pet</UiButton>
      </div>
    </UiContainer>

    <PetModal v-model="dialog" :pet="editItem" />
  </div>
</template>

<script setup lang="ts">
  import { signOut } from "firebase/auth";
  import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
  import type { Pet } from "~/types";

  definePageMeta({
    middleware: "auth",
  });

  const user = useCurrentUser();

  const dialog = ref(false);
  const editItem = ref<Pet>();

  const auth = useFirebaseAuth();
  const db = useFirestore();
  const collectionName = "pets";

  const q = query(collection(db, collectionName), where("userId", "==", user.value?.uid));
  const { data: pets, pending } = useCollection<Pet>(q);

  const logout = async () => {
    await signOut(auth!);
    await navigateTo("/", { replace: true });
  };
</script>

<style lang="scss" scoped></style>
