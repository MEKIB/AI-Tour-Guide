import mongoose from "mongoose";

// HotelRules Schema
const hotelRulesSchema = new mongoose.Schema({
    hotelAdminId: {
      type: String,
      required: true,
     },
    checkIn: String,
    checkOut: String,
    cancellationPolicy: String,
    childPolicies: [String],
    cotAndExtraBedPolicies: [String],
    noAgeRestriction: Boolean,
    petsAllowed: Boolean,
    acceptedCards: [String],
  });
  
  const HotelRules = mongoose.model('HotelRules', hotelRulesSchema);
export default HotelRules;  