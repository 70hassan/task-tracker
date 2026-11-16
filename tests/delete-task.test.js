import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Task Tracker - Delete Task", () => {
  it("deleting a task removes it permanently from state and list", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({
      url: process.env.TEST_URL || "http://localhost:3000",
    });

    // Add a task
    await testdriver.find("The 'What needs doing?' text input field").click();
    await testdriver.type("Buy groceries");
    await testdriver.find("The green 'Add task' button").click();

    // Verify task is added
    const addedAssert = await testdriver.assert("The task 'Buy groceries' is displayed in the task list");
    expect(addedAssert).toBeTruthy();

    // Delete the task
    await testdriver.find("The delete button '✕' next to 'Buy groceries'").click();

    // Trigger a list re-render (e.g. clicking filter)
    await testdriver.find("The 'All' filter button").click();

    // The deleted task should not reappear in the list
    const deletedAssert = await testdriver.assert("The task 'Buy groceries' is not visible in the task list");
    expect(deletedAssert).toBeTruthy();
  });
});
