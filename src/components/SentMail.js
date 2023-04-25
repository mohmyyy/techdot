import Mails from "./Mails";
import { useSelector } from "react-redux";
import NoMessages from "./NoMessages";

const SentMail = () => {
  const email = useSelector((state) => state.auth.email);
  const mails = useSelector((state) => state.mail.allMails);
  const filteredMails = mails.filter((mail) => mail.from === email);
  console.log(filteredMails);

  let context;

  if (filteredMails.length > 0) {
    context = <Mails data={filteredMails} />;
  } else {
    context = <NoMessages />;
  }
  return <>{context}</>;
};

export default SentMail;
