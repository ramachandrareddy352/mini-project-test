import { clusterApiUrl, PublicKey,Connection, TransactionMessage, VersionedTransaction, SystemProgram, Transaction, Keypair, TransactionInstruction } from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { sha256 } from "js-sha256";
import bs58 from 'bs58'
import { send } from "process";
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

const PROGRAM_ID = new PublicKey("AAwQy1UeenPqH6poqtiR6sKePDgeF2YcnHmy2jSNYRL6");
const DISCRIMINATOR = sha256.digest('global:increment').slice(0,8);
const data = Buffer.from([...DISCRIMINATOR])
const privateKeyString: string = process.env.PRIVATE_KEY!;
const privateKey = JSON.parse(privateKeyString);
const merchant = Keypair.fromSecretKey(new Uint8Array(privateKey));

export async function GET(
  request: NextRequest,
  response: NextResponse<Data>
) {
  const label = "Solana Pay";
  const icon = "https://prasadpadala.in/insta/insta2square.JPG";

  return NextResponse.json({label,icon},{status:200});
}


export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const accountField = body?.account;
    console.log(accountField);

    if (!accountField) {
      throw new Error("Missing account field in the request body.");
    }

    // Create PublicKey for sender
    const sender = new PublicKey(accountField);

    

    // Generate a unique reference key for the transaction
    // const reference = new Keypair().publicKey;

    // Create a transfer instruction
    const ix = SystemProgram.transfer({
      fromPubkey: sender,
      toPubkey: new PublicKey("7UhsoPTm5oYq3eubg4RpYgr2xAVY7L9RxLbSNhufg9yh"),
      lamports: 100000000, // .1 SOL (adjust as needed)
    });

    // Create a transaction and add the instruction
    let transaction = new Transaction();
    transaction.add(ix);

    const connection = new Connection(ENDPOINT);
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash; 
    transaction.feePayer = sender;

    // transaction = Transaction.from(transaction.serialize());
    // transaction.sign(merchant);
    // const sig = transaction.signature ? bs58.encode(transaction.signature) : '';
    // console.log("sig:",sig);
    // Serialize and encode the transaction
    const serializedTransaction = transaction.serialize({
      verifySignatures:false,
      requireAllSignatures:false
    });
    const base64Transaction = serializedTransaction.toString("base64");

    const message = "Thank you for your purchase of ExiledApe #518";

    return NextResponse.json(
      { transaction: base64Transaction, message },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     // Parse the request body
//     const body = await request.json();
//     const accountField = body?.account;

//     if (!accountField) {
//       throw new Error("Missing account field in the request body.");
//     }

//     // Create PublicKey for sender
//     const sender = new PublicKey(accountField);
//     // console.log(sender);
//     // Load merchant private key
    

//     // Create the increment instruction
//     const incrementIx = new TransactionInstruction({
//       programId: PROGRAM_ID, // Your program's ID
//       keys: [
//         { pubkey: new PublicKey("HHZyF9QPGtaBAniTTnjWJN8vsyXhe4qvSrFYKiwsK5PA"), isSigner: false, isWritable: true },
//         { pubkey: sender, isSigner: true, isWritable: true }, 
//       ],
//       data: data, 
//     });

//     // Create the transaction
//     let transaction = new Transaction().add(incrementIx);

//     const connection = new Connection(ENDPOINT);
//     const { blockhash } = await connection.getLatestBlockhash();
//     transaction.recentBlockhash = blockhash;
//     transaction.feePayer = sender;

//     // transaction.partialSign(merchant)

//     // transaction = Transaction.from(transaction.serialize({
//     //   verifySignatures:false,
//     //   requireAllSignatures:false
//     // }))

//     const serializedTransaction = transaction.serialize({
//       verifySignatures:false,
//       requireAllSignatures:false
//     });
//     const base64Transaction = serializedTransaction.toString("base64");
//     console.log(base64Transaction);
//     // Send the transaction
  

//     return NextResponse.json(
//       { transaction: base64Transaction,message: "Transaction sent successfully"},
//       { status: 200 }
//     );
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
