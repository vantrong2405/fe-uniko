import { IUseQueryHookOptions } from '@/types/query.interface'
import { useCreateExpenditureFund } from './useCreateExpenditureFund'
import { useGetAdvancedExpenditureFund } from './useQueryAdvancedExpenditureFund'
import { useUpdateExpenditureFund } from './useUpdateExpenditureFund'
import { useDeleteAnExpenditureFund } from './useDeleteAnExpenditureFund'
import { useGetStatisticExpenditureFund } from './useStatisticExpendittureFund'
import { useInviteParticipantToExpenditureFund } from './useInviteParticipant'
import { useJoinExpenditureFund } from './useJoinExpenditureFund'
import { useGetStatisticDetailOfFund } from './useGetStatisticDetailOfFund'

export const useExpenditureFund = (opts?: IUseQueryHookOptions) => {
  const { mutate: createExpenditureFund, status: statusCreate } = useCreateExpenditureFund(opts)
  const { mutate: inviteParticipantToExpenditureFund, status: statusInviteParticipant } =
    useInviteParticipantToExpenditureFund(opts)
  const { mutate: updateExpenditureFund, status: statusUpdate } = useUpdateExpenditureFund(opts)
  const { mutate: deleteAnExpenditureFund, status: statusDeleteAnExpenditureFund } = useDeleteAnExpenditureFund(opts)
  return {
    createExpenditureFund,
    statusCreate,
    updateExpenditureFund,
    statusUpdate,
    getAdvancedExpenditureFund: useGetAdvancedExpenditureFund,
    deleteAnExpenditureFund,
    statusDeleteAnExpenditureFund,
    getStatisticExpenditureFund: useGetStatisticExpenditureFund,
    inviteParticipantToExpenditureFund,
    statusInviteParticipant,
    joinExpenditureFund: useJoinExpenditureFund,
    getStatisticDetailOfFund: useGetStatisticDetailOfFund
  }
}
