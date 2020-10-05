<template>
<div class="copyright">
    <p>© {{ currentYear }}, nGblog Lagi.</p>
</div>
</template>

<script>
export default {
    data() {
        return {
            currentYear: null
        }
    },
    created() {
        this.CurrentYear()
    },
    methods: {
        CurrentYear() {
            var d = new Date();
            var n = d.getFullYear();
            this.currentYear = d.getFullYear()
        }
    }
}
</script>

<style>

</style>
