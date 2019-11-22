var request = require("request");
var base_url = "http://localhost:3000/";
describe("Server", () => {
  var server;
  beforeAll(() => {
    server = require("../server");
  });

  describe("GET /", () => {
    var data = {};
    beforeAll(done => {
      request.get("http://localhost:3000/", (error, response, request) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("login", done => {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
