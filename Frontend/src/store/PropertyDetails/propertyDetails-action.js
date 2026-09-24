// import {propertyDetailsAction} from "./propertyDetails-slice"
// import {axiosInstance} from "../../utils/axios"

// //fetch details of one specific property using its id

// //recv propert id 
// //start loading
// //call backend api
// //wait for response
// //get the property data
// //store the details in redux
// // if error store error in redux

// export const getPropertyDetails =(id) => async(dispatch) =>{
//     try{
//         dispatch(propertyDetailsAction.getListRequest())
//         const response = await axiosInstance.get(`/v1/rent/listing/${id}`)
//         console.log(response);
//         if(!response){
//             throw new Error("Could not fetch any details")
//         }
//         const{data} = response.data;
//         dispatch(propertyDetailsAction.getPropertyDetails(data))

//     }
//     catch(error){
//         dispatch(propertyDetailsAction.getErrors(error.response.data.error))
//     }
// }


import { propertyDetailsAction } from "./propertyDetails-slice";
import { axiosInstance } from "../../utils/axios";

// Fetch details of one specific property using its ID

export const getPropertyDetails = (id) => async (dispatch) => {
    try {
        // Start loading
        dispatch(propertyDetailsAction.getListRequest());

        console.log("Property ID:", id);

        // Call backend API
        const response = await axiosInstance.get(`/v1/rent/listing/${id}`);

        console.log("Property Details Response:", response);

        if (!response) {
            throw new Error("Could not fetch any details");
        }

        // Get property data
        const { data } = response.data;

        console.log("Property Details Data:", data);

        // Store property details in Redux
        dispatch(propertyDetailsAction.getPropertyDetails(data));
    }
    catch (error) {
        console.log("Property Details Error:", error);

        dispatch(
            propertyDetailsAction.getErrors(
                error.response?.data?.error || error.message
            )
        );
    }
};