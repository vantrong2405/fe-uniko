import { z } from 'zod'
import { EFieldType, IBodyFormField } from '@/types/formZod.interface'
import { translate } from '@/libraries/utils'

export const updatePassWordSchemaWithCurrentPassword = z
  .object({
    currentPassword: z.string().min(3, { message: 'Current password must be at least 3 characters long.' }),
    newPassword: z.string().min(3, { message: 'New password must be at least 3 characters long.' })
  })
  .strict()

export const updatePassWordSchemaWithoutCurrentPassword = z
  .object({
    newPassword: z.string().min(3, { message: 'New password must be at least 3 characters long.' })
  })
  .strict()

export const updatePasswordFormBodyWithCurrentPassword: IBodyFormField[] = [
  {
    name: 'currentPassword',
    type: EFieldType.Input,
    label: 'form.credential.currentPassword.label',
    placeHolder: 'form.credential.currentPassword.placeholder',
    props: {
      type: 'password',
      autoComplete: 'password'
    }
  },
  {
    name: 'newPassword',
    type: EFieldType.Input,
    label: 'form.credential.newPassword.label',
    placeHolder: 'form.credential.newPassword.placeholder',
    props: {
      type: 'password',
      autoComplete: 'password'
    }
  }
]

export const updatePasswordFormBodyWithoutCurrentPassword: IBodyFormField[] = [
  {
    name: 'newPassword',
    type: EFieldType.Input,
    label: 'form.credential.newPassword.label',
    placeHolder: 'form.credential.newPassword.placeholder',
    props: {
      type: 'password',
      autoComplete: 'password'
    }
  }
]