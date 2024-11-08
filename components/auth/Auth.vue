<script setup>
const canvas = ref(null)

onMounted(() => {
    const canvasVal = canvas.value;
    const ctx = canvas.value.getContext('2d')

    canvasVal.width = innerWidth;
    canvasVal.height = innerHeight


    const htmlRoot = document.querySelector(':root');
    const rootStyles = getComputedStyle(htmlRoot);

    // const colors = ['#FFD037', '#255735', '#E83C3C']
    const colors = [rootStyles.getPropertyValue('--main-1'), rootStyles.getPropertyValue('--main-2'), rootStyles.getPropertyValue('--main-3')]

    class Particle {
        constructor(effect) {   // every particle will expect a reference pointing to the main effect object. We are not creating copies of the effect, 

            this.effect = effect   //just pointing to that sane effect class from multiple places 
            this.radius = Math.random() * 20 + 80
            this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2) // расчеты, чтобы круги были видны полностью и не разрывались экраном по краям
            this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2)
            this.vx = Math.random() * 4 - 2 // velocity  
            this.vy = Math.random() * 4 - 2 // velocity  
            this.color = Math.floor(Math.random() * 3)
        }

        draw(context) { // defines what each particle looks like
            ctx.globalAlpha = 0.2;


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
            this.numberOfParticles = 4
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
    <div>
        <canvas ref="canvas"></canvas>
        <div class="container">
            <h1 class="auth__heading">
                <span>COOK</span>
                <span>BOOK</span>
            </h1>

            <div class="auth__buttons">
                <CommonVButton class="auth__btn">Войти</CommonVButton>
                <CommonVButton class=" auth__btn">Регистрация</CommonVButton>
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
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
}

.auth {
    &__heading {
        font-size: 18rem;
        line-height: 1;
        color: var(--white-soft);

        span {
            display: block;
            font-weight: 700;

            &:last-child {
                margin-top: -7rem;
                opacity: 0.5;
                padding-left: 2rem;
            }
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
}
</style>