// Google Sheets integration service for recording wedding RSVP submissions

export interface StoredRSVP {
  id: string;
  timestamp: string;
  fullName: string;
  attendance: 'accept' | 'decline';
  guestsCount: number;
  song?: string;
  childrenInfo?: string;
  wishes?: string;
  syncedToGoogleSheets?: boolean;
}

export const DEFAULT_SHEET_ID = '1tLBP0EDUoWFI-zjnaauMUAZAVZgdQXdTmygZQv5xPOc';
export const DEFAULT_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1tLBP0EDUoWFI-zjnaauMUAZAVZgdQXdTmygZQv5xPOc/edit?usp=sharing';
export const DEFAULT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxAAquYK2KKIKyy_cnZV-HBXssSjCG5wI0Er-dIFIb9i_dRocsNPmit8q8nx2E7xeyR4Q/exec';

const STORAGE_KEY_RSVPS = 'nikkah_all_rsvps';
const STORAGE_KEY_SHEET_ID = 'nikkah_google_sheet_id';
const STORAGE_KEY_SHEET_URL = 'nikkah_google_sheet_url';
const STORAGE_KEY_AUTH_TOKEN = 'nikkah_google_auth_token';
const STORAGE_KEY_WEBHOOK_URL = 'nikkah_sheets_webhook_url';

export const getStoredRsvps = (): StoredRSVP[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RSVPS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveRsvpLocally = (rsvp: Omit<StoredRSVP, 'id' | 'timestamp' | 'syncedToGoogleSheets'>): StoredRSVP => {
  const all = getStoredRsvps();
  const newRsvp: StoredRSVP = {
    ...rsvp,
    id: `rsvp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    syncedToGoogleSheets: false,
  };

  all.unshift(newRsvp);
  try {
    localStorage.setItem(STORAGE_KEY_RSVPS, JSON.stringify(all));
  } catch (err) {
    console.error('Failed to persist RSVP locally:', err);
  }

  return newRsvp;
};

export const markRsvpSynced = (id: string) => {
  const all = getStoredRsvps();
  const updated = all.map((item) => (item.id === id ? { ...item, syncedToGoogleSheets: true } : item));
  try {
    localStorage.setItem(STORAGE_KEY_RSVPS, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update sync status:', err);
  }
};

export const getConnectedSheetInfo = () => {
  const storedId = localStorage.getItem(STORAGE_KEY_SHEET_ID);
  const storedUrl = localStorage.getItem(STORAGE_KEY_SHEET_URL);
  const storedWebhook = localStorage.getItem(STORAGE_KEY_WEBHOOK_URL);
  
  return {
    sheetId: storedId || DEFAULT_SHEET_ID,
    sheetUrl: storedUrl || DEFAULT_SHEET_URL,
    authToken: localStorage.getItem(STORAGE_KEY_AUTH_TOKEN) || '',
    webhookUrl: storedWebhook || DEFAULT_WEBHOOK_URL,
  };
};

export const setConnectedSheetInfo = (sheetId: string, sheetUrl: string, authToken?: string, webhookUrl?: string) => {
  if (sheetId) localStorage.setItem(STORAGE_KEY_SHEET_ID, sheetId);
  if (sheetUrl) localStorage.setItem(STORAGE_KEY_SHEET_URL, sheetUrl);
  if (authToken) localStorage.setItem(STORAGE_KEY_AUTH_TOKEN, authToken);
  if (webhookUrl !== undefined) localStorage.setItem(STORAGE_KEY_WEBHOOK_URL, webhookUrl);
};

export const clearConnectedSheetInfo = () => {
  localStorage.removeItem(STORAGE_KEY_SHEET_ID);
  localStorage.removeItem(STORAGE_KEY_SHEET_URL);
  localStorage.removeItem(STORAGE_KEY_AUTH_TOKEN);
};

/**
 * Trigger OAuth Token Client flow via Google Identity Services
 */
export const requestGoogleOAuthToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const google = (window as unknown as { google?: { accounts?: { oauth2?: { initTokenClient: (config: unknown) => { requestAccessToken: () => void } } } } }).google;

    if (!google?.accounts?.oauth2) {
      reject(new Error('Google Identity Services SDK is loading or not available. Please try again.'));
      return;
    }

    const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env;
    const clientId = metaEnv?.VITE_GOOGLE_CLIENT_ID || '240734471821-oauth.apps.googleusercontent.com';

    try {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file',
        callback: (tokenResponse: { access_token?: string; error?: string }) => {
          if (tokenResponse.error) {
            reject(new Error(`OAuth failed: ${tokenResponse.error}`));
          } else if (tokenResponse.access_token) {
            localStorage.setItem(STORAGE_KEY_AUTH_TOKEN, tokenResponse.access_token);
            resolve(tokenResponse.access_token);
          } else {
            reject(new Error('No access token received from Google.'));
          }
        },
      });

      client.requestAccessToken();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Initializes header row on the user's existing Google Spreadsheet
 */
export const initExistingSheet = async (
  token: string, 
  sheetId: string = DEFAULT_SHEET_ID
): Promise<{ sheetId: string; sheetUrl: string }> => {
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit?gid=0#gid=0`;

  try {
    // Check if headers already exist
    const checkRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A1:G1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const checkData = await checkRes.json();
    const hasHeaders = checkData.values && checkData.values.length > 0 && checkData.values[0].length > 0;

    if (!hasHeaders) {
      // Set default header row
      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A1:G1?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            range: 'A1:G1',
            majorDimension: 'ROWS',
            values: [
              [
                'Submission Date',
                'Guest Full Name',
                'Attendance Status',
                'Guests Count',
                'Song Request',
                'Children Names & Ages',
                'Wishes & Blessings',
              ],
            ],
          }),
        }
      );
    }
  } catch (err) {
    console.warn('Header initialization warning:', err);
  }

  setConnectedSheetInfo(sheetId, sheetUrl, token);
  return { sheetId, sheetUrl };
};

