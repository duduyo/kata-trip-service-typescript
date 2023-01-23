import { describe, it, expect } from 'vitest'
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";
import * as sinon from 'sinon';

const NOT_LOGGED_USER = null;
const LOGGED_USER = new User();

const NOT_FRIEND_USER = new User();

const NO_TRIPS: Trip[] = [];

const TOULOUSE = new Trip();
const PARIS = new Trip();
describe("TripService", () => {

    const tripService = new TripService();

    it("Should throw exception when user is not logged in", () => {
        expect(() => tripService.getTrips(NOT_LOGGED_USER, NOT_FRIEND_USER)).to.throw(UserNotLoggedInException)
    });
    it("Should return no trips when users are not friends", () => {
        expect(tripService.getTrips(LOGGED_USER, NOT_FRIEND_USER)).to.have.ordered.members(NO_TRIPS)
    });
    it("Should return trips when users are friends", () => {
        const friendUser = new User();
        friendUser.addFriend(LOGGED_USER)
        friendUser.addTrip(TOULOUSE)
        friendUser.addTrip(PARIS)

        // Méthode simple pour créer un stub
        const testableTripService = new (class extends TripService{
            protected findTrips(user: User): Trip[] {
                return user.getTrips()
            }
        })();

        expect(testableTripService.getTrips(LOGGED_USER, friendUser)).to.have.ordered.members([TOULOUSE, PARIS])
    });

});
