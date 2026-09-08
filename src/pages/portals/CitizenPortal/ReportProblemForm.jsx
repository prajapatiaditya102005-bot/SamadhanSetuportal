import React, { useState, useEffect } from 'react';
import { useChallenges } from '../../../context/ChallengeContext';
import { useAuth } from '../../../context/AuthContext';
import { 
  JHARKHAND_DISTRICTS, 
  CATEGORIES 
} from '../../../data/districtsData';
import { predictCategory, checkDuplicates, calculatePriority } from '../../../services/aiService';
import { JharkhandMap } from '../../../components/map/JharkhandMap';
import { 
  X, 
  Upload, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Image as ImageIcon,
  Video,
  Send,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReportProblemForm = ({ isOpen, onClose, onSuccess }) => {
  const { createChallenge, challenges } = useChallenges();
  const { currentUser } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Water');
  const [district, setDistrict] = useState('West Singhbhum (Chaibasa)');
  const [block, setBlock] = useState('Jhinkpani');
  const [village, setVillage] = useState('');
  const [urgency, setUrgency] = useState('High');
  const [affectedPopulation, setAffectedPopulation] = useState('500');
  const [contactNumber, setContactNumber] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [locationCoordinates, setLocationCoordinates] = useState({ lat: 22.4820, lng: 85.7420 });

  // Upload simulations
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [uploadedDocs, setUploadedDocs] = useState([]);

  // Live AI Assist state
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [duplicateAlert, setDuplicateAlert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedChallenge, setSubmittedChallenge] = useState(null);

  // Update available blocks when district changes
  const currentDistrictObj = JHARKHAND_DISTRICTS.find(d => d.name === district) || JHARKHAND_DISTRICTS[0];

  // Dynamic AI evaluation as user types
  useEffect(() => {
    if (title.length > 5 || description.length > 15) {
      const pred = predictCategory(title, description);
      const dups = checkDuplicates(title, description, district, challenges);
      const prio = calculatePriority({ title, description, urgency, affectedPopulation });

      setAiSuggestion({
        category: pred.category,
        confidence: pred.confidence,
        priority: prio.priority,
        priorityScore: prio.score
      });

      if (dups.count > 0) {
        setDuplicateAlert(dups);
      } else {
        setDuplicateAlert(null);
      }
    }
  }, [title, description, district, urgency, affectedPopulation]);

  const handleDistrictChange = (e) => {
    const newDistName = e.target.value;
    setDistrict(newDistName);
    const dObj = JHARKHAND_DISTRICTS.find(d => d.name === newDistName);
    if (dObj) {
      setBlock(dObj.blocks[0] || 'Sadar');
      setLocationCoordinates({ lat: dObj.lat, lng: dObj.lng });
    }
  };

  const handleApplyAiCategory = () => {
    if (aiSuggestion?.category) {
      setCategory(aiSuggestion.category);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newCh = createChallenge({
        title,
        description,
        category,
        district,
        block,
        village,
        urgency,
        affectedPopulation,
        contactNumber,
        email,
        locationCoordinates,
        images: uploadedPhotos.length ? uploadedPhotos : [
          "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=600&auto=format&fit=crop&q=80"
        ],
        documents: uploadedDocs.length ? uploadedDocs : ["Citizen_Grievance_Report.pdf"]
      }, currentUser);

      setSubmittedChallenge(newCh);
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      if (onSuccess) {
        onSuccess(newCh);
      }
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-jharkhand-green text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">
                Report a Societal Problem | समस्या दर्ज करें
              </h3>
              <p className="text-xs text-slate-200">
                Samadhan Setu AI Triage Network • Connect directly with Universities & Government Departments
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        {submittedChallenge ? (
          /* Success Screen */
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                Submitted Successfully
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                Your challenge has been submitted successfully.
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto mt-1">
                Our AI Triage system has analyzed your problem and routed it to the state validation queue and matching university research labs.
              </p>
            </div>

            {/* Generated Details Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-xl mx-auto text-left space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 text-xs">
                <span className="text-slate-500 font-semibold">Generated Challenge ID:</span>
                <span className="font-mono font-bold text-brand-900 bg-white px-2 py-0.5 rounded border border-slate-300">
                  {submittedChallenge.id}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 text-xs">
                <span className="text-slate-500 font-semibold">Submission Date:</span>
                <span className="font-medium text-slate-800">{submittedChallenge.submissionDate}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 text-xs">
                <span className="text-slate-500 font-semibold">Current Lifecycle Stage:</span>
                <span className="font-bold text-brand-800 bg-brand-50 px-2 py-0.5 rounded">
                  {submittedChallenge.status} (Stage 1 of 10)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-semibold">AI Matched HEI Lab:</span>
                <span className="font-bold text-purple-800">
                  {submittedChallenge.aiAnalysis?.recommendedInstitutions?.[0]?.institutionName || "BIT Mesra"} ({submittedChallenge.aiAnalysis?.recommendedInstitutions?.[0]?.matchScore || 94}% Match)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSubmittedChallenge(null);
                  onClose();
                }}
                className="bg-brand-900 hover:bg-brand-950 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition"
              >
                Go to Citizen Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Main Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
            
            {/* Live AI Duplicate Alert (If any) */}
            {duplicateAlert && (
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-3 shadow-xs">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-bold flex items-center justify-between">
                    <span>Similar Problem Already Reported Nearby ({duplicateAlert.count} Found)</span>
                    <span className="text-[10px] bg-amber-200 px-2 py-0.5 rounded-full font-mono">Anti-Duplicate System</span>
                  </div>
                  <p className="text-[11px] text-amber-800 mt-1">
                    To resolve this issue faster, you can support the existing challenge:
                  </p>
                  <div className="mt-2 space-y-1">
                    {duplicateAlert.matches.map((m, idx) => (
                      <div key={idx} className="bg-white/80 p-2 rounded-lg border border-amber-200 flex items-center justify-between">
                        <span className="font-medium text-slate-800 truncate max-w-[280px]">
                          {m.id}: {m.title}
                        </span>
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                          {m.supportingCount} Supporting Citizens
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Row 1: Title */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Problem Title / समस्या का शीर्षक <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. High Fluoride Contamination in Deep Tube-Wells in Jhinkpani"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium"
              />
            </div>

            {/* Row 2: Description */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Problem Description / समस्या का विस्तृत विवरण <span className="text-rose-600">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the root cause, when it started, who is affected (schools, elderly, farmers), and what has been tried..."
                className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700"
              />
            </div>

            {/* AI Real-time Category Helper */}
            {aiSuggestion && (
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-brand-900">
                  <Sparkles className="w-4 h-4 text-brand-600 animate-spin" />
                  <span>
                    AI Suggests Category: <strong>{aiSuggestion.category}</strong> ({aiSuggestion.confidence}% Confidence)
                  </span>
                </div>
                {category !== aiSuggestion.category && (
                  <button
                    type="button"
                    onClick={handleApplyAiCategory}
                    className="text-[11px] font-bold bg-brand-800 text-white px-3 py-1 rounded-lg hover:bg-brand-900 transition"
                  >
                    Apply Suggestion
                  </button>
                )}
              </div>
            )}

            {/* Row 3: Category & Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Category / समस्या की श्रेणी <span className="text-rose-600">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Problem Urgency / तात्कालिकता <span className="text-rose-600">*</span>
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium"
                >
                  <option value="High">High (Immediate public health / life safety hazard)</option>
                  <option value="Medium">Medium (Economic distress / seasonal infrastructure issue)</option>
                  <option value="Low">Low (General community enhancement)</option>
                </select>
              </div>
            </div>

            {/* Row 4: District, Block, Village */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  District (Jharkhand) <span className="text-rose-600">*</span>
                </label>
                <select
                  value={district}
                  onChange={handleDistrictChange}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium"
                >
                  {JHARKHAND_DISTRICTS.map(d => (
                    <option key={d.id} value={d.name}>{d.name} ({d.hindiName})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Block / प्रखण्ड <span className="text-rose-600">*</span>
                </label>
                <select
                  value={block}
                  onChange={(e) => setBlock(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium"
                >
                  {currentDistrictObj.blocks.map((b, idx) => (
                    <option key={idx} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Village / Ward / टोला <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Dokata Tola, Ward 4"
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium"
                />
              </div>
            </div>

            {/* Row 5: Map Location Picker (Leaflet) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  <span>Pin Location on Map (OpenStreetMap / Leaflet)</span>
                </label>
                <span className="text-[11px] text-slate-500 font-mono">
                  Lat: {locationCoordinates.lat}, Lng: {locationCoordinates.lng}
                </span>
              </div>
              <JharkhandMap
                isPickerMode={true}
                pickedLocation={locationCoordinates}
                onLocationPick={(coords) => setLocationCoordinates(coords)}
                height="220px"
              />
            </div>

            {/* Row 6: Population & Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Number of People Affected
                </label>
                <input
                  type="number"
                  min="1"
                  value={affectedPopulation}
                  onChange={(e) => setAffectedPopulation(e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Contact Mobile Number (Optional)
                </label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="+91 94311 XXXXX"
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Contact Email (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="citizen@example.com"
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium"
                />
              </div>
            </div>

            {/* Row 7: Upload Attachments (Photos, Videos, Docs) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              
              {/* Photo Upload */}
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 hover:bg-slate-50 text-center">
                <ImageIcon className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-700 block">Upload Photos</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  id="photo-up"
                  onChange={(e) => setUploadedPhotos(Array.from(e.target.files).map(f => URL.createObjectURL(f)))}
                />
                <label htmlFor="photo-up" className="text-[10px] text-brand-700 hover:underline cursor-pointer block mt-1">
                  {uploadedPhotos.length ? `${uploadedPhotos.length} photos selected` : "+ Add site photos"}
                </label>
              </div>

              {/* Video Upload */}
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 hover:bg-slate-50 text-center">
                <Video className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-700 block">Upload Videos</span>
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  id="video-up"
                  onChange={(e) => setUploadedVideos([e.target.files[0]?.name])}
                />
                <label htmlFor="video-up" className="text-[10px] text-brand-700 hover:underline cursor-pointer block mt-1">
                  {uploadedVideos.length ? uploadedVideos[0] : "+ Add video clip"}
                </label>
              </div>

              {/* Document Upload */}
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 hover:bg-slate-50 text-center">
                <FileText className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-700 block">Upload Documents</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="doc-up"
                  onChange={(e) => setUploadedDocs([e.target.files[0]?.name])}
                />
                <label htmlFor="doc-up" className="text-[10px] text-brand-700 hover:underline cursor-pointer block mt-1">
                  {uploadedDocs.length ? uploadedDocs[0] : "+ Add test report/petition"}
                </label>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Encrypted & Verified via Samadhan State Innovation Cell</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-jharkhand-green hover:bg-jharkhand-darkgreen rounded-xl shadow-md flex items-center gap-2 transition transform active:scale-95"
                >
                  {isSubmitting ? (
                    <span>Running AI Triage...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Problem & Run AI Triage</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
