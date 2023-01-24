import { describe, it, expect } from 'vitest'
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";

const NOT_LOGGED_USER = null;
const A_USER = new User();
describe("TripService", () => {

    it("Should throw exception when user is not logged", () => {
        const tripService = new TripService();
        expect(() => tripService.getTrips(NOT_LOGGED_USER, A_USER)).to.throw(UserNotLoggedInException);
    });
});
