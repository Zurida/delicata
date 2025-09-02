<script setup>
import { ref } from 'vue'
import { Swiper } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { formatDate } from '~/assets/ts/utils';
Swiper.use([Thumbs, FreeMode, Navigation]);

definePageMeta({
    middleware: ['auth'],
});

const { params: { id } } = useRoute();
const { data: recipe } = await useFetch(`/api/recipes/${id}`)


const selectedingredients = ref([]);

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

async function handleDelete() {
    await $fetch(`https://kavkaz-build.ru/api/recipes/${id}`, {
        method: 'DELETE'
    }).then(() => {
        navigateTo('/')
    })
}
</script>
<template>


    <div class="container recipe">
        <!-- {{ status === 'pending' ? 'Loading' : recipe }} -->

        <div class="recipe__top">
            <h2 class="recipe__title title">{{ recipe.title ? recipe.title : "" }}</h2>
            <div class="recipe__menu menu">
                <button type="button" class="menu__btn" title="Удалить" @click="handleDelete">
                    <span></span>
                    <IconsIconDelete class="menu__icon" />
                </button>
                <button type="button" class="menu__btn" title="Изменить" @click="$router.push(`/recipe/${id}/edit`)">
                    <span></span>
                    <IconsIconEdit class="menu__icon" />
                </button>

                <!-- <div class="menu-share">
                    <button type="button" class="menu__btn" title="Поделиться рецептом">
                        <span></span>
                        <IconsIconShare class="menu__icon" />
                    </button>
                    <div class="menu-share__list">
                        <SocialShare network="telegram" :styled="true" :icon="true" :label="false">
                            <template #icon>
                                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path class="cls-1"
                                        d="M40.83,8.48c1.14,0,2,1,1.54,2.86l-5.58,26.3c-.39,1.87-1.52,2.32-3.08,1.45L20.4,29.26a.4.4,0,0,1,0-.65L35.77,14.73c.7-.62-.15-.92-1.07-.36L15.41,26.54a.46.46,0,0,1-.4.05L6.82,24C5,23.47,5,22.22,7.23,21.33L40,8.69a2.16,2.16,0,0,1,.83-.21Z" />
                                </svg></template>
</SocialShare>
</div>
</div> -->

            </div>


        </div>
        <div class="recipe__date">Добавлено: {{ formatDate(recipe.created_at) }}</div>

        <div class="recipe__tags">
            <CommonVTag v-for="tag in recipe.tags" :key="tag.title" :label="tag.title" :tag="tag" inactive filled />
        </div>
        <!-- <div class="recipe__timing">
            <NuxtIcon name="clock" class="icon-clock" />
            <p>5-7 минут</p>
        </div> -->


        <div class="recipe__columns">

            <div class="recipe__info">

                <div class="recipe__slider" v-if="recipe.images.length">

                    <div class="swiper gallery-main">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="slide in recipe.images" :key="slide.id"><img
                                    :src="slide.url" />
                            </div>
                        </div>
                    </div>

                    <div class="swiper gallery-thumbs">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="slide in recipe.images" :key="slide.id"><img
                                    :src="slide.url" />
                            </div>

                        </div>
                    </div>
                </div>
                <div class="recipe__image" v-else>

                </div>
                <div class="recipe__ingredients">
                    <div class="recipe__subtitle">
                        Ингредиенты:
                    </div>


                    <div class="recipe__list" v-if="recipe.ingredients.length">
                        <div class="recipe__item" v-for="ingredient in recipe.ingredients" :key="ingredient.name">
                            <!-- <CommonVCheckbox class="recipe__checkbox" :label="ingredient.name" v-model="selectedingredients"
                            :value="ingredient" /> -->

                            <div class="checkbox-wrapper-52">
                                <label :for="ingredient.id" class="item">
                                    <input type="checkbox" :id="ingredient.id" class="hidden"
                                        v-model="selectedingredients" :value="ingredient" />
                                    <label :for="ingredient.id" class="cbx">
                                        <svg width="14px" height="12px" viewBox="0 0 14 12">
                                            <polyline points="1 7.6 5 11 13 1"></polyline>
                                        </svg>
                                    </label>
                                    <label :for="ingredient.id" class="cbx-lbl">{{ ingredient.title }} - {{
                                        ingredient.quantity }}
                                        {{
                                            ingredient.measure.title }}</label>
                                </label>
                            </div>
                            <!-- <span class="recipe__mesure">{{ ingredient.title }} - {{ ingredient.quantity }} {{
                            ingredient.measure.title }}</span> -->
                        </div>
                    </div>
                    <p v-else>Пока ничего не добавили</p>

                    <!-- <CommonVButton small class="recipe__btn">Поделиться списком</CommonVButton> -->

                </div>
            </div>
        </div>



        <div class="recipe__description" v-if="recipe.description">
            <h4>Способ приготовления:</h4>
            <div class="recipe__steps">
                <p>{{ recipe.description }}</p>
            </div>
        </div>



    </div>
</template>

