<script setup>
import AuthFormLogin from './AuthFormLogin.vue';
import AuthFormRegister from './AuthFormRegister.vue';

const canvas = ref(null)
const titles = ['DELICATA']
const tabs = {
    "Вход": AuthFormLogin,
    "Регистрация": AuthFormRegister
}
const currentTab = ref('Регистрация');

onMounted(() => {
    const canvasVal = canvas.value;
    const ctx = canvas.value.getContext('2d')
    canvasVal.width = innerWidth;
    canvasVal.height = innerHeight


    const htmlRoot = document.querySelector(':root');
    const rootStyles = getComputedStyle(htmlRoot);

    const colors = [rootStyles.getPropertyValue('--main-1'), rootStyles.getPropertyValue('--main-2'), rootStyles.getPropertyValue('--main-3')]

    class Particle {
        constructor(effect) {   // every particle will expect a reference pointing to the main effect object. We are not creating copies of the effect, 
            this.effect = effect   //just pointing to that same effect class from multiple places 
            this.radius = Math.random() * 20 + 10
            this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2) // расчеты, чтобы круги были видны полностью и не разрывались экраном по краям
            this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2)
            this.vx = Math.random() * 2 - 1 // velocity  
            this.vy = Math.random() * 2 - 1 // velocity  
            this.color = Math.floor(Math.random() * 3)
        }

        draw(context) { // defines what each particle looks like
            ctx.globalAlpha = 0.5;


            ctx.fillStyle = colors[this.color]
            context.beginPath()
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
            context.fill()
        }

        update() {
            this.x += this.vx
            if (this.x > this.effect.width - this.radius || this.x < this.radius) {
                this.vx *= -1
            }

            this.y += this.vy
            if (this.y > this.effect.height - this.radius || this.y < this.radius) {
                this.vy *= -1
            }
        }
    }

    class Effect {
        constructor(canvas) {
            this.canvas = canvas
            this.width = this.canvas.width
            this.height = this.canvas.height
            this.particles = []
            this.numberOfParticles = 30
            this.createParticles()
        }

        createParticles() { // methods initialises the effect
            for (let i = 0; i < this.numberOfParticles; i++) {
                this.particles.push(new Particle(this))
            }
        }

        handleParticles(context) {
            this.particles.forEach((particle) => {
                particle.draw(context)
                particle.update()
            })
        }
    }

    const effect = new Effect(canvasVal)

    function animate() {
        ctx.clearRect(0, 0, canvasVal.width, canvasVal.height)
        effect.handleParticles(ctx)
        requestAnimationFrame(animate)
    }
    animate()
})

function toggleTab(tab) {
    currentTab.value = tab
}

</script>

<template>
    <div class="auth">
        <canvas ref="canvas"></canvas>
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
                <div class="auth__menu">
                    <span v-for="(_, tab) in tabs" :key="tab" @click="toggleTab(tab)"
                        :class="[{ 'is-active': currentTab === tab }]">
                        {{ tab }}
                    </span>
                </div>
                <Transition mode="out-in">
                    <component :is="tabs[currentTab]" class="tab"></component>
                </Transition>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
canvas {
    position: absolute;
    top: 0;
    left: 0;
}

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