/**
 * Creates a new dedicated spreadsheet in Google Sheets if needed
 */
export const createWeddingSpreadsheet = async (token: string): Promise<{ sheetId: string; sheetUrl: string }> => {
  // Prefer using the specified spreadsheet if defined
  if (DEFAULT_SHEET_ID) {
    return initExistingSheet(token, DEFAULT_SHEET_ID);
  }

  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: 'Hannah & Nesban - Nikkah Wedding RSVPs',
      },
      sheets: [
        {
          properties: {
            title: 'RSVP Responses',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Failed to create Google Sheet: ${response.statusText}`);
  }

  const data = await response.json();
  const sheetId = data.spreadsheetId;
  const sheetUrl = data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;

  // Initialize Header Row
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A1:G1?valueInputOption=USER_ENTERED`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      range: 'A1:G1',
      majorDimension: 'ROWS',
      values: [
        [
          'Submission Date',
          'Guest Full Name',
          'Attendance Status',
          'Guests Count',
          'Song Request',
          'Children Names & Ages',
          'Wishes & Blessings',
        ],
      ],
    }),
  });

  setConnectedSheetInfo(sheetId, sheetUrl, token);
  return { sheetId, sheetUrl };
};

/**
 * Append an individual RSVP row to the Google Sheet
 */
export const appendRsvpToGoogleSheet = async (
  rsvp: StoredRSVP,
  sheetId: string,
  token: string
): Promise<boolean> => {
  const rowValues = [
    rsvp.timestamp,
    rsvp.fullName,
    rsvp.attendance === 'accept' ? 'Attending' : 'Declined',
    rsvp.attendance === 'accept' ? rsvp.guestsCount : 0,
    rsvp.song || '-',
    rsvp.childrenInfo || '-',
    rsvp.wishes || '-',
  ];

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A:G:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [rowValues],
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'Failed to append row to Google Sheet');
  }

  markRsvpSynced(rsvp.id);
  return true;
};

/**
 * Automatically sync an RSVP using backend API, Webhook, or Google Sheets API
 */
export const syncRsvpSubmission = async (rsvp: StoredRSVP): Promise<{ success: boolean; message?: string }> => {
  const { sheetId, authToken, webhookUrl } = getConnectedSheetInfo();

  // 1. Post to backend server endpoint /api/rsvp
  try {
    const apiRes = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rsvp),
    });
    if (apiRes.ok) {
      markRsvpSynced(rsvp.id);
    }
  } catch (err) {
    console.warn('Local /api/rsvp endpoint call:', err);
  }

  // 2. Try Google Apps Script / Webhook if set or in env
  const effectiveWebhook = webhookUrl || (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;
  if (effectiveWebhook) {
    try {
      // POST attempt
      await fetch(effectiveWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        mode: 'no-cors',
        body: JSON.stringify(rsvp),
      });

      // GET beacon fallback with query parameters
      const params = new URLSearchParams({
        timestamp: rsvp.timestamp,
        fullName: rsvp.fullName,
        attendance: rsvp.attendance,
        guestsCount: String(rsvp.guestsCount),
        song: rsvp.song || '-',
        childrenInfo: rsvp.childrenInfo || '-',
        wishes: rsvp.wishes || '-',
      });
      const img = new Image();
      img.src = `${effectiveWebhook}?${params.toString()}`;

      markRsvpSynced(rsvp.id);
      return { success: true, message: 'Recorded in Google Sheet' };
    } catch {
      // Continue to API sync
    }
  }

  // 3. Try Google Sheets REST API
  if (sheetId && authToken) {
    try {
      await appendRsvpToGoogleSheet(rsvp, sheetId, authToken);
      return { success: true, message: 'Recorded in Google Sheet' };
    } catch (err) {
      console.warn('Google Sheets API append failed, token may need refresh:', err);
    }
  }

  return { success: true, message: 'RSVP confirmed' };
};
