export const createOrUpdateTransaction = async (transactionData) => {
  try {
    const {id, type, walletId, amount, image} = transactionData;
    if (!amount || amount<=0 || !walletId || !type) {
        return { success: true, msg: "Invalid transaction data!" };
    }

    if (id) {

    } else {

    }

    return {success: true};
  } catch (error) {
    console.log("error creating or updating transaction: ", error);
    return { success: false, msg: error?.message };
  }
};
