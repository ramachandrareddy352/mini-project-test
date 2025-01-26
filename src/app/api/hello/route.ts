import { clusterApiUrl, PublicKey,Connection, TransactionMessage, VersionedTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type GetData = {
  label: string;
  icon: string;
};
// Devnet 'fake' USDC, you can get these tokens from https://spl-token-faucet.com/
const USDC_ADDRESS = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");
const ENDPOINT = clusterApiUrl("devnet");
const NFT_NAME = "Golden Ticket";
const PRICE_USDC = 0.1;
type InputData = {
  account: string;
};
type Data = {
  label?: string;
  icon?: string;
  transaction?: string;
  message?: string;
};
export type PostError = {
  error: string;
};




export async function GET(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  const label = "Exiled Apes Academy";
  const icon = "https://exiledapes.academy/wp-content/uploads/2021/09/X_share.png";

  return NextResponse.json({label,icon},{status:200});
}
export async function POST(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  const accountField = request.body?.account;
  if (!accountField) throw new Error('missing account');

  const sender = new PublicKey(accountField);

  // // create spl transfer instruction
  // const splTransferIx = await createSplTransferIx(sender, connection);

  // // create the transaction
  // const transaction = new VersionedTransaction(
  //   new TransactionMessage({
  //       payerKey: sender,
  //       recentBlockhash: '11111111111111111111111111111111',
  //       // add the instruction to the transaction
  //       instructions: [splTransferIx]
  //   }).compileToV0Message()
  // )

  // Build Transction
  const ix = SystemProgram.transfer({
    fromPubkey:sender,
    toPubkey:new PublicKey("E6LRKxEMkp3HGcSZBFroobrt5xDgssXNFNfJUe7i5KoR"),
    lamports:1337000000 
  });


  const transaction = new Transaction();
  transaction.add(ix);


  const serializedTransaction = transaction.serialize();
  const base64Transaction = Buffer.from(serializedTransaction).toString('base64');
  const message = 'Thank you for your purchase of ExiledApe #518';

  return NextResponse.json({ transaction: base64Transaction, message },{status:200});
}
