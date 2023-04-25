import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialMailState = {
  allMails: [],
  mailDetails: null,
};
const mailSlice = createSlice({
  name: "mails",
  initialState: initialMailState,
  reducers: {
    replace(state, action) {
      state.allMails = action.payload;
    },
    addMail(state, action) {
      console.log(action.payload.mail);
      state.allMails = [...state.allMails, action.payload.mail];
    },
    deleteMail(state, action) {
      console.log(state.allMails);
      console.log(action.payload.id);
      const existingItem = state.allMails.filter((mail) => {
        return mail.key !== action.payload.id;
      });
      state.allMails = [...existingItem];
      console.log(existingItem);
    },
    readMail(state, action) {
      console.log(action.payload.id);
      const existingItem = state.allMails.find((mail) => {
        return mail.key === action.payload.id;
      });
      existingItem.read = true;
    },
    mail(state, action) {
      state.mailDetails = action.payload ;
      console.log(state.mailDetails);
    },
  },
});

// export const putData = (item) => {
//   return (dispatch) => {
//     const asyncFun = async () => {
//       const response = await fetch(
//         `https://techd0t-default-rtdb.firebaseio.com/mails.json`,
//         {
//           method: "PUT",
//           body: JSON.stringify({ item }),
//         }
//       );
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error.message);
//       }
//       const fetchedData = [];
//       for (const keys in data) {
//         const fetchedObj = {
//           key: keys,
//           ...data[keys],
//         };
//         fetchedData.push(fetchedObj);
//       }
//       return fetchedData;
//     };
//     try {
//       asyncFun();
//     } catch (error) {
//       alert(error);
//     }
//   };
// };

// export const getData = () => {
//   return async (dispatch) => {
//     const asyncFun = async () => {
//       const response = await fetch(
//         `https://techd0t-default-rtdb.firebaseio.com/mails.json`
//       );
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error.message);
//       }
//       console.log(data);
//       const fetchedData = [];
//       for (const keys in data) {
//         console.log(keys);
//         const fetchedObj = {
//           key: keys,
//           ...data[keys],
//         };
//         fetchedData.push(fetchedObj);
//       }
//       return fetchedData;
//     };
//     try {
//       const dataFunction = await asyncFun();
//       console.log(dataFunction);
//       dispatch(mailAction.replace(dataFunction));
//     } catch (error) {
//       alert(error);
//     }
//   };
// };

export const mailAction = mailSlice.actions;
export default mailSlice.reducer;
