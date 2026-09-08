import React, { useState } from 'react';
import { useChallenges } from '../../context/ChallengeContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Heart, 
  Users, 
  MessageSquarePlus, 
  Share2, 
  Check, 
  Sparkles, 
  Upload, 
  MapPin, 
  X,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AlsoAffectedButton = ({ challenge, size = "md" }) => {
  const { supportChallenge } = useChallenges();
  const { currentUser } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [hasEndorsed, setHasEndorsed] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [villageName, setVillageName] = useState(currentUser?.village || "");
  const [evidenceName, setEvidenceName] = useState("");
  const [shareCopied, setShareCopied] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleConfirmEndorse = (e) => {
    e.preventDefault();
    supportChallenge(challenge.id, {
      userName: currentUser?.name || "Verified Resident",
      village: villageName || challenge.village || "Local Ward",
      note: commentText || `I am also affected by this issue in ${villageName || challenge.district} and urge swift academic-administrative intervention.`,
      evidenceFile: evidenceName || null
    }, currentUser);

    setHasEndorsed(true);
    setModalOpen(false);

    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const count = challenge.supportingCitizensCount || 1;

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {/* Main "I AM ALSO AFFECTED" Action Button */}
        <button
          onClick={handleOpenModal}
          disabled={hasEndorsed}
          className={`flex items-center gap-2 rounded-xl font-bold shadow-sm transition transform active:scale-95 ${
            hasEndorsed
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 cursor-default'
              : 'bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white shadow-rose-200'
          } ${size === 'lg' ? 'px-5 py-3 text-sm' : 'px-3.5 py-2 text-xs'}`}
          title="Support this existing challenge to consolidate community demand without duplicate reports"
        >
          {hasEndorsed ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>You & {count.toLocaleString()} Citizens Endorsed</span>
            </>
          ) : (
            <>
              <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
              <span>I AM ALSO AFFECTED</span>
              <span className="bg-rose-900/40 text-white text-[11px] px-2 py-0.5 rounded-full font-mono font-bold">
                {count.toLocaleString()}
              </span>
            </>
          )}
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition text-xs flex items-center gap-1.5"
          title="Share challenge with local community"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">{shareCopied ? 'Link Copied!' : 'Share'}</span>
        </button>
      </div>

      {/* Endorsement & Anti-Duplicate Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 relative">
            
            {/* Close */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-rose-100 text-rose-700 rounded-xl">
                <Heart className="w-6 h-6 fill-rose-600 text-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Are you also facing this problem?
                </h3>
                <p className="text-xs text-slate-500">
                  Strengthen this challenge instead of creating a duplicate report.
                </p>
              </div>
            </div>

            {/* Anti-Duplicate Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 text-xs text-blue-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong>Why support instead of creating a new report?</strong>
                <p className="text-[11px] text-blue-700 mt-0.5">
                  When multiple citizens endorse a single verified challenge, the AI Priority Algorithm boosts its priority score, accelerating government fund approval and university team deployment.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleConfirmEndorse} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Village / Ward Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={villageName}
                    onChange={(e) => setVillageName(e.target.value)}
                    placeholder={`e.g., ${challenge.village || 'Dokata Tola, Jhinkpani'}`}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Add Your Experience / Comment (Optional)
                </label>
                <textarea
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Describe how this affects you, your family, or your local school..."
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upload Additional Supporting Evidence (Optional)
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-3 text-center hover:bg-slate-50 cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    id="endorse-file-upload"
                    onChange={(e) => setEvidenceName(e.target.files?.[0]?.name || "")}
                  />
                  <label htmlFor="endorse-file-upload" className="cursor-pointer">
                    <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                    <span className="text-[11px] font-medium text-slate-600 block">
                      {evidenceName ? `Attached: ${evidenceName}` : "Click to attach photo or test report"}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Confirm "I AM ALSO AFFECTED"</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
