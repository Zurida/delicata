<!-- <script setup lang="ts">
import type { TRecipe } from '~/types/recipe';

defineProps<{
    recipe: TRecipe,
}>()

const isDragging = ref(false)


function handleFileChange(e: Event) {
    const eventTarget = e.target as HTMLInputElement;
    recipe.images = [...Array.from(eventTarget?.files || [])];
}

function removeFile(index: number) {
    if (!recipe.images) return
    recipe.images.splice(index, 1);
}

function handleDragover(e: Event) {
    e.preventDefault();
    isDragging.value = true;
}

function handleDragleave() {
    isDragging.value = false;
}

function handleDrop(e: DragEvent) {
    e.preventDefault();
    recipe.images = [...Array.from(e.dataTransfer?.files || [])];
    isDragging.value = false;
}

function generateURL(file: File) {
    let fileSrc = URL.createObjectURL(file);
    setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
    }, 1000);
    return fileSrc;
}
</script>



<template>

    <div class="upload" :class="{ 'is-dragging': isDragging }" @dragover="handleDragover" @dragleave="handleDragleave"
        @drop="handleDrop">
        <label for="file-input" class="upload__label">
            <IconsIconUpload class="upload__icon"></IconsIconUpload>
            Добавить одну или несколько картинок
        </label>
        <input id="file-input" hidden type="file" @change="handleFileChange" multiple accept=".jpg,.jpeg,.png" />

        <TransitionGroup name="list" tag="ul" class="upload__list">
            <li v-for="(file, index) in recipe.images" :key="file.name" class="upload__item">
                <IconsIconClose class="upload__remove" @click="removeFile(index)"></IconsIconClose>

                <div class="upload__preview">

                    <img :src="generateURL(file)" />
                </div>
                <div>
                    <p> {{ file.name }}</p>
                    <p>{{ Math.round(file.size / 1000) }} КБ</p>
                </div>
            </li>
        </TransitionGroup>
    </div>
</template> -->

<template></template>