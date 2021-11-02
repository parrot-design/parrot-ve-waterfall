<!-- —————————————↓HTML————————分界线———————————————————————— -->
<template>
    <a class='link' :href="to" target="_blank" >
        <slot />
    </a>
</template>

<!-- —————————————↓JS————————分界线———————————————————————— -->
<script>
export default {
    name:'Link',
    props:['to']
}
</script>

<!-- —————————————↓Css————————分界线———————————————————————— -->