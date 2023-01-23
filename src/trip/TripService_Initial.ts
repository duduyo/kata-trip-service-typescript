import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService_Initial {

    public getTripsByUser(user: User): Trip[] {
        const loggedUser: User = UserSession.getLoggedUser();
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
                tripList = TripDAO.findTripsByUser(user);
            }

            return tripList;
        } else {
            throw new UserNotLoggedInException();
        }
    }

}