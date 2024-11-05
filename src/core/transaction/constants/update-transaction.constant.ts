import { modifiedTrackerTypeForComboBox } from '@/app/dashboard/tracker-transaction/handlers'
import EditTrackerTypeDialog from '@/components/dashboard/EditTrackerType'
import { IAccountSource } from '@/core/account-source/models'
import { ETypeOfTrackerTransactionType } from '@/core/tracker-transaction-type/models/tracker-transaction-type.enum'
import { EFieldType, IBodyFormField } from '@/types/formZod.interface'
import React from 'react'
import { z } from 'zod'

interface IUpdateTransactionFormBody {
  accountSourceData: IAccountSource[]
  setFormUpdateTrackerTxDefaultValues: React.Dispatch<React.SetStateAction<any>>
}

export const defineUpdateTransactionFormBody = ({
  accountSourceData,
  setFormUpdateTrackerTxDefaultValues
}: IUpdateTransactionFormBody): any[] => {
  return [
    {
      name: 'amount',
      type: EFieldType.Input,
      label: 'Amount',
      placeHolder: 'Enter amount',
      props: {
        autoComplete: 'amount',
        type: 'number'
      }
    },
    {
      name: 'accountSourceId',
      type: EFieldType.Combobox,
      label: 'Account Source',
      placeHolder: 'Select account source',
      props: {
        dataArr: modifiedTrackerTypeForComboBox(accountSourceData)
      }
    },
    {
      name: 'direction',
      type: EFieldType.Select,
      label: 'Direction',
      placeHolder: 'Select direction',
      props: {
        onchange: (value: string) => {
          setFormUpdateTrackerTxDefaultValues((prev: any) => ({
            ...prev,
            trackerTypeId: ''
          }))
        }
      },
      dataSelector: [
        {
          value: 'INCOMING',
          label: 'INCOMING'
        },
        {
          value: 'EXPENSE',
          label: 'EXPENSE'
        }
      ]
    }
  ]
}

export const updateTransactionSchema = z
  .object({
    amount: z.string(),
    accountSourceId: z.string().uuid(),
    direction: z.enum(['INCOMING', 'EXPENSE'])
  })
  .strict()
