<script setup>
definePageMeta({
    layout: 'recipe'
})

import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import './style.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const modules = [FreeMode, Navigation, Thumbs]

const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper) => {
    thumbsSwiper.value = swiper;
};

</script>
<template>
    <div class="recipe">
        <h2 class="recipe__title">Тост с авокадо</h2>

        <div class="recipe__timing">
            <NuxtIcon name="clock" />
            <p>5-7 минут</p>
        </div>

        <div class="recipe__tags">
            <CommonTag v-for="tag in 4"></CommonTag>
        </div>

        <div class="recipe__columns">
            <div class="recipe__slider">
                <swiper :navigation="true" :thumbs="{ swiper: thumbsSwiper }" :modules="modules" class="mySwiper2">
                    <swiper-slide><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide>
                    <swiper-slide><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide>
                    <swiper-slide><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide>
                    <swiper-slide><img src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide>
                </swiper>
                <swiper @swiper="setThumbsSwiper" :slidesPerView="4" :watchSlidesProgress="true" class="mySwiper"
                    :modules="modules">
                    <swiper-slide><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide>
                    <swiper-slide><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide>
                    <swiper-slide><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide>
                    <swiper-slide><img src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide>
                    <swiper-slide><img src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide>
                </swiper>
            </div>

            <div class="recipe__ingredients ingredients">
                <CommonVCheckbox /> - <div class="ingredients__mesure">50г.</div>
            </div>


            <div class="recipe__gallery">

            </div>
        </div>

        <div class="recipe__text">
            <h4>Способ приготовления:</h4>
            <ol>
                <li>В очищенную мякоть авокадо добавляем соль, перец, сок лимона, сок лайма и разминаем. </li>
            </ol>
        </div>


    </div>
</template>

<style scoped>
.recipe {
    /* background-color: var(--white-soft); */
}

.tag {
    &:not(:last-child) {
        margin-right: .4rem;
    }
}

li {
    list-style: decimal;
}

#app {
    height: 100%;
}

html,
body {
    position: relative;
    height: 100%;
}

body {
    background: #eee;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #000;
    margin: 0;
    padding: 0;
}

.swiper {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

body {
    background: #000;
    color: #000;
}

.swiper {
    width: 100%;
    max-width: 30rem;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
}

.swiper-slide {
    background-size: cover;
    background-position: center;
}

.mySwiper2 {
    /* height: 80%; */
    width: 100%;
}

.mySwiper {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
}

.mySwiper .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
    opacity: 1;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>