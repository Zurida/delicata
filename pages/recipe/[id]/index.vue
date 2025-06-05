<script setup>
import { ref } from 'vue'
import { Swiper } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
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

</script>
<template>


    <div class="container recipe">
        <!-- {{ status === 'pending' ? 'Loading' : recipe }} -->

        <h2 class="recipe__title title">{{ recipe.title ? recipe.title : "" }}</h2>

        <!-- <div class="recipe__timing">
            <NuxtIcon name="clock" class="icon-clock" />
            <p>5-7 минут</p>
        </div> -->

        <div class="recipe__tags">
            <CommonVTag v-for="tag in recipe.tags" :key="tag.title" :label="tag.title" :tag="tag" inactive filled />
        </div>

        <div class="recipe__columns">
            <div class="recipe__image"></div>
            <div class="recipe__slider" v-if="false">

                <div class="swiper gallery-main">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide"><img
                                src="https://eda.ru/img/eda/c390x390/s1.eda.ru/StaticContent/Photos/e/b7/eb731a7eb3454f64a7f14f368aaf65f8.jpg" />
                        </div>
                        <div class="swiper-slide"><img
                                src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" />
                        </div>
                        <div class="swiper-slide"><img
                                src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" />
                        </div>
                        <div class="swiper-slide"><img
                                src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" />
                        </div>
                        <div class="swiper-slide"><img
                                src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" />
                        </div>
                        <div class="swiper-slide"><img
                                src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" />
                        </div>
                    </div>
                </div>

                <div class="swiper gallery-thumbs">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide"><img
                                src="https://eda.ru/img/eda/c390x390/s1.eda.ru/StaticContent/Photos/e/b7/eb731a7eb3454f64a7f14f368aaf65f8.jpg" />
                        </div>
                        <div class="swiper-slide"><img
                                src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" />
                        </div>
                        <div class="swiper-slide"><img
                                src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" />
                        </div>
                        <div class="swiper-slide"><img
                                src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" />
                        </div>
                        <div class="swiper-slide"><img
                                src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" />
                        </div>
                        <div class="swiper-slide"><img
                                src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="recipe__ingredients">
                <div class="recipe__subtitle">
                    Ингредиенты:
                </div>

                <div class="recipe__list">
                    <div class="recipe__item" v-for="ingredient in recipe.ingredients" :key="ingredient.name">
                        <!-- <CommonVCheckbox class="recipe__checkbox" :label="ingredient.name" v-model="selectedingredients"
                            :value="ingredient" /> -->

                        <div class="checkbox-wrapper-52">
                            <label :for="ingredient.id" class="item">
                                <input type="checkbox" :id="ingredient.id" class="hidden" v-model="selectedingredients"
                                    :value="ingredient" />
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
            </div>

        </div>

        <div class="recipe__description">
            <h4>Способ приготовления:</h4>
            <div class="recipe__steps">
                <p>{{ recipe.description }}</p>
            </div>
        </div>


    </div>
</template>

<style lang="scss" scoped>
.recipe {
    padding-top: var(--gap);
    padding-bottom: var(--gap);

    &__timing {
        display: flex;
        margin-bottom: var(--gap);
    }

    &__title {
        margin-bottom: var(--gap);
        line-height: 1;
    }

    &__tags {
        display: flex;
        margin-bottom: var(--gap);

        .VTag {
            margin-right: var(--gap-sm);
        }
    }

    &__columns {
        display: flex;
        background-color: rgba(255, 255, 255, 0.6);
        padding: var(--gap);
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
        font-size: var(--fs-base);
        font-weight: 600;
        text-transform: uppercase;
    }

    &__item {
        display: flex;
        font-size: 1.4rem;

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
        margin-top: calc(var(--gap) * 2);

        h4 {
            font-size: 1.8rem;
            font-weight: 600;
            margin-bottom: var(--gap);
        }
    }

    &__steps {
        font-size: var(--fs-base);

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

.checkbox-wrapper-52 input[type="checkbox"] {
    visibility: hidden;
    display: none;
}

.checkbox-wrapper-52 label {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    line-height: 1;
}

.checkbox-wrapper-52 *,
.checkbox-wrapper-52 ::after,
.checkbox-wrapper-52 ::before {
    box-sizing: border-box;
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