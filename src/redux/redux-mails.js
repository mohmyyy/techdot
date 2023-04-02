import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialMailState = {
  allMails: [],
};
const mailSlice = createSlice({
  name: "mails",
  initialState: initialMailState,
  reducers: {
    replace(state, action) {
      console.log(action.payload);
      state.allMails = action.payload;
      console.log(state.allMails);
    },
    // addToMails(state, action) {
    //   state.allMails.push(action.payload);
    //   const time = new Date();
    //   from: email,
    //     time: `${time.getHours()}/${time.getMinutes()}/${time.getTimezoneOffset()}`,
    //     read: false
    // },
  },
});

// export const putData = (item) => {
//   return (dispatch) => {
//     const asyncFun = async () => {
//       const response = await fetch(
//         `https://techdot-messenger-default-rtdb.firebaseio.com/mails.json`,
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

export const getData = () => {
  return async (dispatch) => {
    const asyncFun = async () => {
      const response = await fetch(
        `https://techdot-messenger-default-rtdb.firebaseio.com/mails.json`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      console.log(data);
      const fetchedData = [];
      for (const keys in data) {
        console.log(keys);
        const fetchedObj = {
          key: keys,
          ...data[keys],
        };
        fetchedData.push(fetchedObj);
      }
      return fetchedData;
    };
    try {
      const dataFunction = await asyncFun();
      console.log(dataFunction);
      dispatch(mailAction.replace(dataFunction));
    } catch (error) {
      alert(error);
    }
  };
};

export const mailAction = mailSlice.actions;
export default mailSlice.reducer;
