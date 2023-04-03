import { Button, Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Mails = (props) => {
  const location = useLocation();

  const pathName = location.pathname === "/inbox";

  const mailDeleteHandler = async (id) => {
    const response = await fetch(
      `https://techdot-messenger-default-rtdb.firebaseio.com/mails/${id}.json`,
      {
        method: "Delete",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    // console.log(id);
  };
  console.log(props);
  return (
    <div>
      <Table striped bordered hover variant="dark">
        <tbody>
          {props.data.map((mail) => (
            <tr key={mail.key}>
              <td>
                {!mail.read && pathName && (
                  <div
                    style={{
                      color: "blue",
                      backgroundColor: "blue",
                      height: "10px",
                      width: "10px",
                      borderRadius: "50%",
                    }}
                  ></div>
                )}
              </td>

              <td>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={pathName ? `/inbox/${mail.key}` : `/sent/${mail.key}`}
                >
                  {pathName ? mail.from : mail.to}
                </Link>
              </td>

              <td>{mail.title}</td>
              <td>{mail.time}</td>
              <td>
                <Button onClick={() => mailDeleteHandler(mail.key)}>
                  Delete Mail
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Mails;
