import { test, expect } from "@playwright/test";
import fs from "fs";

test("Bookstore Flow", async ({ page }) => {
  await page.goto("https://demoqa.com");

  // Waiting for navigation
  await Promise.all([
    page.waitForURL("**/books"),
    page.getByRole("link", { name: "Book Store Application" }).click()
  ]);

  await expect(page.locator("#login")).toBeVisible();
  await page.locator("#login").click();

  // Filling credentials
  await page.getByPlaceholder("UserName").fill("testuser");
  await page.getByPlaceholder("Password").fill("Test@123");

  // Waiting for login button
  await expect(page.locator("#login")).toBeVisible();
  await page.locator("#login").click();

  // Validating Username and Logout button
  await expect(page.locator("#userName-value")).toBeVisible();
  
  await expect(page.locator("#userName-value")).toHaveText("testuser");
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();

  // Navigate to Book Store
  await page.locator('a[href="/books"]').click();
  await expect(page).toHaveURL(/.*books/);

  // Search book and validate
  await page.getByPlaceholder("Type to search").fill("Learning JavaScript Design Patterns");

  await expect(page.getByRole("link" , { name: "Learning JavaScript Design Patterns" }))
  .toContainText("Learning JavaScript Design Patterns");
    
  // Extracting book details and saving to JSON
  const row = page.locator('tbody tr', { hasText: "Learning JavaScript Design Patterns" });
  await expect(row).toBeVisible();

  const title = await row.locator('td').nth(1).textContent();
  const author = await row.locator('td').nth(2).textContent();
  const publisher = await row.locator('td').nth(3).textContent();

  const data = {
    title: title.trim(),
    author: author.trim(),
    publisher: publisher.trim()
  };

  fs.writeFileSync('book.json', JSON.stringify(data, null, 2)); 

  //Logout
  await expect(page.locator('#submit')).toBeVisible();
  await page.locator('#submit').click();
});
