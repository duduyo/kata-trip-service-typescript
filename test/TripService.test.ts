import { describe, it, expect } from 'vitest'
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";

const NOT_LOGGED_USER = null;
const LOGGED_USER = new User();

const NOT_A_FRIEND = new User();

const NO_TRIPS: Trip[] = [];

describe("TripService", () => {

    const tripService = new TripService();

    it("Should throw exception when user is not logged in", () => {
        expect(() => tripService.getTrips(NOT_LOGGED_USER, NOT_A_FRIEND)).to.throw(UserNotLoggedInException)
    });
    it("Should return no trips when users are not friends", () => {
        expect(tripService.getTrips(LOGGED_USER, NOT_A_FRIEND)).to.have.ordered.members(NO_TRIPS)
    });

});
