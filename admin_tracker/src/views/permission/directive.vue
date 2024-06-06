<script lang="ts" setup>
import { checkPermission } from "@/utils/permission"
import SwitchRoles from "./components/SwitchRoles.vue"
</script>

<template>
  <div class="app-container">
    <SwitchRoles />
    <!-- v-permission 示例 -->
    <div class="margin-top-30">
      <div>
        <el-tag v-permission="['admin']" type="success" size="large" effect="plain">
          Aquí se utiliza v-permission="['admin']", por lo que solo el administrador puede ver esta oración
        </el-tag>
      </div>
      <div>
        <el-tag v-permission="['editor']" type="success" size="large" effect="plain">
          Aquí se utiliza v-permission="['editor']", por lo que solo el editor puede ver esta oración
        </el-tag>
      </div>
      <div class="margin-top-15">
        <el-tag v-permission="['admin', 'editor']" type="success" size="large" effect="plain">
          Aquí se utiliza v-permission="['admin', 'editor']", por lo que tanto el administrador como el editor pueden
          ver esta oración
        </el-tag>
      </div>
    </div>
    <!-- checkPermission 示例 -->
    <div class="margin-top-30">
      <el-tag type="warning" size="large">
        Por ejemplo, el-tab-pane o el-table-column de Element Plus y otras escenas que representan Dom dinámicamente no
        son adecuadas para su uso. v-permission, en este caso puedes lograrlo a través de v-if y checkPermission:
      </el-tag>
      <el-tabs type="border-card" class="margin-top-15">
        <el-tab-pane v-if="checkPermission(['admin'])" label="admin">
          Usado aquí <el-tag>v-if="checkPermission(['admin'])"</el-tag> Entonces solo el administrador puede ver.
        </el-tab-pane>
        <el-tab-pane v-if="checkPermission(['editor'])" label="editor">
          Usado aquí <el-tag>v-if="checkPermission(['editor'])"</el-tag> Entonces solo el editor puede ver esta oración.
        </el-tab-pane>
        <el-tab-pane v-if="checkPermission(['admin', 'editor'])" label="admin y editor">
          Usado aquí <el-tag>v-if="checkPermission(['admin', 'editor'])"</el-tag> Para que tanto el administrador como
          el editor.
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.margin-top-15 {
  margin-top: 15px;
}

.margin-top-30 {
  margin-top: 30px;
}
</style>
