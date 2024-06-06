<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { createTableDataApi, deleteTableDataApi, updateTableDataApi } from "@/api/table"
import { type CreateOrUpdateTableRequestData } from "@/api/table/types/table"
import { getUserDataApi } from "@/api/users"
import { UserRequestData } from "@/api/users/types/user"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { cloneDeep } from "lodash-es"

defineOptions({
  // 命名当前组件
  name: "ElementPlus"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 增
const DEFAULT_FORM_DATA: CreateOrUpdateTableRequestData = {
  id: undefined,
  username: "",
  password: ""
}
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = ref<CreateOrUpdateTableRequestData>(cloneDeep(DEFAULT_FORM_DATA))
const formRules: FormRules<CreateOrUpdateTableRequestData> = {
  username: [{ required: true, trigger: "blur", message: "Por favor, introduzca un nombre de usuario" }],
  password: [{ required: true, trigger: "blur", message: "Por favor, introduzca su contraseña" }]
}
const handleCreateOrUpdate = () => {
  formRef.value?.validate((valid: boolean, fields) => {
    if (!valid) return console.error("Se produce un error en la verificación del formulario", fields)
    loading.value = true
    const api = formData.value.id === undefined ? createTableDataApi : updateTableDataApi
    api(formData.value)
      .then(() => {
        ElMessage.success("Éxito de la operación")
        dialogVisible.value = false
        getTableData()
      })
      .finally(() => {
        loading.value = false
      })
  })
}
const resetForm = () => {
  formRef.value?.clearValidate()
  formData.value = cloneDeep(DEFAULT_FORM_DATA)
}
//#endregion

//#region 删
const handleDelete = (row: UserRequestData) => {
  ElMessageBox.confirm(`Eliminación de usuarios：${row.username}, confirmar la eliminación?`, "pronto", {
    confirmButtonText: "Estás seguro",
    cancelButtonText: "Cancelar",
    type: "warning"
  }).then(() => {
    deleteTableDataApi(row.id).then(() => {
      ElMessage.success("La eliminación se ha realizado correctamente")
      getTableData()
    })
  })
}
//#endregion

//#region 改
const handleUpdate = (row: UserRequestData) => {
  dialogVisible.value = true
  formData.value = cloneDeep(row)
}
//#endregion

//#region 查
const tableData = ref<UserRequestData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  username: "",
  phone: ""
})
const getTableData = () => {
  loading.value = true
  getUserDataApi()
    .then(({ data }) => {
      console.log(data)
      paginationData.total = 0
      tableData.value = data
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
const handleSearch = () => {
  paginationData.currentPage === 1 ? getTableData() : (paginationData.currentPage = 1)
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="Nombre de usuario">
          <el-input v-model="searchData.username" placeholder="Por favor, introduzca" />
        </el-form-item>
        <el-form-item prop="phone" label="Telefono">
          <el-input v-model="searchData.phone" placeholder="Por favor, introduzca" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">Buscar</el-button>
          <el-button :icon="Refresh" @click="resetSearch">Recargar</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true"
            >Agregar un nuevo usuario</el-button
          >
          <el-button type="danger" :icon="Delete">Eliminar de forma masiva</el-button>
        </div>
        <div>
          <el-tooltip content="Descargar">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="Actualizar la página actual">
            <el-button type="primary" :icon="RefreshRight" circle @click="getTableData" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="email" label="Usuario" align="center" />
          <el-table-column prop="roles" label="rol" align="center">
            <template>
              <!-- #default="scope" -->
              <el-tag type="primary" effect="plain">admin</el-tag>
              <!--<el-tag v-else type="warning" effect="plain">{{ scope.row.roles }}</el-tag>-->
            </template>
          </el-table-column>
          <el-table-column prop="email" label="Email" align="center" />
          <el-table-column prop="status" label="Estado" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status" type="success" effect="plain">Habilitado</el-tag>
              <el-tag v-else type="danger" effect="plain">Deshabilitado</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="Crear" align="center" />
          <el-table-column fixed="right" label="Operacion" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">Editar</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">Borrar</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- Agregar/Modificar -->
    <el-dialog
      v-model="dialogVisible"
      :title="formData.id === undefined ? 'Agregar un nuevo usuario' : 'Modificar el usuario'"
      @closed="resetForm"
      width="30%"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="username" label="Usuario">
          <el-input v-model="formData.username" placeholder="Por favor, introduzca Usuario" />
        </el-form-item>
        <el-form-item prop="password" label="Contraseña" v-if="formData.id === undefined">
          <el-input v-model="formData.password" placeholder="Por favor, introduzca password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="handleCreateOrUpdate" :loading="loading">Confirmar</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
