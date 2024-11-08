'use client'

import React, { useEffect, useRef } from 'react'
import { CalendarIcon, CreditCard, Pencil, BookUserIcon, FileTextIcon, WalletCardsIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IUpdateTransactionBody } from '@/core/transaction/models'
import { ETypeOfTrackerTransactionType } from '@/core/tracker-transaction-type/models/tracker-transaction-type.enum'
import { Button } from '@/components/ui/button'
import { formatDateTimeVN } from '@/libraries/utils'
import { IDetailUpdateTransactionDialogProps } from '@/core/tracker-transaction/models/tracker-transaction.interface'
import FormZod from '@/components/core/FormZod'
import {
  defineUpdateTransactionFormBody,
  updateTransactionSchema
} from '@/core/transaction/constants/update-transaction.constant'
import toast from 'react-hot-toast'
import { defineUpdateTrackerTransactionFormBody } from '@/core/tracker-transaction/constants/update-tracker-transaction.constant'

export default function DetailUpdateTransaction({
  updateTransactionProps,
  updateTrackerTransactionProps,
  commonProps,
  editTrackerTransactionTypeProps,
  classifyDialogProps
}: IDetailUpdateTransactionDialogProps) {
  const updateTransactionRef = useRef<HTMLFormElement>(null)
  const updateTrackerTransactionRef = useRef<HTMLFormElement>(null)

  const handleSubmit = () => {
    if (updateTransactionProps.isEditing) {
      if (classifyDialogProps?.formClassifyRef) classifyDialogProps.formClassifyRef.current?.requestSubmit()
      else updateTransactionRef.current?.requestSubmit()
    }
    if (updateTrackerTransactionProps?.isEditing) updateTrackerTransactionRef.current?.requestSubmit()
  }

  const TransactionDetails = () => (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <h3 className='text-2xl font-bold'>
            {updateTransactionProps.transaction.amount.toLocaleString()} {updateTransactionProps.transaction.currency}
          </h3>
          <Badge
            className='rounded-full px-4 py-1 text-base font-semibold'
            style={{
              backgroundColor:
                updateTransactionProps.transaction.direction === ETypeOfTrackerTransactionType.INCOMING
                  ? window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? '#b3e6cc'
                    : '#e6f7ee'
                  : window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? '#f4cccc'
                    : '#fde5e5',
              color:
                updateTransactionProps.transaction.direction === ETypeOfTrackerTransactionType.INCOMING
                  ? window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? '#276749'
                    : '#276749'
                  : window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? '#a94442'
                    : '#a94442'
            }}
          >
            {updateTransactionProps.transaction.direction === ETypeOfTrackerTransactionType.INCOMING
              ? 'Incoming'
              : 'Expense'}
          </Badge>
        </div>
        <p className='text-sm text-muted-foreground'>{'Chuyển khoản'}</p>
      </div>
      <div className='space-y-4'>
        <div className='flex items-center space-x-4'>
          <CalendarIcon className='text-muted-foreground' />
          <span>{formatDateTimeVN(updateTransactionProps.transaction.time, true)}</span>
        </div>
        {updateTransactionProps.transaction.transactionId && (
          <div className='flex items-center space-x-4'>
            <CreditCard className='text-muted-foreground' />
            <span>Mã giao dịch: {updateTransactionProps.transaction.transactionId}</span>
          </div>
        )}
        <div className='space-y-2'>
          <div className='font-semibold'>Ví gửi</div>

          {updateTransactionProps.transaction.ofAccount ? (
            <div className='flex items-start gap-3'>
              <Avatar>
                <AvatarFallback className='bg-muted'>
                  <WalletCardsIcon />
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span className='font-medium'>{updateTransactionProps.transaction.accountSource?.name}</span>
                {updateTransactionProps.transaction.accountSource.accountBank && (
                  <span className='text-sm text-muted-foreground'>
                    {updateTransactionProps.transaction.ofAccount.accountNo +
                      ' • ' +
                      (updateTransactionProps.transaction.accountSource.accountBank.type === 'MB_BANK'
                        ? 'MB Bank'
                        : 'N/A')}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className='flex items-center space-x-4'>
              <Avatar>
                <AvatarFallback>
                  <WalletCardsIcon />
                </AvatarFallback>
              </Avatar>
              <span className='font-medium'>{updateTransactionProps.transaction.accountSource?.name}</span>
            </div>
          )}
        </div>

        {updateTransactionProps.transaction.toAccountNo && (
          <div className='space-y-2'>
            <div className='font-semibold'>Tài khoản nhận</div>
            <div className='flex items-start gap-3'>
              <Avatar>
                <AvatarFallback className='bg-muted'>
                  <BookUserIcon />
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span className='font-medium'>{updateTransactionProps.transaction.toAccountName}</span>
                <span className='text-sm text-muted-foreground'>
                  {updateTransactionProps.transaction.toAccountNo} • {updateTransactionProps.transaction.toBankName}
                </span>
              </div>
            </div>
          </div>
        )}
        {updateTrackerTransactionProps && (
          <>
            <div className='flex items-center space-x-4'>
              <FileTextIcon className='text-muted-foreground' />
              <span>Mô tả: {updateTrackerTransactionProps.trackerTransaction.reasonName}</span>
            </div>
            <div className='space-y-2'>
              <div className='font-semibold'>Ghi chú</div>
              <p>
                {updateTrackerTransactionProps.trackerTransaction.description &&
                updateTrackerTransactionProps.trackerTransaction.description !== ''
                  ? updateTrackerTransactionProps.trackerTransaction.description
                  : 'Không có ghi chú'}
              </p>
            </div>
          </>
        )}
      </div>
      <div className='flex justify-end'>
        <Button
          onClick={() => {
            if (
              updateTransactionProps.transaction.ofAccount &&
              !updateTrackerTransactionProps &&
              !classifyDialogProps
            ) {
              // là giao dịch ngân hàng đã phân loại
              toast.error('Không thể chỉnh sửa giao dịch lấy từ tài khoản ngân hàng!')
            } else updateTransactionProps.setIsEditing(true)
          }}
        >
          <Pencil className='mr-2 h-4 w-4' />
          {!updateTransactionProps.transaction.TrackerTransaction ? 'Phân loại' : 'Cập nhật'}
        </Button>
      </div>
    </div>
  )

  const UpdateForm = () => (
    <div className='space-y-7'>
      {!updateTransactionProps.transaction.TrackerTransaction && classifyDialogProps ? (
        <classifyDialogProps.ClassifyForm />
      ) : (
        <>
          <FormZod
            submitRef={updateTransactionRef}
            formFieldBody={defineUpdateTransactionFormBody({ accountSourceData: commonProps.accountSourceData })}
            formSchema={updateTransactionSchema}
            onSubmit={(data) => {
              const payload: IUpdateTransactionBody = {
                accountSourceId: data.accountSourceId,
                direction: data.direction as ETypeOfTrackerTransactionType,
                amount: Number(data.amount),
                id: updateTransactionProps.transaction.id
              }
              updateTransactionProps.handleUpdateTransaction(payload, updateTransactionProps.setIsEditing)
            }}
            defaultValues={{
              amount: String(updateTransactionProps.transaction.amount),
              accountSourceId: updateTransactionProps.transaction.accountSource.id,
              direction: updateTransactionProps.transaction.direction as ETypeOfTrackerTransactionType
            }}
          />
          {updateTrackerTransactionProps && (
            <FormZod
              submitRef={updateTransactionRef}
              formFieldBody={defineUpdateTrackerTransactionFormBody({
                accountSourceData: commonProps.accountSourceData,
                trackerTransaction: updateTrackerTransactionProps.trackerTransaction
              })}
              formSchema={updateTransactionSchema}
              onSubmit={(data) => {
                const payload: IUpdateTransactionBody = {
                  accountSourceId: data.accountSourceId,
                  direction: data.direction as ETypeOfTrackerTransactionType,
                  amount: Number(data.amount),
                  id: updateTransactionProps.transaction.id
                }
                updateTransactionProps.handleUpdateTransaction(payload, updateTransactionProps.setIsEditing)
              }}
              defaultValues={{
                amount: String(updateTransactionProps.transaction.amount),
                accountSourceId: updateTransactionProps.transaction.accountSource.id,
                direction: updateTransactionProps.transaction.direction as ETypeOfTrackerTransactionType
              }}
            />
          )}
        </>
      )}
      <div className='flex justify-between'>
        <Button type='button' variant='outline' onClick={() => updateTransactionProps.setIsEditing(false)}>
          Hủy
        </Button>
        <Button
          type='button'
          onClick={handleSubmit}
          isLoading={
            updateTrackerTransactionProps
              ? updateTrackerTransactionProps.statusUpdateTrackerTransaction === 'pending' &&
                updateTransactionProps.statusUpdateTransaction === 'pending'
              : updateTransactionProps.statusUpdateTransaction === 'pending'
          }
        >
          Lưu thay đổi
        </Button>
      </div>
    </div>
  )

  // return <div>{isEditing ? <UpdateForm /> : <TransactionDetails />}</div>
  return <div>{updateTransactionProps.isEditing ? <UpdateForm /> : <TransactionDetails />}</div>
}