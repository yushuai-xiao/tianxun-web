import { ref } from 'vue'

import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void
export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})

  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      // console.log(pageModalRef.value)
      pageModalRef.value.dialogVisible = true
    }
    newCb && newCb()
  }

  const handleEditData = (item: any) => {
    console.log(item)
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editCb && editCb(item)
  }

  return [pageModalRef, defaultInfo, handleEditData, handleNewData]
}
