import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

const Inbox = () => {
  const [fetchData, setFetchData] = useState([]);
  const email = useSelector((state) => state.email);
  const [box, setBox] = useState(<CheckBoxOutlineBlankOutlinedIcon />);

  useEffect(() => {
    const asyncFun = async () => {
      const response = await fetch(
        `https://techdot-messenger-default-rtdb.firebaseio.com/mails/${email}.json`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      const fetchedData = [];
      for (const keys in data) {
        const fetchedObj = {
          key: keys,
          ...data[keys],
        };
        fetchedData.push(fetchedObj);
      }
      setFetchData(() => fetchedData);
    };
    try {
      asyncFun();
    } catch (error) {
      alert(error);
    }
  }, []);

  console.log(fetchData);

  return (
    <div className="mt-5">
      <Table striped bordered hover variant="dark">
        {fetchData.map((mail) => (
          <tbody>
            <tr key={mail.key}>
              <td>{box}</td>
              <td>{mail.from}</td>
              <td>{mail.title}</td>
              <td>{mail.time}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default Inbox;
