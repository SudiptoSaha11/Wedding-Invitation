/**
 * ============================================================================
 * Wedding RSVP — Google Apps Script API
 * ============================================================================
 * 
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. Click Extensions → Apps Script.
 * 3. Delete EVERYTHING in the editor and paste the code below.
 * 4. Click Save (Floppy disk icon or Ctrl+S).
 * 5. Click Deploy → Manage deployments.
 * 6. Click the ✏️ Edit icon next to your active deployment.
 * 7. Under "Version", select "New version".
 * 8. Click Deploy.
 * ============================================================================
 */

function doPost(e) {
  try {
    // 1. Get the active spreadsheet and sheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      throw new Error("Could not access active spreadsheet");
    }

    // Find tab named "Wedding RSVP", "RSVP", or fallback to the first tab
    var sheet =
      spreadsheet.getSheetByName("Wedding RSVP") ||
      spreadsheet.getSheetByName("RSVP") ||
      spreadsheet.getSheets()[0];

    if (!sheet) {
      throw new Error("No sheet tab found in spreadsheet");
    }

    // 2. Parse request payload
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No data received in request body");
    }

    var data = JSON.parse(e.postData.contents);
    var name = String(data.name || "").trim();
    var response = String(data.response || "").trim();
    var foodPreference = String(data.foodPreference || "").trim();

    // 3. Validate Guest Name
    if (!name || name.length > 100) {
      throw new Error("Invalid guest name (1-100 characters required)");
    }

    // 4. Validate RSVP Response
    if (!["Accepted", "Declined"].includes(response)) {
      throw new Error("Invalid RSVP response (Accepted or Declined required)");
    }

    // 5. Validate Food Preference
    var finalFoodPreference = "N/A";
    if (response === "Accepted") {
      if (!["Veg", "Non-Veg"].includes(foodPreference)) {
        throw new Error("Please select a valid food preference ('Veg' or 'Non-Veg')");
      }
      finalFoodPreference = foodPreference;
    }

    // 6. Ensure header row exists if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Name", "Response", "Food Preference", "Timestamp"]);
    }

    // 7. Format timestamp in India Standard Time
    var timeZone = spreadsheet.getSpreadsheetTimeZone() || "Asia/Kolkata";
    var timestamp = Utilities.formatDate(new Date(), timeZone, "yyyy-MM-dd HH:mm:ss");

    // 8. Insert RSVP row
    sheet.appendRow([
      name,
      response,
      finalFoodPreference,
      timestamp
    ]);

    // 9. Return verified success JSON
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: "RSVP recorded successfully"
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.message || "An error occurred while saving RSVP"
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: "Wedding RSVP API is active and ready to receive submissions."
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
