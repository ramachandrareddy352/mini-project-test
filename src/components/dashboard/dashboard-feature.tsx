'use client';

import { useEffect, useRef, useState } from 'react';
import { createQR, encodeURL, findReference, FindReferenceError } from '@solana/pay';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { ConfirmedSignatureInfo, Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { simulateCheckout } from './simulateCheckout';
import { validateTransfer } from './validateTransfer';

const MERCHANT_WALLET = new PublicKey("7UhsoPTm5oYq3eubg4RpYgr2xAVY7L9RxLbSNhufg9yh");


export default function DashboardFeature() {

  const { connection } = useConnection();
  const qrRef = useRef<HTMLDivElement>(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [showQR, setShowQR] = useState(false);


  const startPaymentTransfer = async () => {
    setShowQR(true);
    console.log('\n2. 🛍 Simulate a customer checkout \n');
    const { label, message, memo, amount, reference } = await simulateCheckout();
    const splToken = new PublicKey('Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr');

    // console.log('3. 💰 Create a payment request link for native sol \n');
    // const url = encodeURL({ recipient: recipient, amount, reference, label, message, memo });
    console.log('3. 💰 Create a payment request link for spl-token sol \n');
    const url = encodeURL({
      recipient:MERCHANT_WALLET,
      amount,
      splToken,
      reference,
      label,
      message,
      memo,
  });
  // this is for creating tranction and working through api's
    const SOLANA_PAY_URL = "solana:https://mini-project-e3-s2.vercel.app//api/hello"
    const qr = createQR(SOLANA_PAY_URL, 360, 'white', 'black');
    if (qrRef.current) {
      qrRef.current.innerHTML = ''
      qr.append(qrRef.current)
    }
    console.log(qr);
    console.log(qrRef);
    setPaymentStatus("Pending....")

    // console.log('\n5. Find the transaction');

    const signatureInfo = await new Promise<ConfirmedSignatureInfo>((resolve, reject) => {
      const interval = setInterval(async () => {
        console.count('Checking for transaction...');
        try {
          const result = await findReference(connection, reference, { finality: 'confirmed' });
          console.log(result);
          console.log('\n 🖌  Signature found: ', result.signature);
          clearInterval(interval);
          resolve(result);
        } catch (error: any) {
          if (!(error instanceof FindReferenceError)) {
            // console.error(error);
            clearInterval(interval);
            reject(error);
          }
        }
      }, 2000);
      //  Add a timeout of 5 minutes
      const timeout = setTimeout(() => {
        clearInterval(interval);
        console.log('❌ Payment timeout reached.');
        setPaymentStatus("Timeout Reached");
        reject(new Error('Payment timeout reached'));
      }, 2 * 60 * 1000); // 5 minutes in milliseconds
    });
    const { signature } = signatureInfo;
    setPaymentStatus("Confirmed");

    console.log('\n6. 🔗 Validate transaction \n');

    try {
      await validateTransfer(connection, signature, { recipient: MERCHANT_WALLET, amount,splToken });
      // Update payment status
      setPaymentStatus('validated');
      console.log('✅ Payment validated');
      console.log('📦 Ship order to customer');
    } catch (error) {
      console.log(error);
      setPaymentStatus('Failed to Pay');
    } finally {
      // setShowQR(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-8">
        <button onClick={startPaymentTransfer}>StartPayment</button>
        {
          showQR &&
          <>
            <h1 className="text-3xl">Scan QR Code to Pay</h1>
            <div ref={qrRef} />
            <p>Status: <strong>{paymentStatus}</strong></p>
          </>
        }

      </div>
    </div>
  );
}
