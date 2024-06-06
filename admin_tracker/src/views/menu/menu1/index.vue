<template>
  <div class="app-container">
    <h4>
      三 La función de almacenamiento en caché de rutas en el nivel 3 y superiores está desactivada de forma
      predeterminada. Si es necesario, vaya a este archivo de configuración para activarla:：
      <el-link
        type="primary"
        href="https://github.com/un-pany/v3-admin-vite/blob/main/src/config/route.ts"
        target="_blank"
      >
        src/config/route.ts
      </el-link>
    </h4>
    <el-card header="二级路由 - menu1">
      <router-view />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.el-link {
  font-size: 18px;
}
</style>
