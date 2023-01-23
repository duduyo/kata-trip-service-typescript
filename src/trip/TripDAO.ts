import CollaboratorCallException from "../exception/CollaboratorCallException";
import User from "../user/User";
import Trip from "./Trip";

export default class TripDAO {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static findTripsByUser(user: User): Trip[] {

        throw new CollaboratorCallException(
            "TripDAO should not be invoked on an unit test.");
    }
}