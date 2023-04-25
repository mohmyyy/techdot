import { Button, Table } from "react-bootstrap";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import useFetch from "../customHook/useFetch";
import { useDispatch } from "react-redux";
import { mailAction } from "../redux/redux-mails";

const Mails = (props) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const pathName = location.pathname === "/inbox";

  const { isLoading, error, sendRequest: deleteData } = useFetch();
  const { sendRequest: updateData } = useFetch();

  const openMailHandler = (mail) => {
    history.push(`${location.pathname}/${mail.key}`);
    dispatch(mailAction.mail(mail));
    console.log(mail);
    console.log(location.pathname);
    if (location.pathname === "/inbox") {
      dispatch(mailAction.readMail({ id: mail.key }));
      updateData({
        URL: `https://techd0t-default-rtdb.firebaseio.com/mails/${mail.key}.json`,
        method: "PUT",
        body: {
          from: mail.from,
          to: mail.to,
          title: mail.title,
          body: mail.body,
          time: mail.time,
          read: true,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  const mailDeleteHandler = async (id) => {
    dispatch(mailAction.deleteMail({ id: id }));
    deleteData({
      URL: `https://techd0t-default-rtdb.firebaseio.com/mails/${id}.json`,
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

              <td onClick={() => openMailHandler(mail)}>
                {pathName ? mail.from : mail.to}
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
