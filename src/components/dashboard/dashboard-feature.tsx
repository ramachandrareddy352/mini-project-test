"use client";

import { useEffect, useRef, useState } from "react";
import {
  createQR,
  encodeURL,
  findReference,
  FindReferenceError,
  TransactionRequestURLFields,
} from "@solana/pay";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  ConfirmedSignatureInfo,
  Keypair,
  PublicKey,
  SolanaJSONRPCError,
  TransactionSignature,
} from "@solana/web3.js";
import BigNumber from "bignumber.js";

export default function DashboardFeature() {
  const { connection } = useConnection();
  const qrRef = useRef<HTMLDivElement>(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [reference, setReference] = useState(Keypair.generate().publicKey);

  const startPaymentTransfer = async () => {
    setShowQR(true);
    console.log("\n2. 🛍 Simulate a customer checkout \n");
    const searchParams = new URLSearchParams([
      ["reference", reference.toString()],
    ]);

    // Create a new URL object using the current origin and the API URL with search parameters
    const apiUrl = new URL(
      `/api/hello?${searchParams.toString()}`,
      location.origin
    );

    const urlFields: TransactionRequestURLFields = {
      link: apiUrl,
    };
    const url = encodeURL(urlFields);
    console.log(url);
    const qr = createQR(url, 360, "white", "black");
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }
    setPaymentStatus("Pending....");
  };

  const checkTransaction = async (
    reference: PublicKey,
    setReference: (newReference: PublicKey) => void
  ) => {
    try {
      // Check for confirmed transactions including the reference public key
      await findReference(connection, reference, {
        finality: "confirmed",
      });

      // If a transaction is confirmed, generate a new reference and display an alert
      setReference(Keypair.generate().publicKey);
      setPaymentStatus("confirmed");
      window.alert("Transaction Confirmed");
    } catch (e) {
      // If current reference not found, ignore error
      if (e instanceof FindReferenceError) {
        console.log(reference.toString(), "not confirmed");
        return;
      }

      // Log any other errors
      console.error("Unknown error", e);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkTransaction(reference, setReference);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [reference]);

  return (
    <div>
      <div className="flex flex-col gap-8">
        <button onClick={startPaymentTransfer}>StartPayment</button>
        {showQR && (
          <>
            <h1 className="text-3xl">Scan QR Code to Pay</h1>
            <div ref={qrRef} />
            <p>
              Status: <strong>{paymentStatus}</strong>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
