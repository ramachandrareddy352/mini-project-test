import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Miniproject} from '../target/types/miniproject'

describe('miniproject', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Miniproject as Program<Miniproject>

  const miniprojectKeypair = Keypair.generate()

  it('Initialize Miniproject', async () => {
    await program.methods
      .initialize()
      .accounts({
        miniproject: miniprojectKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([miniprojectKeypair])
      .rpc()

    const currentCount = await program.account.miniproject.fetch(miniprojectKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Miniproject', async () => {
    await program.methods.increment().accounts({ miniproject: miniprojectKeypair.publicKey }).rpc()

    const currentCount = await program.account.miniproject.fetch(miniprojectKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Miniproject Again', async () => {
    await program.methods.increment().accounts({ miniproject: miniprojectKeypair.publicKey }).rpc()

    const currentCount = await program.account.miniproject.fetch(miniprojectKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Miniproject', async () => {
    await program.methods.decrement().accounts({ miniproject: miniprojectKeypair.publicKey }).rpc()

    const currentCount = await program.account.miniproject.fetch(miniprojectKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set miniproject value', async () => {
    await program.methods.set(42).accounts({ miniproject: miniprojectKeypair.publicKey }).rpc()

    const currentCount = await program.account.miniproject.fetch(miniprojectKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the miniproject account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        miniproject: miniprojectKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.miniproject.fetchNullable(miniprojectKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
