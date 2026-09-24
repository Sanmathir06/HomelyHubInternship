import { Property } from "../Models/propertyModel.js";
import { planTrip } from "../ai/tripPlanner.js";
import { generateDescription } from "../ai/generateDescription.js";

const cleanCity = (text) =>
    text.toLowerCase().replaceAll(" ", "");


const createTripPlan = async (req, res) => {
    try {
        const {
            destination,
            budget,
            days,
            people,
            interests
        } = req.body;

        console.log("Trip request received:", req.body);

        if (!destination || !budget || !days || !people) {
            return res.status(400).json({
                status: "fail",
                message: "Please fill in all the details"
            });
        }

        console.log("Starting AI trip planner...");

        const plan = await planTrip({
            destination,
            budget,
            days,
            people,
            interests: interests || []
        });

        console.log("AI trip plan received");

        const perNight = Number(budget) / Number(days);
        const city = cleanCity(destination);

        console.log("Searching properties...");
        console.log("City:", city);
        console.log("Budget per night:", perNight);
        console.log("People:", people);

        const properties = await Property.find({
            $or: [
                { "address.city": city },
                { "address.area": city }
            ],
            price: { $lte: perNight },
            maximumGuest: { $gte: Number(people) }
        }).limit(6);

        console.log("Properties found:", properties.length);

        res.status(200).json({
            status: "success",
            data: {
                plan,
                properties,
                perNight
            }
        });

    } catch (error) {

        console.error("Create Trip Plan Error:", error);

        res.status(500).json({
            status: "fail",
            message: "Could not create a trip plan, please try again"
        });
    }
};


const writeDescription = async (req, res) => {
    try {
        const description = await generateDescription(req.body);

        res.status(200).json({
            status: "success",
            data: { description }
        });

    } catch (error) {

        console.error("Write Description Error:", error);

        res.status(500).json({
            status: "fail",
            message: "Could not generate the description"
        });
    }
};


export { createTripPlan, writeDescription };