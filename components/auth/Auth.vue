<script setup>
const canvas = ref(null)
const titles = ['DELICATA']

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


</script>

<template>
    <div class="auth">
        <canvas ref="canvas"></canvas>
        <div class="container">
            <h1 class="auth__heading">
                <CommonVLogo is-animated></CommonVLogo>


                <p v-for="(title, index) in titles" :key="`title-${title}`">
                    <span v-for="(letter, i) in title" :key="`title${index}-letter-${i}`"
                        :style="`animation-delay: 0.${i + 2}s`">{{
                            letter }}</span>
                </p>
            </h1>
        </div>
        <div class="auth__content">


            <div class="auth__form auth-form">
                <div class="auth-form__container">
                    <CommonVInput type="text" :has-border="true" label="Имя">Введите имя
                    </CommonVInput>
                    <CommonVInput type="text" :has-border="true" label="Почта"></CommonVInput>
                </div>
                <div class="auth__buttons">
                    <CommonVButton to="/" class="auth__btn">Войти</CommonVButton>
                    <CommonVButton class=" auth__btn">Регистрация</CommonVButton>
                </div>
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

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    transform: scale(2);
    animation: removeScale 1.4s ease-in-out;
    animation-delay: 2s;
    animation-fill-mode: forwards;
}

.auth {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

    &__content {
        position: relative;
        z-index: 2;
    }

    &__heading {
        display: flex;
        align-items: center;
        font-size: 5rem;
        line-height: 1;
        color: var(--black);

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
            opacity: 0.8;
            padding-left: 1rem;
            min-width: 10rem;
        }
    }

    &__buttons {
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }

    &__btn {
        &:last-child {
            margin-left: 2rem;
        }
    }

    &-form {
        position: relative;
        width: 40rem;
        padding: calc(var(--gap) * 2);
        background-color: var(--white);
        border-radius: var(--border-radius);
        opacity: 0;
        animation: showForm 1s ease-in;
        animation-delay: 3s;
        animation-fill-mode: forwards;
    }
}

.VInput {
    margin-bottom: var(--gap);
}

@keyframes transformLetter {
    100% {
        opacity: 1;
        scale: 1;
    }
}

@keyframes removeScale {
    to {
        transform: scale(1.2);
        top: 20%;
    }
}

@keyframes showForm {
    100% {
        opacity: 1;
    }
}
</style>