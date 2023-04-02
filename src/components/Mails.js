import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Mails = (props) => {
  console.log(props);
  return (
    <div className="mt-5">
      <Table striped bordered hover variant="dark">
        <tbody>
          {props.data.map((mail) => (
            <tr key={mail.key}>
              <td>
                {!mail.read && (
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
                  to={`/inbox/${mail.key}`}
                >
                  {mail.from}{" "}
                </Link>
              </td>

              <td>{mail.title}</td>
              <td>{mail.time}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Mails;
