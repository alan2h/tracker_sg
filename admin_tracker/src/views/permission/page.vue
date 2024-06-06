<script lang="ts" setup>
import SwitchRoles from "./components/SwitchRoles.vue"
</script>

<template>
  <div class="app-container">
    <SwitchRoles />
    <el-tag type="warning" size="large"
      >Solo el rol de administrador es visible en la página actual y no podrá ingresar a la página después de cambiar
      los roles</el-tag
    >
  </div>
</template>

<style lang="scss" scoped>
.el-tag {
  margin-top: 15px;
}
</style>
