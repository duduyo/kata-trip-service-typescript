import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

const NO_TRIPS: Trip[] = [];
export default class TripService {

    public getTripsByUser(user: User): Trip[] {
        const loggedUser: User | null = UserSession.getLoggedUser();
        return this.getTrips(loggedUser, user);
    }

    getTrips(loggedUser: User | null, user: User) {

        this.assertUserIsLogged(loggedUser);

        return this.areFriends(user, loggedUser)
            ? this.findTrips(user)
            : NO_TRIPS;
    }

    private areFriends(user: User, loggedUser: User | null) {
        let isFriend = false;
        for (const friend of user.getFriends()) {
            if (friend === loggedUser) {
                isFriend = true;
                break;
            }
        }
        return isFriend;
    }

    private assertUserIsLogged(loggedUser: User | null) {
        if (loggedUser == null) {
            throw new UserNotLoggedInException();
        }
    }

    findTrips(user: User) {
        return TripDAO.findTripsByUser(user);
    }
}