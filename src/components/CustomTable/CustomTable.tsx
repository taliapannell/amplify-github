import "./CustomTable.scss";
import { CustomerProcessedData } from "../../interfaces/CustomerData";
import { selectCustomerProcessedData } from '../../redux/app.slice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import tableIcon from "../../assets/images/table-icon.svg";
import TableRow from '@mui/material/TableRow';

const CustomTable = () => {
  const navigate = useNavigate();
  const tableData = useSelector(selectCustomerProcessedData);

  const handleRowClick = (row: CustomerProcessedData) => {
    navigate(`/chat/${row.customerId}`);
  };

  return (
    <div className="custom-table">
      <div className="custom-table-header">
        <img src={tableIcon} alt="" />
        <span>Customers Billing</span>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="table-header">Customer ID</TableCell>
              <TableCell className="table-header" align="center">Service Type</TableCell>
              <TableCell className="table-header" align="center">Bill Option</TableCell>
              <TableCell className="table-header" align="center">Next Bill Date</TableCell>
              <TableCell className="table-header" align="center">Provider</TableCell>
              <TableCell className="table-header" align="center">Bill Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData && tableData?.map((row) => (
              <TableRow
                key={row.customerId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell className="table-content table-customer-id" component="th" scope="row">
                  <span
                    onClick={() => handleRowClick(row)}
                    className="customer-id"
                  >
                    {row.customerId}
                  </span>
                </TableCell>
                <TableCell className="table-content" align="center">{row.serviceType}</TableCell>
                <TableCell className="table-content" align="center">{row.billOption}</TableCell>
                <TableCell className="table-content" align="center">{row.nextBillDate}</TableCell>
                <TableCell className="table-content" align="center">{row.provider}</TableCell>
                <TableCell className="table-content" align="center">{row.billStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CustomTable