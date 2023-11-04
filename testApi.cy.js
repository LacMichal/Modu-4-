describe("Test dla https://httpbin.org/", () => {
  it("Test GET Request", () => {
    cy.request("GET", "https://httpbin.org/get").then((response) => {
      assert.equal(response.status, 200);
      assert.equal(response.body.url, "https://httpbin.org/get");
    });
  });

  describe("Test dla https://httpbin.org/", () => {
  it("Test 404 Not Found", () => {
    cy.request({
      method: "GET",
      url: "https://httpbin.org/status/404",
      failOnStatusCode: false, 
    }).then((response) => {
      assert.equal(response.status, 404);
    });
  });
});

  it("Test POST Request", () => {
    const requestData = {
      key: "value",
    };
    cy.request("POST", "https://httpbin.org/post", requestData).then(
      (response) => {
        assert.equal(response.status, 200);
        assert.equal(response.body.data, '{"key":"value"}');
      }
    );
  });

  it("Test Custom Headers", () => {
    const headers = {
      "User-Agent": "ABCD",
      "X-Custom-Header": "BCDE",
    };
    cy.request({
      method: "GET",
      url: "https://httpbin.org/headers",
      headers: headers,
    }).then((response) => {
      assert.equal(response.status, 200);
      assert.equal(response.body.headers["User-Agent"], "ABCD");
      assert.equal(response.body.headers["X-Custom-Header"], "BCDE");
    });
  });

  it("Test Query Parameters", () => {
    const queryParams = {
      param1: "value1",
      param2: "value2",
    };
    cy.request({
      method: "GET",
      url: "https://httpbin.org/get",
      qs: queryParams,
    }).then((response) => {
      assert.equal(response.status, 200);
      assert.equal(response.body.args.param1, "value1");
      assert.equal(response.body.args.param2, "value2");
    });
  });

  it("Test Response Content", () => {
    cy.request("GET", 
    "https://httpbin.org/html").then((response) => {
      assert.equal(response.status, 200);
      assert.include(response.body, "<html>");
    });
  });

  it("Test Request Duration", () => {
    const startTime = new Date().getTime();
    cy.request("GET", "https://httpbin.org/delay/3").then((response) => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      assert.equal(response.status, 200);
      assert.isAtLeast(duration, 3000); // 3 sekundy 
    });
  });
  it("Test PUT Request", () => {
    const requestData = {
      key: "updatedValue",
    };
    cy.request("PUT", "https://httpbin.org/put", requestData).then(
      (response) => {
        assert.equal(response.status, 200);
        assert.equal(response.body.data, '{"key":"updatedValue"}');
      }
    );
  });

  it("Test DELETE Request", () => {
    cy.request("DELETE", "https://httpbin.org/delete").then((response) => {
      assert.equal(response.status, 200);
      assert.equal(response.body.url, "https://httpbin.org/delete");
    });
  });

  it("Test Dynamic Query Parameters", () => {
    const randomValue = Math.random().toString(36).substring(7);
    const queryParams = {
      dynamicParam: randomValue,
    };
    cy.request({
      method: "GET",
      url: "https://httpbin.org/get",
      qs: queryParams,
    }).then((response) => {
      assert.equal(response.status, 200);
      assert.equal(response.body.args.dynamicParam, randomValue);
    });
  });
});
