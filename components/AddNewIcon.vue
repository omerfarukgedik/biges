<template>
    <div class="add-new-icon d-flex align-items-center justify-content-center" @click="$store.state.addContactModal = true">
        +
    </div>
</template>

<style scoped>
    .add-new-icon {
        position: fixed;
        bottom: 30px;
        right: 30px;
        border-radius: 50%;
        background: #c7ffd8;
        border: 1px dashed #000;
        font-size: 2rem;
        padding: .1rem .7rem;
        user-select: none;
        cursor: pointer;
    }

</style>