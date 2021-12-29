
export function Transactions({ loggedInUser,contact,btcToUsd }) {

    loggedInUser.transactions.sort((a,b)=>{
        return b.at - a.at
    })
    let transactions = loggedInUser.transactions
     if(contact){
        transactions = loggedInUser.transactions.filter(trans=>trans.toId === contact._id)
     } 

    if (!loggedInUser) return <div>Loading...</div>;
    return (
      <div className="user-transactions">
          {transactions.length>0 && <div className={`transactions-history-header ${!contact ? 'home-transactions' : ''}`}>Your Last {transactions.length > 5 ? '5' : transactions.length } Transactions </div>}
        {transactions.slice(0,5).map((transaction) => (
          <div key={transaction.at} className="transactions-history flex column">
           <h3 className="transaction-amount">&#8383; {transaction.amount} | <span className="amount-to-usd">$ {(transaction.amount / btcToUsd).toLocaleString("en-GB")}</span></h3>
           <p>status : <span className="transaction-status">approved</span></p>
           <p className="transaction-date">{new Date(transaction.at).toLocaleString('en-GB',{timeZone:'UTC'})}</p>
           <p className="transaction-line"></p>
          </div>
        ))}
      </div>
    );
  }