import {describe, expect, it} from "vitest";
import User from "../src/user/User";

describe("User test", () => {

    const user = new User();
    const friendUser = new User();
    user.addFriend(friendUser);
    const notFriendUser = new User();

    it("Should return true if user is a friend", () => {
        expect(user.isFriend(friendUser)).to.equal(true);
    });
    it("Should return when if user is a not friend", () => {
        expect(user.isFriend(notFriendUser)).to.equal(false);
    });


});
