import {  Transaction } from "@multiversx/sdk-core/out";
import { useEffect, useState } from "react";
import {
  useGetAccount,
  useGetLoginInfo,
  useGetPendingTransactions,
} from "@multiversx/sdk-dapp/hooks";
import { sendTransactions } from "@multiversx/sdk-dapp/services";
import axios from "axios";


export const TransactionSection = () => {
  const [tx, setTx] = useState<Transaction>();
  const { pendingTransactionsArray } = useGetPendingTransactions();

  const { address } = useGetAccount();
  const { tokenLogin } = useGetLoginInfo();
  const bearerToken = tokenLogin?.nativeAuthToken

  const [bodyInput, setBodyInput] = useState<string>('');
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyInput(event.target.value);
  };

  const clearBody = () => {
    setBodyInput('')
  }

  const viewEnrollmentFee = async () => {
    try{
    clearBody();
    const response = await axios.get(
      'http://localhost:3000/contract/enrollment-fee', 
    );
    // console.log(tx)
    setBodyInput(JSON.stringify(response.data[0], null, 2));
  } catch(error) {
    console.log(error)
  }
   
  
  }
  const viewEnrolledInstitution = async () => {
    if(bodyInput){
      console.log("THIS IS BODY INPUT: ", bodyInput)
    } 
    try{
    const response = await axios.get(
      `http://localhost:3000/contract/enrolled-institution/${bodyInput}`, 
    );

    console.log(response.data);
    setBodyInput(JSON.stringify(response.data, null, 2));
  } catch(error){ 
    if(axios.isAxiosError(error)) {
      setBodyInput(error.message)
    }
    
  }
  }
  const whiteListAddress = async () => {
    if(bodyInput){
      console.log("THIS IS BODY INPUT: ", bodyInput)
    }
    const body = {
      name: bodyInput.split(',')[0],
      address: bodyInput.split(',')[1]
    }
    console.log(body)
    try{
    const tx = await axios.post(
      `http://localhost:3000/contract/whitelist-address`, 
      body
    );
    console.log("I GENERATED WhiteList Address TRANSACTION")
    tx.data.sender = address;
    setTx(Transaction.fromPlainObject(tx.data));
    // setBodyInput('TRANSACTION IS GENERATED!');
    // console.log(tx.data);
    clearBody();
    setBodyInput(JSON.stringify(tx.data, null, 2));
  } catch(error){ 
    if(axios.isAxiosError(error)) {
      setBodyInput(error.message)
    }
    
  }
  }

  const enrollInstitution = async () => {
    if(bodyInput){
      console.log("THIS IS BODY INPUT: ", bodyInput)
    }
    const body = {
      name: bodyInput.split(',')[0],
      amount: bodyInput.split(',')[1]
    }
    console.log(body)
    try{
    const tx = await axios.post(
      `http://localhost:3000/contract/enroll-institution`, 
      body
    );
    console.log("I GENERATED enroll institution  Tx")
    tx.data.sender = address;
    setTx(Transaction.fromPlainObject(tx.data));
    // setBodyInput('TRANSACTION IS GENERATED!');
    // console.log(tx.data);
    clearBody();
    setBodyInput(JSON.stringify(tx.data, null, 2));
  } catch(error){ 
    if(axios.isAxiosError(error)) {
      setBodyInput(error.message)
    }
    
  }
  }
  // const example = async () => {
  //   setBodyInput('')
  //   if(bodyInput){
  //     console.log("THIS IS BODY INPUT: ", bodyInput)
  //   }

  //   const tx = await axios.post<IPlainTransactionObject>(
  //     'http://localhost:3000',
  //     bodyInput,
  //     {
  //       headers: {
  //         'Authorization': 'Bearer ' + bearerToken,
  //         'Origin': 'localhost:5173',
  //         'Content-Type': 'application/json'
  //       }
  //     }
  //   );
   
  //   console.log("I GENERATED UNBOND TRANSACTION")
  //   setTx(Transaction.fromPlainObject(tx.data));
  //   setBodyInput('TRANSACTION IS GENERATED!');
  
  // }

  const sendTransaction = async () => {
    if (!address || !tx) {
      console.error("Address or transaction not found");
      return;
    }

    await sendTransactions({
      transactions: [tx],
      transactionsDisplayInfo: {
        processingMessage: "Processing transaction",
        errorMessage: "An error has occured",
        successMessage: "Transaction successful",
      },
      signWithoutSending: false,
    });
    // console.log("TRANSACTION SENT SUCCESSFULLY !")
    // setBodyInput("TRANSACTION SENT SUCCESSFULLY !")
  };

  useEffect(() => {
    console.log("tx", tx);
  }, [tx]);

  return (
    <div className="w-1/2 flex flex-col p-6 rounded-xl bg-white">
      <h2 className="flex font-medium group text-sm">
        Create and send transaction
      </h2>

      <div className="w-full flex justify-between my-4">

          <div className="flex flex-col">

              <button
                onClick={viewEnrollmentFee}
                className="bg-mvx-blue hover:scale-105 text-black font-medium py-1 px-2 my-2 rounded-lg text-base"
              >
                View Enrollment Fee
              </button>

              <button
                onClick={viewEnrolledInstitution}
                className="bg-mvx-blue hover:scale-105 text-black font-medium py-1 px-2 my-2 rounded-lg text-base"
              >
                View Enrolled Institution
              </button>
          </div>

          <div className="flex flex-col">
          </div>
          <button
                onClick={whiteListAddress}
                className="bg-mvx-blue hover:scale-105 text-black font-medium py-1 px-2 my-2 rounded-lg text-base"
              >
                White List Address Tx
              </button>
          <button
                onClick={enrollInstitution}
                className="bg-mvx-blue hover:scale-105 text-black font-medium py-1 px-2 my-2 rounded-lg text-base"
              >
                Enroll Institution Tx
            </button>
          <div className="flex flex-col">
            

          </div>

          <div className="flex flex-col">
             
          </div>

      
      </div>

      <div className="flex justify-between w-full">
        <label htmlFor="bodyInput" className="text-base border border-gray-300 rounded bg-gray-50 w-24 text-black p-1 font-semi-bold">Body</label>
        <button onClick={clearBody} className="font-medium text-base border border-gray-300 hover:bg-gray-700 rounded-xl bg-black text-white w-24 p-1">Clear Body</button>
      </div>
      <textarea id="bodyInput" value={bodyInput} onChange={handleInputChange} placeholder="Enter Body here" rows={7} className="w-full p-2 border border-gray-300 rounded text-sm"/>
      {/* <pre className="text-sm text-left">
        <code>{JSON.stringify(tx?.toPlainObject(), null, 2)}</code>
      </pre> */}
      <button
        onClick={sendTransaction}
        className="w-full bg-mvx-blue hover:scale-105 text-black font-medium py-1 px-2 my-2 rounded-lg text-2xl"
        disabled={pendingTransactionsArray.length > 0}
      >
        {pendingTransactionsArray.length > 0 ? (
          <span>Sending...</span>
        ) : (
          <span>Send transaction</span>
        )}
      </button>
    </div>
  );
};
