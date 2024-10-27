import { MoneyInput } from '@/components/core/MoneyInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EAccountSourceType, IAccountSourceBody } from '@/core/account-source/models'
import { PlusCircle } from 'lucide-react'

interface ICreateAndUpdateAccountSourceFormProps {
  setFormData: React.Dispatch<React.SetStateAction<IAccountSourceBody>>
  formData: IAccountSourceBody
}

export default function CreateAndUpdateAccountSourceForm({
  setFormData,
  formData
}: ICreateAndUpdateAccountSourceFormProps) {
  return (
    <div className='grid gap-4 py-4'>
      <div className='grid grid-cols-4 items-center gap-4'>
        <Label htmlFor='sourceName' className='text-right'>
          Source Name
        </Label>
        <Input
          value={formData.name}
          required
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }}
          className='col-span-3'
          placeholder='Source Name *'
        />
      </div>
      <div className='grid grid-cols-4 items-center gap-4'>
        <Label htmlFor='type' className='text-right'>
          Type
        </Label>
        <Select
          required
          onValueChange={(value) => {
            setFormData((prev) => ({ ...prev, accountSourceType: value as EAccountSourceType }))
            if (value === EAccountSourceType.BANKING) setFormData((prev) => ({ ...prev, accounts: [''] }))
            else
              setFormData((prev) => {
                const { accounts, ...rest } = prev
                return rest
              })
          }}
          value={formData.accountSourceType}
        >
          <SelectTrigger className='col-span-3'>
            <SelectValue placeholder='Select a source type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='WALLET'>Wallet</SelectItem>
            <SelectItem value='BANKING'>Banking</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {formData.accountSourceType === EAccountSourceType.BANKING && (
        <>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='type' className='text-right'>
              Account Bank Type
            </Label>
            <Select
              required
              onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
              value={formData.type}
            >
              <SelectTrigger className='col-span-3'>
                <SelectValue placeholder='Select a account bank type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='MB_BANK'>MB Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='login_id' className='text-right'>
              Login ID
            </Label>
            <Input
              value={formData.login_id}
              required
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, login_id: e.target.value }))
              }}
              className='col-span-3'
              placeholder='Login Id *'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='password' className='text-right'>
              Password
            </Label>
            <Input
              value={formData.password}
              type='password'
              required
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }}
              className='col-span-3'
              placeholder='Password *'
            />
          </div>

          {formData.accounts && formData.accounts.length > 0
            ? formData.accounts.map((account, index) =>
                index > 0 ? (
                  <div key={index} className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='accounts' className='text-right'></Label>
                    <Input
                      value={account}
                      required
                      onChange={(e) => {
                        const newAccounts = [...(formData.accounts as string[])]
                        newAccounts[index] = e.target.value
                        setFormData((prev) => ({ ...prev, accounts: newAccounts }))
                      }}
                      className='col-span-3'
                      placeholder={`Account ${index + 1} *`}
                    />
                  </div>
                ) : (
                  <div key={index} className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='accounts' className='text-right'>
                      Account
                    </Label>
                    <Input
                      value={account}
                      required
                      onChange={(e) => {
                        const newAccounts = [...(formData.accounts as string[])]
                        newAccounts[index] = e.target.value
                        setFormData((prev) => ({ ...prev, accounts: newAccounts }))
                      }}
                      className='col-span-3'
                      placeholder={`Account ${index + 1} *`}
                    />
                  </div>
                )
              )
            : ''}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='initialAmount' className='text-right'></Label>
            <Button
              onClick={() => {
                setFormData((prev) => ({ ...prev, accounts: [...(formData.accounts as string[]), ''] }))
              }}
              variant='outline'
              size='sm'
            >
              <PlusCircle className='mr-2 h-4 w-4' /> Add Account
            </Button>
          </div>
        </>
      )}
      <div className='grid grid-cols-4 items-center gap-4'>
        <Label htmlFor='initialAmount' className='text-right'>
          Initial Amount
        </Label>
        <MoneyInput
          required
          className='col-span-3'
          defaultValue={formData.initAmount}
          placeholder='Init Amount'
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, initAmount: Number(e.target.value) }))
          }}
        />
      </div>
    </div>
  )
}
