describe("App.js", () => {
  it("creates and displays customer", async () => {
    // open application in browser
    await page.goto("http://localhost:3000");

    //type into form and submit
    await page.click("#name");
    await page.type("#name", "Haroon Ali");
    await page.click("#email");
    await page.type("#email", "haroon.ali.1104@gmail.com");

    const enteredName = await page.$eval(
      "#name",
      (e) => e.value
    );

    await page.click("#btn-add");

    //check result
    await page.waitForSelector("li");
    const textName = await page.$eval("li", (e) => e.textContent);
    expect(textName).toContain(enteredName);
  });


});