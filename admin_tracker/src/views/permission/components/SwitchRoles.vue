<script lang="ts" setup>
import { ref, watch } from "vue"
import { useUserStore } from "@/store/modules/user"

const userStore = useUserStore()
const switchRoles = ref(userStore.roles[0])
watch(switchRoles, (value) => {
  userStore.changeRoles(value)
})
</script>

<template>
  <div>
    <div>Tu rol：{{ userStore.roles }}</div>
    <div class="switch-roles">
      <span>Cambiar de usuario (simular volver a iniciar sesión)：</span>
      <el-radio-group v-model="switchRoles">
        <el-radio-button label="editor" value="editor" />
        <el-radio-button label="admin" value="admin" />
      </el-radio-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.switch-roles {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
</style>
