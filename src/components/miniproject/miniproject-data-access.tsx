'use client'

import { getMiniprojectProgram, getMiniprojectProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useMiniprojectProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getMiniprojectProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getMiniprojectProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['miniproject', 'all', { cluster }],
    queryFn: () => program.account.miniproject.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['miniproject', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ miniproject: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useMiniprojectProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useMiniprojectProgram()

  const accountQuery = useQuery({
    queryKey: ['miniproject', 'fetch', { cluster, account }],
    queryFn: () => program.account.miniproject.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['miniproject', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ miniproject: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['miniproject', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ miniproject: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['miniproject', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ miniproject: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['miniproject', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ miniproject: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
