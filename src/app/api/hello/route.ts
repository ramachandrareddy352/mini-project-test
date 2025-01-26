import { clusterApiUrl, PublicKey,Connection, TransactionMessage, VersionedTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

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
  request: NextRequest,
  response: NextResponse<Data>
) {
  const label = "Exiled Apes Academy";
  const icon = "https://exiledapes.academy/wp-content/uploads/2021/09/X_share.png";

  return NextResponse.json({label,icon},{status:200});
}


export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const accountField = body?.account;

    if (!accountField) {
      throw new Error("Missing account field in the request body.");
    }

    // Create PublicKey for sender
    const sender = new PublicKey(accountField);

    // Create a connection to the Solana network
    const connection = new Connection(ENDPOINT);

    // Create a transfer instruction
    const ix = SystemProgram.transfer({
      fromPubkey: sender,
      toPubkey: new PublicKey("E6LRKxEMkp3HGcSZBFroobrt5xDgssXNFNfJUe7i5KoR"),
      lamports: 1337000000, // 1.337 SOL (adjust as needed)
    });

    // Create a transaction and add the instruction
    const transaction = new Transaction();
    transaction.add(ix);

    // Fetch the latest blockhash
    const { blockhash } = await connection.getLatestBlockhash("confirmed");
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = sender;

    // Serialize and encode the transaction
    const serializedTransaction = transaction.serialize();
    const base64Transaction = Buffer.from(serializedTransaction).toString("base64");

    const message = "Thank you for your purchase of ExiledApe #518";

    // Return the transaction and message as JSON
    return NextResponse.json(
      { transaction: base64Transaction, message },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

