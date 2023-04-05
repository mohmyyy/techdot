import { Button, Table } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import useFetch from "../customHook/useFetch";

const Mails = (props) => {
  const location = useLocation();
  const history = useHistory();

  const pathName = location.pathname === "/inbox";

  const { isLoading, error, sendRequest: deleteData } = useFetch();

  const openMailHandler = (mail) => {
    history.push(`${location.pathname}/${mail.key}`);
  };

  const mailDeleteHandler = async (id) => {
    deleteData({
      URL: `https://techdot-messenger-default-rtdb.firebaseio.com/mails/${id}.json`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
