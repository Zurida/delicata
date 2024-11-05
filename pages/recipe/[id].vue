<script setup>
definePageMeta({
    layout: 'recipe'
})

import { ref } from 'vue'
import { Swiper } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
Swiper.use([Thumbs, FreeMode, Navigation]);


// const { params: { id } } = useRoute();
// const { status, data: recipe } = await useLazyAsyncData('count', () => $fetch(`/api/recipe/${id}`))


const selectedIngridients = ref([]);

function initSlider() {
    const swiperThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 'auto',
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });

    const swiper = new Swiper('.gallery-main', {
        // speed: 400,
        // spaceBetween: 100,
        slidesPerView: 1,
        thumbs: {
            swiper: swiperThumbs,
        },
    });
}

onMounted(() => {
    initSlider()
})

</script>
<template>


    <div class="container recipe">
        <!-- {{ status === 'pending' ? 'Loading' : recipe }} -->

        <!-- <h2 class="recipe__title title">{{ recipe.title }}</h2> -->

        <!-- <div class="recipe__timing">
            <NuxtIcon name="clock" class="icon-clock" />
            <p>5-7 минут</p>
        </div> -->

        <div class="recipe__tags">
            <CommonTag v-for="tag in 4"></CommonTag>
        </div>

        <div class="recipe__description">
            <h4>Способ приготовления:</h4>
            <ol class="recipe__steps">
                <!-- <li>{{ recipe.description }}</li> -->
            </ol>
        </div>


    </div>
</template>

<style lang="scss" scoped>
.recipe {
    padding-top: 1rem;
    padding-bottom: 1rem;

    &__timing {
        display: flex;
        margin-bottom: .8rem;
    }

    &__columns {
        display: flex;
        padding-top: 2rem;
    }

    &__slider {
        margin-right: 4rem;
        flex-shrink: 0;
    }

    &__subtitle {
        font-size: 1.8rem;
        font-weight: 600;
        margin-bottom: 2.6rem;
    }

    &__item {
        display: flex;
        font-size: 1.6rem;

        &:not(:last-child) {
            margin-bottom: 1rem;
        }
    }

    &__checkbox {
        margin-right: .3rem;
    }

    &__mesure {
        margin-right: .3rem;
        font-weight: 600;
    }

    &__description {
        margin-top: 3.4rem;

        h4 {
            font-size: 1.8rem;
            font-weight: 600;
            margin-bottom: 2.4rem;
        }
    }

    &__steps {
        font-size: 1.6rem;

        li {
            list-style: decimal;
        }
    }
}

.icon-clock {
    margin-right: .4rem
}

.tag {
    &:not(:last-child) {
        margin-right: .4rem;
    }
}

.swiper {
    position: relative;
    overflow: hidden;

    &-wrapper {
        position: relative;
        display: flex;
        width: 30rem;
    }

    &-slide {
        width: 100%;
        height: 100%;
        border-radius: 5px;

        img {
            object-fit: cover;
            border-radius: 5px;
        }
    }

    .swiper-button {
        position: absolute;
        top: 50%;
        translate: -50%, -50%;
        cursor: pointer;

        &-prev {
            left: 0;
        }

        &-next {
            right: 0;
        }
    }
}

.gallery-main {
    border-radius: 10px;

    .swiper-wrapper {
        height: 30rem;
    }

    .swiper-slide img {
        width: 30rem;
        height: 30rem;
    }
}

.gallery-thumbs {
    box-sizing: border-box;
    padding: 10px 0;

    .swiper-wrapper {
        height: 7rem;
    }

    .swiper-slide {
        opacity: 0.7;
        cursor: pointer;

        img {
            width: 7rem;
            aspect-ratio: 1;
        }
    }

    .swiper-slide-thumb-active {
        opacity: 1;
    }
}
</style>