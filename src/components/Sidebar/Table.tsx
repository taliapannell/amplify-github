import "./Table.scss";
import { CustomerProcessedData } from "../../interfaces/CustomerData";

interface CustomerInfoTableProps {
  customerData?: CustomerProcessedData;
}

const CustomerInfoTable = ({ customerData }: CustomerInfoTableProps) => {


  if (!customerData) {
    return <div>No customer data available</div>;
  }

  const data = [
    { label: "Customer ID", value: customerData.customerId },
    { label: "Name", value: customerData.customerName },
    { label: "Borough", value: customerData.borough },
    { label: "Last Bill", value: customerData.lastBillDate },
    { label: "Next Bill", value: customerData.nextBillDate },
    { label: "Service Type", value: customerData.serviceType },
    { label: "Cycle Read", value: customerData.cycleReadDate },
    { label: "Last Cycle Read", value: customerData.lastCycleReadDate },
    { label: "Bill Option", value: customerData.billOption },
  ];

  const firstThree = data.slice(0, 3);
  const nextThree = data.slice(3, 6);
  const remaining = data.slice(6);

  return (
    <div className="table-container">
      <table className="sidebar-custom-table">
        <tbody>
          <tr>
            {firstThree.map((item) => (
              <td key={item.label} className="label-cell">{item.label}</td>
            ))}
          </tr>
          <tr>
            {firstThree.map((item) => (
              <td key={item.label} className="value-cell">{item.value}</td>
            ))}
          </tr>
          <tr>
            {nextThree.map((item) => (
              <td key={item.label} className="label-cell">{item.label}</td>
            ))}
          </tr>
          <tr>
            {nextThree.map((item) => (
              <td key={item.label} className="value-cell">{item.value}</td>
            ))}
          </tr>
          <tr>
            {remaining.map((item) => (
              <td key={item.label} className="label-cell">{item.label}</td>
            ))}
          </tr>
          <tr>
            {remaining.map((item) => (
              <td key={item.label} className="value-cell">{item.value}</td>
            ))}
          </tr>
        </tbody>
      </table>
      
    </div>
  );
};

export default CustomerInfoTable;