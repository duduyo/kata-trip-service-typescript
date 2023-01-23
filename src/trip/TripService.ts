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

        return user.isFriend(loggedUser!)
            ? this.findTrips(user)
            : NO_TRIPS;
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