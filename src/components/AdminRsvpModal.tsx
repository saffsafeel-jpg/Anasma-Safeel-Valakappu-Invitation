import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  FileSpreadsheet, 
  ExternalLink, 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  Users, 
  UserCheck, 
  UserX, 
  Search, 
  Code2, 
  Copy, 
  Check, 
  Send 
} from 'lucide-react';
import { 
  getStoredRsvps, 
  getConnectedSheetInfo, 
  requestGoogleOAuthToken, 
  initExistingSheet,
  appendRsvpToGoogleSheet, 
  StoredRSVP,
  setConnectedSheetInfo,
  saveRsvpLocally,
  syncRsvpSubmission,
  DEFAULT_SHEET_ID,
  DEFAULT_SHEET_URL
} from '../services/googleSheets';

interface AdminRsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminRsvpModal: React.FC<AdminRsvpModalProps> = ({ isOpen, onClose }) => {
  const [rsvps, setRsvps] = useState<StoredRSVP[]>([]);
  const [sheetInfo, setSheetInfo] = useState(getConnectedSheetInfo());
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'accept' | 'decline'>('all');
  const [customWebhook, setCustomWebhook] = useState('');
  const [showScriptHelper, setShowScriptHelper] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const refreshData = () => {
    setRsvps(getStoredRsvps());
    setSheetInfo(getConnectedSheetInfo());
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
      setCustomWebhook(getConnectedSheetInfo().webhookUrl);
    }
  }, [isOpen]);

  const handleConnectGoogleSheets = async () => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const token = await requestGoogleOAuthToken();
      const targetSheetId = sheetInfo.sheetId || DEFAULT_SHEET_ID;
      const { sheetId, sheetUrl } = await initExistingSheet(token, targetSheetId);
      
      setSheetInfo({
        sheetId,
        sheetUrl,
        authToken: token,
        webhookUrl: customWebhook,
      });

      const currentRsvps = getStoredRsvps();
      let syncCount = 0;
      for (const rsvp of currentRsvps) {
        if (!rsvp.syncedToGoogleSheets) {
          try {
            await appendRsvpToGoogleSheet(rsvp, sheetId, token);
            syncCount++;
          } catch {
            // Continue syncing others
          }
        }
      }

      refreshData();
      setStatusMessage({
        type: 'success',
        text: `Connected to Google Sheet! Synced ${syncCount} RSVP(s) directly to your spreadsheet.`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google OAuth failed';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncAll = async () => {
    if (!sheetInfo.sheetId || !sheetInfo.authToken) {
      handleConnectGoogleSheets();
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);
    try {
      const currentRsvps = getStoredRsvps();
      let syncCount = 0;
      for (const rsvp of currentRsvps) {
        if (!rsvp.syncedToGoogleSheets) {
          await appendRsvpToGoogleSheet(rsvp, sheetInfo.sheetId, sheetInfo.authToken);
          syncCount++;
        }
      }
      refreshData();
      setStatusMessage({
        type: 'success',
        text: syncCount > 0 ? `Successfully sent ${syncCount} new RSVP(s) to your Google Sheet!` : 'All RSVPs are up to date in your Google Sheet.',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sync failed';
      setStatusMessage({ type: 'error', text: `${msg}. Try reconnecting your Google account.` });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTestRsvp = async () => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const testEntry = saveRsvpLocally({
        fullName: 'Test Guest (Valakappu Ceremony Preview)',
        attendance: 'accept',
        guestsCount: 2,
        song: 'Phone: +91 98765 00000',
        childrenInfo: 'Traditional Feast',
        wishes: 'Heartfelt congratulations to Anasma & Safeel on the blessed Valakappu Ceremony!',
      });

      const syncRes = await syncRsvpSubmission(testEntry);
      refreshData();
      setStatusMessage({
        type: 'success',
        text: syncRes.success
          ? 'Test RSVP created and sent to Google Sheet!'
          : 'Test RSVP saved locally. Click "Sync" to send it.',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Test creation failed';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveWebhook = async () => {
    const trimmed = customWebhook.trim();
    setConnectedSheetInfo(sheetInfo.sheetId, sheetInfo.sheetUrl, sheetInfo.authToken, trimmed);
    try {
      await fetch('/api/config/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webhookUrl: trimmed }),
      });
    } catch (e) {
      console.warn('Could not post webhook to server:', e);
    }
    refreshData();
    setStatusMessage({
      type: 'success',
      text: 'Google Apps Script Webhook URL saved! Submissions stream live to your spreadsheet.',
    });
  };

  const handleTestWebhookLive = async () => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const trimmed = customWebhook.trim();
      const res = await fetch('/api/test-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webhookUrl: trimmed }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({
          type: 'success',
          text: 'Success! A test row was sent and recorded in your Google Sheet!',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: data.error || 'Test failed. Make sure your Apps Script is deployed as Web App (Anyone access).',
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to test webhook';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const appsScriptCode = `function doGet(e) {
  return handleRsvp(e);
}

function doPost(e) {
  return handleRsvp(e);
}

function handleRsvp(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var sheet = SpreadsheetApp.openById("${DEFAULT_SHEET_ID}").getActiveSheet();
    var data = {};
    
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }
    
    // Append RSVP row to Google Sheet
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.fullName || "Anonymous Guest",
      data.attendance === "accept" ? "Attending" : "Declined",
      data.attendance === "accept" ? (data.guestsCount || 1) : 0,
      data.song || "-",
      data.childrenInfo || "-",
      data.wishes || "-"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`;

  const copyScriptCode = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleExportCSV = () => {
    if (rsvps.length === 0) {
      setStatusMessage({ type: 'info', text: 'No RSVP data to export yet.' });
      return;
    }

    const headers = ['Date', 'Full Name', 'Attendance', 'Guests Count', 'Contact', 'Notes', 'Wishes'];
    const rows = rsvps.map((r) => [
      `"${r.timestamp}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.attendance === 'accept' ? 'Attending' : 'Declined'}"`,
      r.attendance === 'accept' ? r.guestsCount : 0,
      `"${(r.song || '').replace(/"/g, '""')}"`,
      `"${(r.childrenInfo || '').replace(/"/g, '""')}"`,
      `"${(r.wishes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Anasma_Safeel_Valakappu_RSVPs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalRsvps = rsvps.length;
  const attendingRsvps = rsvps.filter((r) => r.attendance === 'accept');
  const totalAttendingGuests = attendingRsvps.reduce((sum, r) => sum + (r.guestsCount || 1), 0);
  const declinedCount = rsvps.filter((r) => r.attendance === 'decline').length;

  const filteredRsvps = rsvps.filter((r) => {
    const matchesFilter = activeFilter === 'all' || r.attendance === activeFilter;
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.wishes && r.wishes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#070D18]/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-[#0E172E] text-[#FAF8F5] rounded-3xl border border-[#D4AF37]/40 shadow-2xl overflow-hidden z-10 flex flex-col"
          >
            {/* Modal Header */}
            <div className="bg-[#121D36] text-[#FAF8F5] px-6 py-4 flex items-center justify-between border-b border-[#D4AF37]/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0E172E] border border-[#D4AF37] flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.35)]">
                  <FileSpreadsheet className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold tracking-wide">
                    RSVP Dashboard &amp; Google Sheets
                  </h3>
                  <p className="font-serif italic text-xs text-[#D4AF37]">
                    Anasma &amp; Safeel · Valakappu Ceremony
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#18253F] hover:bg-[#203152] text-[#FAF8F5] flex items-center justify-center transition-colors"
                aria-label="Close dashboard"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
              {/* GOOGLE SHEETS LIVE INTEGRATION CARD */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#142038] border border-[#D4AF37]/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-sm font-semibold text-[#D4AF37] tracking-wide">
                      Target Google Spreadsheet
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-montserrat font-semibold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Active
                    </span>
                  </div>
                  <p className="text-xs text-[#FAF8F5]/80 font-montserrat max-w-md break-all">
                    Submissions stream directly to your Google Sheet:
                    <br />
                    <span className="font-mono text-[11px] text-[#D4AF37] font-medium">
                      1tLBP0EDUoWFI-zjnaauMUAZAVZgdQXdTmygZQv5xPOc
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <a
                    href={sheetInfo.sheetUrl || DEFAULT_SHEET_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0B1325] text-xs font-cinzel tracking-wider uppercase font-bold hover:brightness-110 shadow transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Sheet</span>
                  </a>

                  <button
                    onClick={handleSendTestRsvp}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-[#D4AF37]/40 bg-[#0E1626] text-[#FAF8F5] text-xs font-montserrat hover:bg-[#18233C] transition-colors"
                    title="Send a sample RSVP to verify sheet entry"
                  >
                    <Send className="w-3 h-3 text-[#D4AF37]" />
                    <span>Test Row</span>
                  </button>
                </div>
              </div>

              {/* Status Banner */}
              {statusMessage && (
                <div
                  className={`p-3 rounded-xl text-xs font-montserrat flex items-center justify-between border ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                      : statusMessage.type === 'error'
                      ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                      : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                  }`}
                >
                  <span>{statusMessage.text}</span>
                  <button onClick={() => setStatusMessage(null)} className="ml-2 text-current opacity-70 hover:opacity-100">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* STATS METRICS GRID */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#142038] border border-[#D4AF37]/25 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1 text-[#D4AF37] mb-1">
                    <Users className="w-4 h-4" />
                    <span className="font-cinzel text-xs uppercase tracking-wider text-[#FAF8F5]/80">Total RSVPs</span>
                  </div>
                  <p className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FAF8F5] gold-gradient-text">{totalRsvps}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#142038] border border-[#D4AF37]/40 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1 text-emerald-400 mb-1">
                    <UserCheck className="w-4 h-4" />
                    <span className="font-cinzel text-xs uppercase tracking-wider text-[#FAF8F5]/80">Attending</span>
                  </div>
                  <p className="font-cinzel text-2xl sm:text-3xl font-bold text-emerald-400">{totalAttendingGuests}</p>
                  <p className="text-[10px] text-[#FAF8F5]/60 font-montserrat">({attendingRsvps.length} parties)</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#142038] border border-[#D4AF37]/25 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1 text-rose-400 mb-1">
                    <UserX className="w-4 h-4" />
                    <span className="font-cinzel text-xs uppercase tracking-wider text-[#FAF8F5]/80">Declined</span>
                  </div>
                  <p className="font-cinzel text-2xl sm:text-3xl font-bold text-rose-400">{declinedCount}</p>
                </div>
              </div>

              {/* SEARCH & FILTERS BAR */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-[#D4AF37] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search guest name or wishes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#D4AF37]/30 bg-[#121B2F] text-xs text-[#FAF8F5] placeholder:text-[#FAF8F5]/40 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="flex items-center gap-1 bg-[#121B2F] p-1 rounded-xl border border-[#D4AF37]/20 text-xs">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-3 py-1 rounded-lg font-cinzel transition-all ${
                      activeFilter === 'all' ? 'bg-[#D4AF37] text-[#0B1325] font-bold shadow-sm' : 'text-[#FAF8F5]/70 hover:bg-white/10'
                    }`}
                  >
                    All ({totalRsvps})
                  </button>
                  <button
                    onClick={() => setActiveFilter('accept')}
                    className={`px-3 py-1 rounded-lg font-cinzel transition-all ${
                      activeFilter === 'accept' ? 'bg-[#D4AF37] text-[#0B1325] font-bold shadow-sm' : 'text-[#FAF8F5]/70 hover:bg-white/10'
                    }`}
                  >
                    Attending ({attendingRsvps.length})
                  </button>
                  <button
                    onClick={() => setActiveFilter('decline')}
                    className={`px-3 py-1 rounded-lg font-cinzel transition-all ${
                      activeFilter === 'decline' ? 'bg-[#D4AF37] text-[#0B1325] font-bold shadow-sm' : 'text-[#FAF8F5]/70 hover:bg-white/10'
                    }`}
                  >
                    Declined ({declinedCount})
                  </button>
                </div>

                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl border border-[#D4AF37] bg-[#121B2F] text-[#D4AF37] text-xs font-cinzel hover:bg-[#18233C] transition-colors"
                  title="Download CSV spreadsheet"
                >
                  <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>CSV</span>
                </button>
              </div>

              {/* SUBMISSIONS TABLE */}
              <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#121B2F] overflow-hidden shadow-sm">
                <div className="max-h-[260px] overflow-y-auto">
                  {filteredRsvps.length === 0 ? (
                    <div className="py-10 text-center text-[#FAF8F5]/60 space-y-2">
                      <FileSpreadsheet className="w-8 h-8 text-[#D4AF37]/50 mx-auto" />
                      <p className="font-cinzel text-sm">No RSVP submissions yet.</p>
                      <p className="text-xs font-montserrat">Guest RSVPs submitted through the form will appear here and in your Google Sheet.</p>
                    </div>
                  ) : (
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#18253F] text-[#D4AF37] font-cinzel uppercase tracking-wider sticky top-0 border-b border-[#D4AF37]/30">
                        <tr>
                          <th className="py-2.5 px-3 font-semibold">Guest Name</th>
                          <th className="py-2.5 px-3 font-semibold">Status</th>
                          <th className="py-2.5 px-3 font-semibold">Guests</th>
                          <th className="py-2.5 px-3 font-semibold">Blessings &amp; Wishes</th>
                          <th className="py-2.5 px-3 font-semibold">Submitted</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D4AF37]/20 font-montserrat">
                        {filteredRsvps.map((rsvp) => (
                          <tr key={rsvp.id} className="hover:bg-[#142038]/70 transition-colors">
                            <td className="py-2.5 px-3 font-medium text-[#FAF8F5]">
                              {rsvp.fullName}
                            </td>
                            <td className="py-2.5 px-3">
                              {rsvp.attendance === 'accept' ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                                  Attending
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-rose-950 text-rose-300 border border-rose-500/40">
                                  Declined
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-[#FAF8F5] font-cinzel">
                              {rsvp.attendance === 'accept' ? `${rsvp.guestsCount} Guest(s)` : '-'}
                            </td>
                            <td className="py-2.5 px-3 text-[#FAF8F5]/85 font-serif italic max-w-xs truncate">
                              {rsvp.wishes || '-'}
                            </td>
                            <td className="py-2.5 px-3 text-[#FAF8F5]/50 text-[10px] whitespace-nowrap">
                              {rsvp.timestamp}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* OPTIONAL APPS SCRIPT WEBHOOK EXPANDER */}
              <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#121B2F]/60 overflow-hidden text-xs">
                <button
                  onClick={() => setShowScriptHelper(!showScriptHelper)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-cinzel text-[#FAF8F5] hover:bg-[#18253F] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-medium">Active Google Apps Script Webhook URL</span>
                  </div>
                  <span className="text-[11px] text-[#D4AF37] uppercase tracking-wider">
                    {showScriptHelper ? 'Hide Config ▲' : 'View Config ▼'}
                  </span>
                </button>

                {showScriptHelper && (
                  <div className="p-4 pt-2 border-t border-[#D4AF37]/20 space-y-3 font-montserrat text-[#FAF8F5]/80">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                      <input
                        type="url"
                        placeholder="https://script.google.com/macros/s/.../exec"
                        value={customWebhook}
                        onChange={(e) => setCustomWebhook(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border border-[#D4AF37]/30 bg-[#0E1626] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#D4AF37]"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleSaveWebhook}
                          disabled={isLoading || !customWebhook.trim()}
                          className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-[#D4AF37] text-[#0B1325] font-cinzel uppercase tracking-wider text-[11px] font-bold hover:brightness-110 transition-colors disabled:opacity-50"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleTestWebhookLive}
                          disabled={isLoading || !customWebhook.trim()}
                          className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl border border-[#D4AF37] bg-[#0E1626] text-[#FAF8F5] font-cinzel uppercase tracking-wider text-[11px] hover:bg-[#18233C] transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                          title="Send a live test row to your Google Sheet"
                        >
                          <Send className="w-3 h-3 text-[#D4AF37]" />
                          <span>Test Live</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#121D36] px-6 py-3 border-t border-[#D4AF37]/30 flex items-center justify-between text-xs text-[#FAF8F5]/70">
              <span className="font-serif italic text-[#D4AF37]">
                Google Sheet ID: 1tLBP0EDUoWFI-zjnaauMUAZAVZgdQXdTmygZQv5xPOc
              </span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0B1325] font-cinzel uppercase tracking-wider text-[11px] font-bold hover:brightness-110 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
