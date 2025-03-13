import "./Sidebar.scss";
import Table from "./Table";
import Transactions from "./Transactions";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "../../assets/images/arrow_back_icon.svg"
import { useDispatch, useSelector } from "react-redux";
import { resetMessages, selectCustomerProcessedData, updateChatId } from "../../redux/app.slice";
import { useState, useEffect } from "react";
import { CustomerProcessedData } from "../../interfaces/CustomerData";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {customerId} = useParams();
  const customerProcessedData = useSelector(selectCustomerProcessedData);
  const [customerData, setCustomerData] = useState<CustomerProcessedData>();

  useEffect(() => {
    if (customerProcessedData) {
      const customer = customerProcessedData.find(
        (customer: CustomerProcessedData) => customer.customerId === customerId
      );
      setCustomerData(customer);
    }
  },[customerProcessedData]);

  const handleGoBack = () => {
    dispatch(updateChatId(""));
    dispatch(resetMessages());
    navigate("/");
  }

  return (
    <>

      <div className="sidebar-container">
        <div className="sidebar-top-section">
          <div className="sidebar-header">
            <span className="back-button" onClick={handleGoBack}>
              <img className="back-icon" src={ArrowBackIcon} alt="Back" />
              Home
            </span>
          </div>
          <div className="sidebar-content">
            <div className="subheader">Customer</div>
            <Table customerData={customerData} />
            <div className="subheader-2">Transactions</div>
            <Transactions transactions={customerData?.transactions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;