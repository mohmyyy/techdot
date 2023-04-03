import Mails from "./Mails";
import { useSelector } from "react-redux";

const SentMail = () => {
  const email = useSelector((state) => state.auth.email);
  const mails = useSelector((state) => state.mail.allMails);
  const filteredMails = mails.filter((mail) => mail.from === email);
  console.log(filteredMails);

  return <Mails data={filteredMails} />;
};

export default SentMail;