<style lang="scss" scoped>
.cls-1 {
    fill: none;
    stroke: #000000;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.recipe {
    padding-top: var(--gap);
    padding-bottom: var(--gap);

    &__top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    &__timing {
        display: flex;
        margin-bottom: var(--gap);
    }

    &__title {
        margin-bottom: var(--gap);
        line-height: 1;
    }

    &__date {
        font-size: var(--fs-small);
        margin-bottom: var(--gap-sm);
    }

    &__tags {
        display: flex;
        // margin-bottom: calc(var(--gap) * 2);
        // border-bottom: 1px solid lightgray;
        padding-bottom: var(--gap);

        .VTag {
            margin-right: var(--gap-sm);
        }
    }

    &__columns {
        background-color: var(--white);
        padding: var(--gap);
        border-radius: var(--border-radius);
    }

    &__info {
        display: flex;
    }

    &__image {
        flex-shrink: 0;
        width: 20rem;
        height: 20rem;
        border-radius: 4px;
        background-color: #eee;
        margin-right: 4rem;

    }

    &__slider {
        margin-right: 4rem;
        flex-shrink: 0;
    }

    &__subtitle {
        margin-bottom: var(--gap);
        line-height: 1;
        font-size: 1.8rem;
        font-weight: 600;
        text-transform: uppercase;
    }

    &__item {
        display: flex;
        font-size: var(--fs-base);

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
        // margin-top: calc(var(--gap) * 2);
        padding-top: var(--gap);
        // border-top: 1px solid #00000019;

        h4 {
            font-size: 1.8rem;
            font-weight: 600;
            margin-bottom: var(--gap-sm);
        }
    }

    &__steps {
        font-size: var(--fs-base);

        li {
            list-style: decimal;
        }
    }

    &__btn {
        margin-top: var(--gap);
    }
}

.container {
    position: relative;
}

.menu {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    padding: var(--gap);
    background-color: white;
    border-radius: var(--border-radius);

    &__btn {
        // position: absolute;
        background-color: #5c979b;
        color: var(--white);
        border-radius: var(--border-radius);
        width: 2.8rem;
        height: 2.8rem;
        transition: all 0.3s ease;

        &:not(:last-child) {
            margin-right: var(--gap-sm);
        }

        svg {
            width: 1.4rem;
            transition: fill 0.3s ease;
        }

        &:hover {
            background-color: white;
            color: #5c979b;
        }
    }

    // &__icon {
    //     width: 1.2rem;
    // }
}

.menu-share {
    display: inline-flex;

    &__list {
        position: absolute;
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
        width: 20rem;
    }

    &-slide {
        width: 100%;
        height: 100%;
        border-radius: 4px;

        img {
            object-fit: cover;
            border-radius: 4px;
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
        height: 20rem;
    }

    .swiper-slide img {
        width: 20rem;
        height: 20rem;
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


.checkbox-wrapper-52 {
    margin-bottom: var(--gap-sm);
}

.checkbox-wrapper-52 input[type="checkbox"] {
    visibility: hidden;
    display: none;
}

.checkbox-wrapper-52 label {
    display: flex;
    align-items: center;

    vertical-align: baseline;
    line-height: 1;
}

.checkbox-wrapper-52 .item .cbx {
    position: relative;
    top: 1px;
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 6px;
    border: 1px solid #c8ccd4;
    border-radius: 2px;
    cursor: pointer;
}

.checkbox-wrapper-52 .item .cbx svg {
    position: relative;
    top: -1px;
    transform: scale(0);
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.checkbox-wrapper-52 .item .cbx svg polyline {
    stroke-width: 2;
    stroke: var(--main-2);
}

.checkbox-wrapper-52 .item .cbx:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -10px 0 0 -10px;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: var(--main-2);
    transform: scale(0);
}

.checkbox-wrapper-52 .item .cbx:after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 2px;
    height: 2px;
    border-radius: 2px;
    box-shadow: 0 -18px 0 var(--main-2), 12px -12px 0 var(--main-2), 18px 0 0 var(--main-2), 12px 12px 0 var(--main-2), 0 18px 0 var(--main-2), -12px 12px 0 var(--main-2), -18px 0 0 var(--main-2), -12px -12px 0 var(--main-2);
    transform: scale(0);
}

.checkbox-wrapper-52 .item .cbx-lbl {
    position: relative;
    cursor: pointer;
    transition: color 0.3s ease;
}

.checkbox-wrapper-52 .item .cbx-lbl:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 0;
    height: 1px;
    background: #9098a9;
}

.checkbox-wrapper-52 .item input {
    display: none;
}

.checkbox-wrapper-52 .item input:checked+.cbx {
    border-color: transparent;
}

.checkbox-wrapper-52 .item input:checked+.cbx svg {
    transform: scale(1);
    transition: all 0.4s ease;
    transition-delay: 0.1s;
}

.checkbox-wrapper-52 .item input:checked+.cbx:before {
    transform: scale(1);
    opacity: 0;
    transition: all 0.3s ease;
}

.checkbox-wrapper-52 .item input:checked+.cbx:after {
    transform: scale(1);
    opacity: 0;
    transition: all 0.6s ease;
}

.checkbox-wrapper-52 .item input:checked~.cbx-lbl {
    color: #9098a9;
}

.checkbox-wrapper-52 .item input:checked~.cbx-lbl:after {
    width: 100%;
    transition: all 0.4s ease;
}
</style>