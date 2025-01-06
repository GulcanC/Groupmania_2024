<template>
    <div>
<router-view/>
<VerifyUserComp/>

    </div>
</template>

<script>
import VerifyUserComp from '@/components/VerifyUserComp.vue';

export default {
    name: "App",
    components: {
      VerifyUserComp
    }
}




</script>


