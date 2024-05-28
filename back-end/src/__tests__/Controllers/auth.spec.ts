import { authLoginController, authRegisterController } from "../../Controllers/Auth";
import User from "../../Models/UserSchema";

jest.mock("../../Models/UserSchema");

const request = {
    body:{
        name: "test", 
        email: "test@example.com", 
        password: "testPassword"
    }
}

const response = {
    status: jest.fn((x) => x),
    json: jest.fn()
}

describe("authLoginController", () => {
    it("should return 400 if no name or email is provided", async () => {
        const req = { body: {} };
        await authLoginController(req, response);
        expect(response.status).toHaveBeenCalledWith(400);
    });

    it("should return 400 if user is not found", async () => {
        const req = { body: { name: "test" } };
        User.findOne.mockImplementationOnce(() => ({
            id: "1",
            email: "email",
            password: "password"    
        }));
        await authLoginController(req, response);
        expect(response.status).toHaveBeenCalledWith(400);
    });

    it("should return 401 if password is incorrect", async () => {
        const req = { body: { name: "test" } };
        await User.findOne.mockImplementationOnce({ comparePassword: async () => false });
        await authLoginController(req, response);
        expect(response.status).toHaveBeenCalledWith(401);
    });

    it("should return 200 and a token if user is found and password is correct", async () => {
        const req = { body: { name: "test" } };
        User.findOne.mockImplementationOnce({ comparePassword: async () => true });
        await authLoginController(req, response);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalled();
    });
});