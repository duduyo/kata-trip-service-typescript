import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {

    public getTripsByUser(user: User): Trip[] {
        const loggedUser: User | null = UserSession.getLoggedUser();
        return this.getTrips(loggedUser, user);
    }

    getTrips(loggedUser: User | null, user: User) {
        let tripList: Trip[] = [];
        let isFriend = false;

        if (loggedUser != null) {
            for (const friend of user.getFriends()) {
                if (friend === loggedUser) {
                    isFriend = true;
                    break;
                }
            }

            if (isFriend) {
                tripList = this.findTrips(user);
            }

            return tripList;
        } else {
            throw new UserNotLoggedInException();
        }
    }

    protected findTrips(user: User) {
        return TripDAO.findTripsByUser(user);
    }
}