// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import MiniprojectIDL from '../target/idl/miniproject.json'
import type { Miniproject } from '../target/types/miniproject'

// Re-export the generated IDL and type
export { Miniproject, MiniprojectIDL }

// The programId is imported from the program IDL.
export const MINIPROJECT_PROGRAM_ID = new PublicKey(MiniprojectIDL.address)

// This is a helper function to get the Miniproject Anchor program.
export function getMiniprojectProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...MiniprojectIDL, address: address ? address.toBase58() : MiniprojectIDL.address } as Miniproject, provider)
}

// This is a helper function to get the program ID for the Miniproject program depending on the cluster.
export function getMiniprojectProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Miniproject program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return MINIPROJECT_PROGRAM_ID
  }
}
