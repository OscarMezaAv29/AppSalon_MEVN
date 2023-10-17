<script setup>
    defineProps({
        service: {
            type: Object
        }
    })
</script>

<template>
  <div>
    <p>{{ service.name }}</p>
  </div>
</template>