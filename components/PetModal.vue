<template>
  <div>
    <UiDialog v-model:open="open">
      <UiDialogContent class="max-w-[400px]" :title="title" :description="description">
        <template #content>
          <form @submit="submit">
            <fieldset :disabled="isSubmitting" class="grid gap-5">
              <UiVeeInput name="name" label="Pet name *" />
              <UiVeeInput name="age" label="Pet age *" type="number" min="0" />
              <UiButton type="submit" class="w-full">
                {{ buttonText }}
              </UiButton>
            </fieldset>
          </form>
        </template>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script setup lang="ts">
  import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
  import type { Pet } from "~/types";

  const collectionName = "pets";

  const props = defineProps<{
    pet?: Pet;
  }>();

  const isEditing = computed(() => !!props.pet);
  const db = useFirestore();
  const user = useCurrentUser();

  const title = computed(() => (isEditing.value ? "Edit pet" : "Add pet"));
  const description = computed(() => (isEditing.value ? "Edit your pet" : "Add a new pet"));
  const buttonText = computed(() => (isEditing.value ? "Update" : "Create"));

  const open = defineModel({ default: false });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(PetSchema),
  });

  const submit = handleSubmit(async (values) => {
    if (isEditing.value) {
      //
    } else {
      const petRef = doc(collection(db, collectionName));
      await setDoc(petRef, {
        ...values,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.value?.uid,
      });

      useSonner.success("Pet created successfully");
    }
    open.value = false;
  });
</script>

<style lang="scss" scoped></style>
