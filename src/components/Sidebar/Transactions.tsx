import "./Transactions.scss";
import { useState } from "react";
import { TransactionProcessedData } from "../../interfaces/CustomerData";
import Complete from "../../assets/images/complete.svg";
import Dropdown from "../../assets/images/dropdown.svg";
import Dropup from "../../assets/images/dropup.svg";
import Pending from "../../assets/images/pending.svg";
import Progress from "../../assets/images/progress.svg";

interface TransactionInfoTableProps {
  transactions?: TransactionProcessedData[];
}

const TransactionInfoTable = ({ transactions }: TransactionInfoTableProps) => {
  const [openTransactionId, setOpenTransactionId] = useState<string | null>(null);

  if (!transactions) {
    return <div>No transactions available</div>;
  }

  const toggleAccordion = (transactionId: string) => {
    setOpenTransactionId(openTransactionId === transactionId ? null : transactionId);
  };

  const firstThree = transactions ? transactions.slice(0, 3) : [];
  const nextThree = transactions ? transactions.slice(3, 6) : [];
  const remaining = transactions ? transactions.slice(6) : [];

  const renderTransactions = (transactions: TransactionProcessedData[]) => {
    return transactions.map((transaction: TransactionProcessedData) => (
      <>
        <tr key={transaction.id} onClick={() => toggleAccordion(transaction.id)} style={{ cursor: "pointer" }}>
          <td className="label-cell" colSpan={3}>
            <div className="transaction-container">
              <span>Transaction - {transaction.id}</span>
              <span>{transaction.status === "Complete" && (
                <img src={Complete} alt="Complete" className="pending-icon" />
              )}
                {transaction.status === "In Progress*" ? (
                  <img src={Progress} alt="In Progress*" className="progress-icon" />
                ) : transaction.status !== "Complete" ? (
                  <img src={Pending} alt="Pending" className="pending-icon" />
                ) : null}
                <img src={openTransactionId === transaction.id ? Dropup : Dropdown} alt={openTransactionId === transaction.id ? "Dropup" : "Dropdown"} className="toggle-icon" />
              </span>
            </div>
          </td>
        </tr>
        {openTransactionId === transaction.id && (
          <>
            <tr>
              <td className="label">Received</td>
              <td className="label">Effective</td>
              <td className="label">Provider Type</td>
            </tr>
            <tr>
              <td className="value">{transaction.receivedDate}</td>
              <td className="value">{transaction.effectiveDate}</td>
              <td className="value">{transaction.providerType}</td>
            </tr>
            <tr>
              <td className="label">Type</td>
              <td className="label">Provider</td>
              <td className="label">Service</td>
            </tr>
            <tr>
              <td className="value">{transaction.type}</td>
              <td className="value">{transaction.providerId}</td>
              <td className="value">{transaction.service}</td>
            </tr>
            <tr>
              <td className="label">Direction</td>
              <td className="label">Provider Name</td>
              <td className="label">Provider Status</td>
            </tr>
            <tr>
              <td className="value">{transaction.direction}</td>
              <td className="value">{transaction.providerName}</td>
              <td className="value">{transaction.providerStatus}</td>
            </tr>
          </>
        )}
      </>
    ));
  };

  return (
    <>
      <div className="transactions-container">
        {firstThree.map(transaction => (
          <table className="sidebar-custom-table-2" key={transaction.id}>
            <tbody>
              {renderTransactions([transaction])}
            </tbody>
          </table>
        ))}
        {nextThree.map(transaction => (
          <table className="sidebar-custom-table-2" key={transaction.id}>
            <tbody>
              {renderTransactions([transaction])}
            </tbody>
          </table>
        ))}
        {remaining.map(transaction => (
          <table className="sidebar-custom-table-2" key={transaction.id}>
            <tbody>
              {renderTransactions([transaction])}
            </tbody>
          </table>
        ))}
      </div>
    </>
  );
};

export default TransactionInfoTable;
