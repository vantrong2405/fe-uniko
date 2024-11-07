import { formatAccountSourceData, initAccountSourceFormData } from '@/app/dashboard/account-source/constants'
import {
  EAccountSourceType,
  IAccountSource,
  IAccountSourceBody,
  IAccountSourceDataFormat,
  IAccountSourceResponse,
  IAdvancedAccountSourceResponse,
  IDialogAccountSource
} from '@/core/account-source/models'
import { formatArrayData, getTypes } from '@/libraries/utils'
import { IBaseResponsePagination, IDataTableConfig } from '@/types/common.i'
import toast from 'react-hot-toast'

export const handleShowDetailAccountSource = (
  setFormData: React.Dispatch<React.SetStateAction<IAccountSourceBody>>,
  setIsDialogOpen: React.Dispatch<React.SetStateAction<IDialogAccountSource>>,
  getAccountSourceById: any
) => {
  const data: IAccountSourceBody = getAccountSourceById

  setFormData({
    id: data.id,
    name: data.name,
    type: data.type,
    initAmount: data.initAmount,
    accountSourceType: (data as IAccountSourceBody & { checkType?: string }).checkType as EAccountSourceType
  })
  setIsDialogOpen((prev) => ({ ...prev, isDialogUpdateOpen: true }))
}

export const handleCreateAccountSource = ({
  payload,
  setIsDialogOpen,
  createAccountSource,
  setDataCreate,
  hookResetCacheStatistic,
  hookResetCacheGetAllAccount
}: {
  payload: any
  setIsDialogOpen: React.Dispatch<React.SetStateAction<IDialogAccountSource>>
  createAccountSource: any
  setDataCreate: any
  hookResetCacheStatistic: any
  hookResetCacheGetAllAccount: any
}) => {
  createAccountSource(payload, {
    onSuccess: (res: IAccountSourceResponse) => {
      if (res.statusCode === 200 || res.statusCode === 201) {
        setIsDialogOpen((prev) => ({ ...prev, isDialogCreateOpen: false }))
        setDataCreate(res.data)
        hookResetCacheStatistic()
        hookResetCacheGetAllAccount()
        toast.success('Create account source successfully!')
      }
    }
  })
}

export const handleUpdateAccountSource = ({
  payload,
  setIsDialogOpen,
  updateAccountSource,
  setDataUpdate,
  setIdRowClicked,
  hookResetCacheStatistic,
  hookResetCacheGetAllAccount
}: {
  payload: IAccountSourceBody
  setIsDialogOpen: React.Dispatch<React.SetStateAction<IDialogAccountSource>>
  updateAccountSource: any
  setDataUpdate: any
  setIdRowClicked: React.Dispatch<React.SetStateAction<string>>
  hookResetCacheStatistic: any
  hookResetCacheGetAllAccount: any
}) => {
  updateAccountSource(payload, {
    onSuccess(res: IAccountSourceResponse) {
      if (res.statusCode === 200 || res.statusCode === 201) {
        setDataUpdate(res.data)
        setIsDialogOpen((prev) => ({ ...prev, isDialogUpdateOpen: false }))
        setIdRowClicked('')
        hookResetCacheStatistic()
        hookResetCacheGetAllAccount()
        toast.success('Update account source successfully!')
      }
    }
  })
}

export const filterDataAccountSource = (data: IAccountSource[], filter: string[]): IAccountSourceDataFormat[] => {
  if (filter.length === 0)
    return formatArrayData<IAccountSource, IAccountSourceDataFormat>(data, formatAccountSourceData)
  const validValues = data.filter((item: IAccountSource) => filter.includes(item.type as string))
  return formatArrayData<IAccountSource, IAccountSourceDataFormat>(validValues, formatAccountSourceData)
}

export const updateCacheDataCreate = (
  oldData: IAdvancedAccountSourceResponse,
  newData: IAccountSource
): IAdvancedAccountSourceResponse => {
  const updatedData = [newData, ...oldData.data]

  if (updatedData.length > (oldData.pagination as IBaseResponsePagination).limit) updatedData.pop()
  return { ...oldData, data: updatedData }
}

export const updateCacheDataUpdate = (
  oldData: IAdvancedAccountSourceResponse,
  newData: IAccountSource
): IAdvancedAccountSourceResponse => {
  const updatedData = oldData.data.map((item) => {
    return item.id === newData.id ? { ...item, ...newData } : item
  })
  return { ...oldData, data: updatedData }
}

export const updateCacheDataForDeleteFeat = (
  oldData: IAdvancedAccountSourceResponse,
  newData: IAccountSource
): IAdvancedAccountSourceResponse => {
  const updatedData = oldData.data.filter((item) => item.id !== newData.id)
  return { ...oldData, data: updatedData }
}

export const updateCacheDetailData = (
  oldData: IAccountSourceResponse,
  newData: IAccountSource
): IAccountSourceResponse => {
  return { ...oldData, data: newData }
}

export const initDataTable = (
  setTableData: React.Dispatch<React.SetStateAction<IAccountSourceDataFormat[]>>,
  accountSourceData: IAccountSource[]
) => {
  const dataFormat: IAccountSourceDataFormat[] = formatArrayData<IAccountSource, IAccountSourceDataFormat>(
    accountSourceData,
    formatAccountSourceData
  )

  setTableData(dataFormat)
}
