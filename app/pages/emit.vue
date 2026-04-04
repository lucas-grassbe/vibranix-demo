<script setup lang="ts">
useHead({
  title: 'Estudo: Emit e DefineModel',
})

const titleEmit = ref("Eu tenho que mudar (emit)")
const titleModel = ref("Eu tenho que mudar (defineModel)")

const handleUpdateTitle = (value: string) => {
  titleEmit.value = value
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <ui-title-page title="Emit e DefineModel" />
    <h1>{{ titleEmit }}</h1>
    <EmitExample @updateTitle="handleUpdateTitle" />
    <h1>{{ titleModel }}</h1>
    <DefineModelExample v-model="titleModel" />
  </div>
</template>
