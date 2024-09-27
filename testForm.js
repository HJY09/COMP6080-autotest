const { Builder, Browser, By, Key } = require("selenium-webdriver");
const assert = require("assert");
const args = process.argv.slice(2);
const livePort = args[0] || 5500;

(async function example1() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get(`http://127.0.0.1:${livePort}/task1/src/index.html`);

    await test1(driver);
    await driver.findElement(By.id("resetButton")).click();

    await test2(driver);
    await driver.findElement(By.id("resetButton")).click();

    await test3(driver);
    await driver.findElement(By.id("resetButton")).click();

    await test4(driver);
    await driver.findElement(By.id("resetButton")).click();

    await testInvalidName(driver);
    await driver.findElement(By.id("resetButton")).click();

    await testInvalidDob(driver);
    await driver.findElement(By.id("resetButton")).click();

    await testEmptyGraduateDate(driver);
    await driver.findElement(By.id("resetButton")).click();

    await testInvalidGraduateDate(driver);
    await driver.findElement(By.id("resetButton")).click();
  } finally {
    await driver.quit();
  }
})();

async function test1(driver) {
  try {
    await driver.findElement(By.name("fullName")).sendKeys("Eddy", Key.TAB);
    await driver.findElement(By.name("dob")).sendKeys("01/01/2002", Key.TAB);
    await driver
      .findElement(By.name("graduationDate"))
      .sendKeys("01012024", Key.TAB);
    await driver.findElement(By.name("selectAll")).click();
    let logInfo = await driver.findElement(By.id("outputText")).getText();
    assert.strictEqual(
      logInfo,
      "My name is Eddy and I am 22 years old. I graduated on Jan 01 2024, and my favourite courses are COMP6080, COMP2521, and COMP1511."
    );
  } catch (error) {
    console.error("Test 1 failed: ", error.message);
  }
}

async function test2(driver) {
  try {
    await driver.findElement(By.name("fullName")).sendKeys("Kate", Key.TAB);
    await driver.findElement(By.name("dob")).sendKeys("01/10/2002", Key.TAB);
    await driver
      .findElement(By.name("graduationDate"))
      .sendKeys("04042020", Key.TAB);
    await driver.findElement(By.name("COMP6080")).click();
    await driver.findElement(By.name("other")).sendKeys("DART1210", Key.TAB);
    let logInfo = await driver.findElement(By.id("outputText")).getText();
    assert.strictEqual(
      logInfo,
      "My name is Kate and I am 21 years old. I graduated on Apr 04 2020, and my favourite courses are COMP6080, and DART1210."
    );
  } catch (error) {
    console.error("Test 2 failed: ", error.message);
  }
}

async function test3(driver) {
  try {
    await driver.findElement(By.name("fullName")).sendKeys("Hayden", Key.TAB);
    await driver.findElement(By.name("dob")).sendKeys("01/09/2023", Key.TAB);
    await driver
      .findElement(By.name("graduationDate"))
      .sendKeys("10062025", Key.TAB);
    await driver.findElement(By.name("COMP6080")).click();
    let logInfo = await driver.findElement(By.id("outputText")).getText();
    assert.strictEqual(
      logInfo,
      "My name is Hayden and I am 1 year old. I graduate on Jun 10 2025, and my favourite course is COMP6080."
    );
  } catch (error) {
    console.error("Test 3 failed: ", error.message);
  }
}

async function test4(driver) {
  try {
    await driver.findElement(By.name("fullName")).sendKeys("Eckles", Key.TAB);
    await driver.findElement(By.name("dob")).sendKeys("01/01/1994", Key.TAB);
    await driver
      .findElement(By.name("graduationDate"))
      .sendKeys("25122026", Key.TAB);
    await driver.findElement(By.name("other")).sendKeys("MATH1081", Key.TAB);
    let logInfo = await driver.findElement(By.id("outputText")).getText();
    assert.strictEqual(
      logInfo,
      "My name is Eckles and I am 30 years old. I graduate on Dec 25 2026, and my favourite course is MATH1081."
    );
  } catch (error) {
    console.error("Test 4 failed: ", error.message);
  }
}

async function testInvalidName(driver) {
  try {
    await driver.findElement(By.name("fullName")).sendKeys("ed", Key.TAB);
    let logInfo = await driver.findElement(By.id("outputText")).getText();
    assert.strictEqual(logInfo, "Please input a valid full name");
  } catch (error) {
    console.error("Test Invalid Name failed: ", error.message);
  }
}

async function testInvalidDob(driver) {
  try {
    await driver.findElement(By.name("fullName")).sendKeys("Hayden", Key.TAB);
    await driver.findElement(By.name("dob")).sendKeys("Sep 09, 2000", Key.TAB);
    let logInfo = await driver.findElement(By.id("outputText")).getText();
    assert.strictEqual(logInfo, "Please input a valid date of birth");
  } catch (error) {
    console.error("Test Invalid Date of Birth failed: ", error.message);
  }
}

async function testEmptyGraduateDate(driver) {
  try {
    await driver.findElement(By.name("fullName")).sendKeys("Eddy", Key.TAB);
    await driver.findElement(By.name("dob")).sendKeys("01/01/2002", Key.TAB);
    let logInfo = await driver.findElement(By.id("outputText")).getText();
    assert.strictEqual(logInfo, "Please input a valid graduation date");
  } catch (error) {
    console.error("Test Empty Graduate Date failed: ", error.message);
  }
}

async function testInvalidGraduateDate(driver) {
  try {
    await driver.findElement(By.name("fullName")).sendKeys("Eddy", Key.TAB);
    await driver.findElement(By.name("dob")).sendKeys("01/01/2022", Key.TAB);
    await driver
      .findElement(By.name("graduationDate"))
      .sendKeys("10061997", Key.TAB);
    let logInfo = await driver.findElement(By.id("outputText")).getText();
    assert.strictEqual(logInfo, "Please input a valid graduation date");
  } catch (error) {
    console.error("Test Invalid Graduate Date failed: ", error.message);
  }
}
