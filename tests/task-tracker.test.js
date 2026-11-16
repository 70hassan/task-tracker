import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Task Tracker", () => {
  it("allows users to create, complete, and manage tasks", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://70hassan.github.io/task-tracker/" });

    const assertResult = await testdriver.assert("the Task Tracker heading is visible");
    expect(assertResult).toBeTruthy();

    await testdriver.find("\"What needs doing?\" input field").click();
    await testdriver.type("Buy groceries");
    await testdriver.find("\"Add task\" button").click();

    const assertResult2 = await testdriver.assert("the task \"Buy groceries\" is visible in the list and the footer shows \"1 task left\"");
    expect(assertResult2).toBeTruthy();

    await testdriver.find("\"What needs doing?\" input field").click();
    await testdriver.type("Walk the dog");
    await testdriver.find("\"Add task\" button").click();

    const assertResult3 = await testdriver.assert("both \"Buy groceries\" and \"Walk the dog\" are in the list and the footer shows \"2 tasks left\"");
    expect(assertResult3).toBeTruthy();

    await testdriver.find("checkbox next to \"Buy groceries\"").click();

    const assertResult4 = await testdriver.assert("\"Buy groceries\" is marked done and \"Clear completed\" button is visible");
    expect(assertResult4).toBeTruthy();

    await testdriver.find("\"Active\" filter button").click();

    const assertResult5 = await testdriver.assert("only \"Walk the dog\" is shown under the Active filter");
    expect(assertResult5).toBeTruthy();

    await testdriver.find("\"Done\" filter button").click();

    const assertResult6 = await testdriver.assert("only \"Buy groceries\" is shown under the Done filter");
    expect(assertResult6).toBeTruthy();

    await testdriver.find("\"All\" filter button").click();
    await testdriver.find("\"Clear completed\" button").click();

    const assertResult7 = await testdriver.assert("only \"Walk the dog\" remains in the list and the footer shows \"1 task left\"");
    expect(assertResult7).toBeTruthy();

    await testdriver.find("delete button ✕ next to \"Walk the dog\"").click();

    const assertResult8 = await testdriver.assert("the list displays \"No tasks yet. Add your first one above.\" and the footer shows \"0 tasks left\"");
    expect(assertResult8).toBeTruthy();
  });
});
