import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface RsvpItem {
  id: string;
  timestamp: string;
  fullName: string;
  attendance: "accept" | "decline";
  guestsCount: number;
  song?: string;
  childrenInfo?: string;
  wishes?: string;
  syncedToGoogleSheets?: boolean;
}

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// In-memory + file-backed storage for Photos
const PHOTOS_FILE = path.join(process.cwd(), "photos.json");
let photosStore: Record<string, string> = {};

try {
  if (fs.existsSync(PHOTOS_FILE)) {
    const raw = fs.readFileSync(PHOTOS_FILE, "utf-8");
    photosStore = JSON.parse(raw);
  }
} catch (e) {
  console.warn("Could not load photos file:", e);
}

function persistPhotos() {
  try {
    fs.writeFileSync(PHOTOS_FILE, JSON.stringify(photosStore, null, 2));
  } catch (e) {
    console.warn("Could not save photos file:", e);
  }
}

// API: Get all custom photos
app.get("/api/photos", (req, res) => {
  res.json({ success: true, photos: photosStore });
});

// API: Save or update a custom photo
app.post("/api/photos", (req, res) => {
  const { photoId, photoData } = req.body;
  if (!photoId || !photoData) {
    return res.status(400).json({ error: "photoId and photoData are required" });
  }
  photosStore[photoId] = photoData;
  persistPhotos();
  res.json({ success: true, message: `Photo ${photoId} saved successfully` });
});

// API: Reset photos to default
app.delete("/api/photos", (req, res) => {
  photosStore = {};
  persistPhotos();
  res.json({ success: true, message: "Photos reset to defaults" });
});

// In-memory + file-backed storage for RSVPs
const DATA_FILE = path.join(process.cwd(), "rsvps.json");
let rsvpsStore: RsvpItem[] = [];

try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    rsvpsStore = JSON.parse(raw);
  }
} catch (e) {
  console.warn("Could not load initial RSVPs file:", e);
}

function persistStore() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(rsvpsStore, null, 2));
  } catch (e) {
    console.warn("Could not save RSVPs file:", e);
  }
}

// Target Google Sheet configuration
const TARGET_SHEET_ID = "1tLBP0EDUoWFI-zjnaauMUAZAVZgdQXdTmygZQv5xPOc";
const TARGET_SHEET_URL = "https://docs.google.com/spreadsheets/d/1tLBP0EDUoWFI-zjnaauMUAZAVZgdQXdTmygZQv5xPOc/edit?usp=sharing";
const DEFAULT_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxAAquYK2KKIKyy_cnZV-HBXssSjCG5wI0Er-dIFIb9i_dRocsNPmit8q8nx2E7xeyR4Q/exec";

// Webhook config persistence
const CONFIG_FILE = path.join(process.cwd(), "sheet_config.json");
let savedWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || process.env.VITE_GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;

try {
  if (fs.existsSync(CONFIG_FILE)) {
    const conf = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
    if (conf.webhookUrl) {
      savedWebhookUrl = conf.webhookUrl;
    }
  }
} catch (e) {
  console.warn("Could not read sheet config:", e);
}

// API: Health & Config check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    sheetId: TARGET_SHEET_ID,
    sheetUrl: TARGET_SHEET_URL,
    hasWebhook: Boolean(savedWebhookUrl),
  });
});

// API: Get & Set Webhook Config
app.get("/api/config", (req, res) => {
  res.json({
    sheetId: TARGET_SHEET_ID,
    sheetUrl: TARGET_SHEET_URL,
    webhookUrl: savedWebhookUrl ? `${savedWebhookUrl.substring(0, 30)}...` : "",
    hasWebhook: Boolean(savedWebhookUrl),
  });
});

app.post("/api/config/webhook", (req, res) => {
  const { webhookUrl } = req.body;
  savedWebhookUrl = String(webhookUrl || "").trim();
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ webhookUrl: savedWebhookUrl }, null, 2));
  } catch (e) {
    console.warn("Could not persist sheet config:", e);
  }
  return res.json({ success: true, hasWebhook: Boolean(savedWebhookUrl) });
});

// API: Test Google Sheet Webhook
app.post("/api/test-sheet", async (req, res) => {
  const targetUrl = req.body?.webhookUrl || savedWebhookUrl;
  if (!targetUrl) {
    return res.status(400).json({
      success: false,
      error: "No Google Apps Script Webhook URL configured. Please paste your Web App URL.",
    });
  }

  const testPayload = {
    id: `test_${Date.now()}`,
    timestamp: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
    fullName: "Test Guest (Connection Check)",
    attendance: "accept",
    guestsCount: 2,
    song: "Test Wedding Song",
    childrenInfo: "None",
    wishes: "Verified live connection to Google Sheet!",
  };

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testPayload),
    });

    const respText = await response.text();
    return res.json({
      success: true,
      message: "Test RSVP sent to Google Sheet Webhook!",
      responseDetails: respText.substring(0, 150),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({
      success: false,
      error: `Failed to reach Google Webhook: ${msg}`,
    });
  }
});

// API: Get all RSVPs
app.get("/api/rsvps", (req, res) => {
  res.json({
    sheetId: TARGET_SHEET_ID,
    sheetUrl: TARGET_SHEET_URL,
    total: rsvpsStore.length,
    hasWebhook: Boolean(savedWebhookUrl),
    rsvps: rsvpsStore,
  });
});

// API: Submit RSVP
app.post("/api/rsvp", async (req, res) => {
  try {
    const { fullName, attendance, guestsCount, song, childrenInfo, wishes } = req.body;

    if (!fullName) {
      return res.status(400).json({ error: "Full name is required" });
    }

    const newRsvp: RsvpItem = {
      id: `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      fullName: String(fullName).trim(),
      attendance: attendance === "decline" ? "decline" : "accept",
      guestsCount: attendance === "decline" ? 0 : Math.max(1, Number(guestsCount) || 1),
      song: song ? String(song).trim() : "-",
      childrenInfo: childrenInfo ? String(childrenInfo).trim() : "-",
      wishes: wishes ? String(wishes).trim() : "-",
      syncedToGoogleSheets: false,
    };

    // Forward to configured Google Sheets Webhook URL if provided
    const webhookUrl = savedWebhookUrl || process.env.GOOGLE_SHEET_WEBHOOK_URL || process.env.VITE_GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const fetchRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRsvp),
          redirect: "follow",
        });
        if (fetchRes.ok || fetchRes.status === 200 || fetchRes.status === 302) {
          newRsvp.syncedToGoogleSheets = true;
        }
      } catch (webhookErr) {
        console.warn("Failed forwarding to Google Sheet Webhook:", webhookErr);
      }
    }

    rsvpsStore.unshift(newRsvp);
    persistStore();

    return res.status(201).json({
      success: true,
      message: "RSVP recorded successfully",
      rsvp: newRsvp,
      syncedToSheet: newRsvp.syncedToGoogleSheets,
      sheetUrl: TARGET_SHEET_URL,
    });
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Wedding App Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
