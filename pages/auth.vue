<script setup lang="ts">
import AuthFormLogin from '~/components/auth/AuthFormLogin.vue';
import AuthFormRegister from '~/components/auth/AuthFormRegister.vue';

definePageMeta({
    layout: 'auth'
})

const titles = ['DELICATA']
const tabs = {
    "Вход": AuthFormLogin,
    "Регистрация": AuthFormRegister
}
const currentTab = ref<keyof typeof tabs>('Вход');

function toggleTab(tab: keyof typeof tabs) {
    currentTab.value = tab
}
</script>

<template>
    <div class="auth">
        <AuthBalls></AuthBalls>
        <div class="auth__container">
            <h1 class="auth__intro">
                <CommonVLogo is-animated></CommonVLogo>
                <p v-for="(title, index) in titles" :key="`title-${title}`">
                    <span v-for="(letter, i) in title" :key="`title${index}-letter-${i}`"
                        :style="`animation-delay: 0.${i + 2}s`">{{
                            letter }}</span>
                </p>
            </h1>

            <div class="auth__content">
                <AuthState v-slot="{ loggedIn, clear }">
                    <button v-if="loggedIn" @click="clear">Logout</button>
                    <NuxtLink v-else to="/auth">Login</NuxtLink>
                </AuthState>
                <div class="auth__menu">
                    <span v-for="(_, tab) in tabs" :key="tab" @click="toggleTab(tab)"
                        :class="[{ 'is-active': currentTab === tab }]">
                        {{ tab }}
                    </span>
                </div>

                <!-- Need to add to forms <Client Only> -->
                <Transition mode="out-in">
                    <component :is="tabs[currentTab]" class="tab"></component>
                </Transition>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.auth {
    width: 100%;
    height: 100vh;
    overflow: hidden;

    &__container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
    }

    &__intro {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 5rem;
        line-height: 1;
        color: var(--black);
        scale: 1.4;
        animation: removeScale 1s ease-in-out;
        animation-delay: 1.4s;
        animation-fill-mode: forwards;

        svg {
            width: 5rem;
            aspect-ratio: 1;
            flex-shrink: 0;
        }

        span {
            display: inline-block;
            text-transform: uppercase;
            font-weight: 700;
            scale: 1.5;
            opacity: 0;
            animation: transformLetter 1.5s ease;
            animation-fill-mode: forwards;
        }

        p:last-child {
            position: relative;
            opacity: 0.8;
            padding-left: 1rem;
            min-width: 10rem;
        }
    }

    &__menu {
        text-align: center;
        padding-bottom: var(--gap);
        font-size: var(--fs-base);


        span {
            display: inline-block;
            padding-left: var(--gap-sm);
            padding-right: var(--gap-sm);
            cursor: pointer;
            transition: color 0.4s;

            &.is-active {
                color: var(--main-1);
            }

            &:hover:not(.is-active) {
                color: var(--main-1);
            }

            &:last-child {
                position: relative;

                &:before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 1px;
                    height: 80%;
                    background-color: var(--black);
                    opacity: 0.4;
                    transform: translateY(-50%);
                }
            }
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 40rem;
        padding: 2rem 4rem;
        background-color: #ffffffc2;
        border-radius: var(--border-radius);
        opacity: 0;
        animation: showForm 1s ease-in-out;
        animation-delay: 1.6s;
        animation-fill-mode: forwards;
        // box-shadow: 0 0 3px 1px var(--main-3);
        margin-top: 2rem;
        transform: translateY(100%);
    }

}

@keyframes transformLetter {
    100% {
        opacity: 1;
        scale: 1;
    }
}

@keyframes removeScale {
    to {
        scale: 1;
    }
}

@keyframes showForm {
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>