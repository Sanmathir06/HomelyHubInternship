import {propertyAction} from "./property-slice.js";
import {axiosInstance} from "../../utils/axios.js"


//get all properties
//1. start api req
//2. tell redux loding started
//3. get search parameters
//4. call backend api
//5. wait for response
//6. get property data
//7. send data to redux store
//8. if error => send error to redux store

//dispatch => SEND to redux
//getState => GET from redux

// export const getAllProperties =() => async(dispatch, getState) => {
//     try{
//         console.log("API call started");

//         dispatch(propertyAction.getRequest())

//         const {searchParams} = getState().Properties

//         console.log(searchParams)

//         const response = await axiosInstance.get("/v1/rent/listing",{
//             params:{...searchParams}
//         })

//         if(!response){
//             throw new Error("Could not fetch any properties")
//         }

//         const {data} = response;
//         console.log(data);

//         dispatch(propertyAction.getProperties(data))

//     }
//     catch(error){
//         dispatch(propertyAction.getErrors(error.message))

//     }
// }


export const getAllProperties = () => async (dispatch, getState) => {
  try {
    console.log("API call started");

    dispatch(propertyAction.getRequest());

    console.log("Redux state:", getState());

    const { searchParams } = getState().properties;

    console.log("SearchParams:", searchParams);

    const response = await axiosInstance.get("/v1/rent/listing", {
      params: { ...searchParams }
    });

    console.log("FULL RESPONSE:", response);
    console.log("RESPONSE DATA:", response.data);

    dispatch(propertyAction.getProperties(response.data));

  } catch (error) {
    console.log("API ERROR:", error);
    console.log("ERROR RESPONSE:", error.response);

    dispatch(propertyAction.getErrors(error.message));
  }
};