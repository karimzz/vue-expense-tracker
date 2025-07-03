
<template>
        <div class="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p id="money-plus" class="money plus">+EGP {{ income }}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p id="money-minus" class="money minus">EGP {{ expense }}</p>
            </div>
        </div>
</template>


<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    income :{
        type : Number ,
        required : true
    },
    expense : {
        type : Number , 
        required : true
    }
})

</script>