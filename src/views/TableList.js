import React, { useState, useEffect } from "react";
import axios from "axios";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function TreeTable() {
  const [transactionData, setTransactionData] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://6656a0dc9f970b3b36c5fe01.mockapi.io/api/groupByDate/StockTransactionData");
      setTransactionData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRowClick = (index) => {
    const isRowCurrentlyExpanded = expandedRows.includes(index);
    const newExpandedRows = isRowCurrentlyExpanded
      ? expandedRows.filter(id => id !== index)
      : [...expandedRows, index];
    setExpandedRows(newExpandedRows);
  };

  const renderRowDetails = (rowData, parentIndex) => (
    <tr key={`${parentIndex}-details`} className="expandable-row-details">
      <td colSpan="7">
        <div className="expanded-row">
          <Table striped responsive>
            <thead className="text-primary">
              <tr>
                <th scope="row">Activity Date</th>
                <th scope="row">Process Date</th>
                <th>Settle Date</th>
                <th>Instrument</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Trans Code</th>
              </tr>
            </thead>
            <tbody>
              {rowData.records.map((record, index) => (
                <tr key={`${parentIndex}-${index}`}>
                  <td>{record["Activity Date"]}</td>
                  <td>{record["Process Date"]}</td>
                  <td>{record["Settle Date"]}</td>
                  <td>{record["Instrument"]}</td>
                  <td>{record["Description"]}</td>
                  <td>{record["Quantity"]}</td>
                  <td>{record["Trans Code"]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </td>
    </tr>
  );
  

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Tree Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Date</th>
                      <th>Net Profit/Loss</th>
                      <th>Number of Transactions</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody class>
                    {transactionData.map((row, index) => (
                      <React.Fragment key={index}>
                        <tr onClick={() => handleRowClick(index)} style={{ cursor: "pointer" }}>
                          <td><i className="fa fa-user"></i></td>
                          <td>{row["_id"]}</td>
                          <td>{row["netProfitLoss"]}</td>
                          <td>{row["numOftxns"]}</td>
                          <td>{row["totalAmount"]}</td>
                        </tr>
                        {expandedRows.includes(index) && row.records.length > 0 && renderRowDetails(row, index)}
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default TreeTable;
