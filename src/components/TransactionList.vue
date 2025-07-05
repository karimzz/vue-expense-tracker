
<template>
    <h3>History</h3>
        <ul id="list" class="list">

            <p v-if="transactions.length <=  0">No Transactions</p>
            <li :class="transaction.amount >= 0 ? 'plus' :'minus'" v-for="transaction in transactions" :key="transaction.id">
                    {{ transaction.text }} <span>EGP {{ transaction.amount }}</span>
                    <button class="delete-btn" @click="deleteTransaction(transaction.id)">x</button>
            </li>

        </ul>
</template>


<script setup>

import { defineProps } from 'vue';

const props = defineProps({
    transactions :{
        type : Array , 
        required : true
    }
})

const emits = defineEmits(['deleteTransaction'])

// For Delete Transaction 
const deleteTransaction = (id)=>{
    emits('deleteTransaction' ,id)
}





</script>

