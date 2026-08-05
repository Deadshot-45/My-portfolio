"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import initialSiteData from "@/data/site-data.json";

export default function AdminCMS() {
  // Authentication Passcode Gate
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);

  // Content States
  const [siteData, setSiteData] = useState(initialSiteData);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState(80);
  const [activeSubTab, setActiveSubTab] = useState<
    | "profile"
    | "quest"
    | "experiences"
    | "education"
    | "achievements"
    | "projects"
    | "skills"
  >("profile");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

  const soundOn = true;

  // Load latest data on mount
  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setSiteData(data);
        }
      })
      .catch(() => {});
  }, []);

  // Web Audio synth effect
  const playBeep = (freq = 800, duration = 0.05, type = "sine") => {
    if (!soundOn || typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type as OscillatorType;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.012, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.00001,
        ctx.currentTime + duration,
      );
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext blocked
    }
  };

  // Auth Handler
  const handleDecrypt = (e: React.FormEvent) => {
    e.preventDefault();
    // Passcode gate check
    if (passcode === process.env.NEXT_PUBLIC_ADMIN_PASSCODE) {
      playBeep(1200, 0.15, "sine");
      setTimeout(() => {
        playBeep(1500, 0.2, "sine");
      }, 150);
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      playBeep(250, 0.3, "sawtooth");
      setAuthError(true);
      setPasscode("");
    }
  };

  const handleSubTabChange = (tab: typeof activeSubTab) => {
    playBeep(900, 0.08, "triangle");
    setActiveSubTab(tab);
  };

  // Profile Change Handler
  const handleProfileChange = (
    key: keyof typeof siteData.profile,
    value: string | number,
  ) => {
    setSiteData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [key]: value,
      },
    }));
  };

  // Quest Change Handler
  const handleQuestChange = (
    key: keyof typeof siteData.quest,
    value: string | number,
  ) => {
    setSiteData((prev) => ({
      ...prev,
      quest: {
        ...prev.quest,
        [key]: value,
      },
    }));
  };

  // File Upload Handler (Resume, Avatar, Banner)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "resume" | "avatar" | "banner") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadStatus("uploading");
    playBeep(950, 0.1, "triangle");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data && data.success) {
        setUploadStatus("success");
        playBeep(1400, 0.15);
        setSiteData((prev) => {
          const profile = { ...prev.profile };
          if (type === "avatar") {
            profile.avatarUrl = data.path;
          } else if (type === "banner") {
            profile.bannerUrl = data.path;
          } else {
            profile.resumeUrl = data.path;
          }
          profile.lastUpdated = Date.now();
          return { ...prev, profile };
        });
        setTimeout(() => setUploadStatus("idle"), 3000);
      } else {
        setUploadStatus("error");
        playBeep(350, 0.25, "sawtooth");
      }
    } catch {
      setUploadStatus("error");
      playBeep(350, 0.25, "sawtooth");
    }
  };

  // Experience Handlers (Add, Edit, Delete, Bullet Details)
  const addExperience = () => {
    playBeep(1000, 0.08);
    const newExp = {
      role: "MERN Stack Developer (Intern)",
      company: "Company Name",
      type: "Internship",
      period: "Period Dates",
      location: "Bhopal, India",
      details: [
        "Spearheaded performance optimization strategies...",
        "Built responsive component libraries...",
      ],
      isCurrent: false,
    };
    setSiteData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExp],
    }));
  };

  const handleExperienceChange = (
    index: number,
    key: string,
    value: string | number | boolean | string[],
  ) => {
    setSiteData((prev) => {
      const experiences = [...prev.experiences];
      experiences[index] = { ...experiences[index], [key]: value };
      return { ...prev, experiences };
    });
  };

  const deleteExperience = (idx: number) => {
    playBeep(450, 0.15);
    setSiteData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== idx),
    }));
  };

  const handleExpDetailChange = (
    expIdx: number,
    detailIdx: number,
    value: string,
  ) => {
    setSiteData((prev) => {
      const experiences = [...prev.experiences];
      const details = [...experiences[expIdx].details];
      details[detailIdx] = value;
      experiences[expIdx] = { ...experiences[expIdx], details };
      return { ...prev, experiences };
    });
  };

  const addExpDetail = (expIdx: number) => {
    playBeep(850, 0.05);
    setSiteData((prev) => {
      const experiences = [...prev.experiences];
      const details = [
        ...experiences[expIdx].details,
        "New contribution detail...",
      ];
      experiences[expIdx] = { ...experiences[expIdx], details };
      return { ...prev, experiences };
    });
  };

  const removeExpDetail = (expIdx: number, detailIdx: number) => {
    playBeep(450, 0.08);
    setSiteData((prev) => {
      const experiences = [...prev.experiences];
      const details = experiences[expIdx].details.filter(
        (_, i) => i !== detailIdx,
      );
      experiences[expIdx] = { ...experiences[expIdx], details };
      return { ...prev, experiences };
    });
  };

  // Education Handlers (Add, Edit, Delete)
  const addEducation = () => {
    playBeep(1000, 0.08);
    const newEdu = {
      institution: "University/School Name",
      degree: "Degree Level",
      field: "Field of Study",
      period: "Period Dates",
      description: "Academics description details...",
      icon: "GraduationCap",
    };
    setSiteData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const handleEducationChange = (
    index: number,
    key: string,
    value: string | number | boolean,
  ) => {
    setSiteData((prev) => {
      const education = [...prev.education];
      education[index] = { ...education[index], [key]: value };
      return { ...prev, education };
    });
  };

  const deleteEducation = (idx: number) => {
    playBeep(450, 0.15);
    setSiteData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx),
    }));
  };

  // Certifications Handlers (Add, Edit, Delete)
  const addCertification = () => {
    playBeep(1000, 0.08);
    const newCert = {
      institution: "Training Center",
      degree: "Certificate Title",
      field: "Intensive Program",
      period: "Year Completed",
      description: "Acquired full-stack MERN certification...",
      icon: "Award",
    };
    setSiteData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
    }));
  };

  const handleCertificationChange = (
    index: number,
    key: string,
    value: string | number | boolean,
  ) => {
    setSiteData((prev) => {
      const certifications = [...prev.certifications];
      certifications[index] = { ...certifications[index], [key]: value };
      return { ...prev, certifications };
    });
  };

  const deleteCertification = (idx: number) => {
    playBeep(450, 0.15);
    setSiteData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== idx),
    }));
  };

  // Achievements Handlers (Add, Edit, Delete)
  const addAchievement = () => {
    playBeep(1000, 0.08);
    const newAch = {
      title: "New Milestones Achievement",
      category: "EPIC",
      description: "Description statement...",
      status: "COMPLETED",
    };
    setSiteData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, newAch],
    }));
  };

  const handleAchievementChange = (
    index: number,
    key: string,
    value: string | number | boolean,
  ) => {
    setSiteData((prev) => {
      const achievements = [...prev.achievements];
      achievements[index] = { ...achievements[index], [key]: value };
      return { ...prev, achievements };
    });
  };

  const deleteAchievement = (idx: number) => {
    playBeep(450, 0.15);
    setSiteData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== idx),
    }));
  };

  // Projects Handlers (Add, Edit, Delete)
  const addProject = () => {
    playBeep(1000, 0.08);
    const newProj = {
      title: "New Project Module",
      category: "B2B SaaS / MERN Stack",
      description: "Built scalable layouts and database integrations...",
      link: "https://",
    };
    setSiteData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProj],
    }));
  };

  const handleProjectChange = (
    index: number,
    key: string,
    value: string | number | boolean,
  ) => {
    setSiteData((prev) => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], [key]: value };
      return { ...prev, projects };
    });
  };

  const deleteProject = (idx: number) => {
    playBeep(450, 0.15);
    setSiteData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== idx),
    }));
  };

  // Skills Handlers
  const handleSkillChange = (index: number, value: number) => {
    setSiteData((prev) => {
      const skills = [...prev.skills];
      skills[index] = { ...skills[index], level: value };
      return { ...prev, skills };
    });
  };

  const addSkill = () => {
    if (!newSkillName.trim()) return;
    playBeep(1000, 0.08);
    setSiteData((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: newSkillName.trim(), level: newSkillLevel }],
    }));
    setNewSkillName("");
    setNewSkillLevel(80);
  };

  const deleteSkill = (idx: number) => {
    playBeep(450, 0.15);
    setSiteData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== idx),
    }));
  };

  // Save triggers
  const handleSaveConfig = async () => {
    playBeep(1200, 0.1, "sine");
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteData),
      });
      const data = await res.json();
      if (data && data.success) {
        setSaveStatus("success");
        playBeep(1500, 0.2, "sine");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
        playBeep(350, 0.25, "sawtooth");
      }
    } catch {
      setSaveStatus("error");
      playBeep(350, 0.25, "sawtooth");
    }
  };

  // Unauthenticated Keypad Access Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#030102] text-slate-100 flex flex-col items-center justify-center font-mono relative">
        <div className="hud-grid absolute inset-0 opacity-40 pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_40%,rgba(3,1,2,0.95)_100%) pointer-events-none -z-10" />

        <div className="w-full max-w-sm p-1 rounded-2xl bg-rose-950/15 border border-rose-900/30 relative">
          <div className="hud-notch-top-left" />
          <div className="hud-notch-top-right" />
          <div className="hud-notch-bottom-left" />
          <div className="hud-notch-bottom-right" />

          <form
            onSubmit={handleDecrypt}
            className="bg-black/60 rounded-[calc(1rem)] p-6 space-y-6"
          >
            <div className="text-center space-y-2">
              <span className="text-[8px] font-display font-black tracking-widest text-rose-500 bg-rose-950/30 border border-rose-900/35 px-2.5 py-1 rounded-sm uppercase">
                COGNITIVE PROTECTION ACTIVE
              </span>
              <h2 className="text-md font-display font-black text-white uppercase tracking-wider pt-2">
                DECRYPTION TERMINAL
              </h2>
              <p className="text-[9px] text-slate-500 uppercase leading-relaxed pt-1">
                Enter your access passcode key (e.g. deadshot) to uplink
                credentials.
              </p>
            </div>

            <div className="space-y-1.5">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="ACCESS PASSKEY"
                className="w-full bg-[#0a0305]/80 border border-rose-950/45 rounded-xl px-4 py-3 text-xs text-white text-center tracking-[0.2em] placeholder-slate-800 focus:outline-none focus:border-rose-500/60"
              />
              {authError && (
                <p className="text-[8px] text-rose-500 font-bold text-center uppercase tracking-widest pt-1">
                  ⚠ ACCESS KEY INVALIDATED. DECRYPTION FAILURE.
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-1">
              <button
                type="submit"
                className="flex-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/35 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-md active:scale-98"
              >
                DECRYPT ENTRY
              </button>
              <Link
                href="/"
                className="px-5 bg-slate-950 border border-slate-900 text-slate-500 hover:text-slate-300 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all text-center flex items-center justify-center"
              >
                CANCEL
              </Link>
            </div>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen md:h-screen md:overflow-hidden bg-[#030102] text-slate-100 flex flex-col font-mono relative selection:bg-rose-500/30 selection:text-rose-200">
      <div className="hud-grid absolute inset-0 opacity-40 pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_40%,rgba(3,1,2,0.95)_100%) pointer-events-none -z-10" />

      {/* Header telemetry */}
      <header className="w-full border-b border-rose-950/40 bg-black/60 px-6 py-3 flex items-center justify-between text-[10px] tracking-[0.2em] font-semibold text-rose-500/80 z-20 shrink-0">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 glow-text-red">
            ⚙ COGNITIVE INTERFACE EDITOR
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="hover:text-white transition-colors glow-text-red"
          >
            ◀ COCKPIT TERMINAL
          </Link>
        </div>
      </header>

      {/* Admin Panel Console Layout */}
      <div className="flex-1 w-full flex flex-col md:flex-row overflow-hidden relative z-10">
        {/* Left Side: CMS Form Navigation Drawer */}
        <aside className="w-full md:w-[250px] border-r border-rose-950/30 bg-black/40 p-6 flex flex-col justify-between shrink-0 gap-6">
          <div className="space-y-4">
            <span className="text-[8px] font-display font-black tracking-widest text-rose-400 bg-rose-950/30 border border-rose-900/30 px-2 py-0.5 rounded-sm">
              CMS MODULES
            </span>

            <div className="flex flex-col gap-2">
              {(
                [
                  "profile",
                  "quest",
                  "experiences",
                  "education",
                  "achievements",
                  "projects",
                  "skills",
                ] as const
              ).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleSubTabChange(tab)}
                  className={`text-left text-[10px] font-display font-black tracking-widest uppercase px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                    activeSubTab === tab
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.15)]"
                      : "text-slate-500 hover:text-slate-300 border-transparent"
                  }`}
                >
                  📡 {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {/* Status alerts */}
            {saveStatus === "saving" && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-center text-[9px] text-amber-400 font-bold uppercase tracking-widest animate-pulse">
                UPLINKING CONFIG...
              </div>
            )}
            {saveStatus === "success" && (
              <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl text-center text-[9px] text-teal-400 font-bold uppercase tracking-widest">
                UPLINK SECURED!
              </div>
            )}
            {saveStatus === "error" && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-center text-[9px] text-rose-400 font-bold uppercase tracking-widest">
                UPLINK FAILURE!
              </div>
            )}

            <button
              onClick={handleSaveConfig}
              disabled={saveStatus === "saving"}
              className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/40 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all shadow-md active:scale-98"
            >
              SAVE UPLINK [ENTER]
            </button>
          </div>
        </aside>

        {/* Center Panel Scrollable Edit Form */}
        <section className="flex-1 min-h-[50vh] md:h-full overflow-y-auto bg-black/20 p-6 md:p-8 flex flex-col justify-between relative custom-scrollbar">
          <div className="flex-1 w-full max-w-3xl mx-auto py-6">
            {/* PROFILE EDIT */}
            {activeSubTab === "profile" && (
              <div className="space-y-6">
                <div className="border-b border-rose-950/20 pb-4">
                  <h3 className="text-lg font-display font-black text-white tracking-widest">
                    AVATAR PROFILE PARAMETERS
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-[9px] font-bold text-rose-500">
                      DEVELOPER NAME
                    </label>
                    <input
                      type="text"
                      value={siteData.profile.name}
                      onChange={(e) =>
                        handleProfileChange("name", e.target.value)
                      }
                      className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-rose-500">
                      OCCUPATION
                    </label>
                    <input
                      type="text"
                      value={siteData.profile.occupation}
                      onChange={(e) =>
                        handleProfileChange("occupation", e.target.value)
                      }
                      className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-rose-500">
                      CORPORATION
                    </label>
                    <input
                      type="text"
                      value={siteData.profile.corporation}
                      onChange={(e) =>
                        handleProfileChange("corporation", e.target.value)
                      }
                      className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-rose-500">
                      LEVEL XP
                    </label>
                    <input
                      type="number"
                      value={siteData.profile.level}
                      onChange={(e) =>
                        handleProfileChange(
                          "level",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-rose-500">
                      COINS AWARDED
                    </label>
                    <input
                      type="number"
                      value={siteData.profile.coins}
                      onChange={(e) =>
                        handleProfileChange(
                          "coins",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500/50"
                    />
                  </div>

                  <div className="space-y-1.5 col-span-2">
                    <label className="text-[9px] font-bold text-rose-500">
                      AVAILABILITY
                    </label>
                    <input
                      type="text"
                      value={siteData.profile.availability}
                      onChange={(e) =>
                        handleProfileChange("availability", e.target.value)
                      }
                      className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500/50"
                    />
                  </div>

                  <div className="space-y-1.5 col-span-2">
                    <label className="text-[9px] font-bold text-rose-500">
                      MOTTO SENTENCE
                    </label>
                    <textarea
                      rows={2}
                      value={siteData.profile.motto}
                      onChange={(e) =>
                        handleProfileChange("motto", e.target.value)
                      }
                      className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500/50 resize-none"
                    />
                  </div>

                  {/* Resume Upload Module */}
                  <div className="space-y-3 col-span-2 pt-4 border-t border-rose-950/20">
                    <label className="text-[9px] font-bold text-rose-500 uppercase">
                      UPLINK NEW RESUME PDF FILE
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e, "resume")}
                        className="text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border file:border-rose-500/30 file:text-[10px] file:font-black file:uppercase file:bg-rose-500/10 file:text-rose-400 file:cursor-pointer hover:file:bg-rose-500/20 file:transition-all"
                      />
                      {uploadStatus === "uploading" && (
                        <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider animate-pulse">UPLOADING...</span>
                      )}
                      {uploadStatus === "success" && (
                        <span className="text-[9px] text-teal-400 font-bold uppercase tracking-wider">RESUME UPLINKED!</span>
                      )}
                      {uploadStatus === "error" && (
                        <span className="text-[9px] text-rose-400 font-bold uppercase tracking-wider">UPLOAD FAILURE!</span>
                      )}
                    </div>
                  </div>

                  {/* Profile Avatar Upload Module */}
                  <div className="space-y-3 col-span-2 pt-4 border-t border-rose-950/20">
                    <label className="text-[9px] font-bold text-rose-500 uppercase">
                      UPLINK PROFILE AVATAR IMAGE (.WEBP, .PNG, .JPG)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "avatar")}
                        className="text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border file:border-rose-500/30 file:text-[10px] file:font-black file:uppercase file:bg-rose-500/10 file:text-rose-400 file:cursor-pointer hover:file:bg-rose-500/20 file:transition-all"
                      />
                      {uploadStatus === "uploading" && (
                        <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider animate-pulse">UPLOADING...</span>
                      )}
                      {uploadStatus === "success" && (
                        <span className="text-[9px] text-teal-400 font-bold uppercase tracking-wider">AVATAR UPLINKED!</span>
                      )}
                      {uploadStatus === "error" && (
                        <span className="text-[9px] text-rose-400 font-bold uppercase tracking-wider">UPLOAD FAILURE!</span>
                      )}
                    </div>
                  </div>

                  {/* Hero Banner Upload Module */}
                  <div className="space-y-3 col-span-2 pt-4 border-t border-rose-950/20">
                    <label className="text-[9px] font-bold text-rose-500 uppercase">
                      UPLINK HERO HOLOGRAM BANNER (.WEBP, .PNG, .JPG)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "banner")}
                        className="text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border file:border-rose-500/30 file:text-[10px] file:font-black file:uppercase file:bg-rose-500/10 file:text-rose-400 file:cursor-pointer hover:file:bg-rose-500/20 file:transition-all"
                      />
                      {uploadStatus === "uploading" && (
                        <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider animate-pulse">UPLOADING...</span>
                      )}
                      {uploadStatus === "success" && (
                        <span className="text-[9px] text-teal-400 font-bold uppercase tracking-wider">BANNER UPLINKED!</span>
                      )}
                      {uploadStatus === "error" && (
                        <span className="text-[9px] text-rose-400 font-bold uppercase tracking-wider">UPLOAD FAILURE!</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* QUEST EDIT */}
            {activeSubTab === "quest" && (
              <div className="space-y-6">
                <div className="border-b border-rose-950/20 pb-4">
                  <h3 className="text-lg font-display font-black text-white tracking-widest">
                    ACTIVE HUD QUEST MODULES
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-rose-500">
                      QUEST NAME
                    </label>
                    <input
                      type="text"
                      value={siteData.quest.questName}
                      onChange={(e) =>
                        handleQuestChange("questName", e.target.value)
                      }
                      className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-rose-500">
                      GOAL DETAILS
                    </label>
                    <textarea
                      rows={3}
                      value={siteData.quest.goal}
                      onChange={(e) =>
                        handleQuestChange("goal", e.target.value)
                      }
                      className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500/50 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-rose-500">
                        XP REWARD
                      </label>
                      <input
                        type="number"
                        value={siteData.quest.xpReward}
                        onChange={(e) =>
                          handleQuestChange(
                            "xpReward",
                            parseInt(e.target.value) || 0,
                          )
                        }
                        className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-rose-500">
                        COINS REWARD
                      </label>
                      <input
                        type="number"
                        value={siteData.quest.coinsReward}
                        onChange={(e) =>
                          handleQuestChange(
                            "coinsReward",
                            parseInt(e.target.value) || 0,
                          )
                        }
                        className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500/50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EXPERIENCES EDIT */}
            {activeSubTab === "experiences" && (
              <div className="space-y-6">
                <div className="border-b border-rose-950/20 pb-4 flex justify-between items-center">
                  <h3 className="text-lg font-display font-black text-white tracking-widest">
                    MISSION LOG WORK LOGS
                  </h3>
                  <button
                    type="button"
                    onClick={addExperience}
                    className="text-[9px] bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider"
                  >
                    + ADD DEPLOYMENT
                  </button>
                </div>

                <div className="space-y-8">
                  {siteData.experiences.map((exp, expIdx) => (
                    <div
                      key={expIdx}
                      className="bg-slate-950/40 p-5 rounded-2xl border border-rose-900/10 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-rose-500">
                          DEPLOYMENT NODE #{expIdx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteExperience(expIdx)}
                          className="text-[9px] bg-rose-950/30 hover:bg-rose-900/20 border border-rose-900/30 px-2.5 py-1 rounded-md text-rose-400 hover:text-white"
                        >
                          ✕ DELETE NODE
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-rose-500">
                            ROLE TITLE
                          </label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) =>
                              handleExperienceChange(
                                expIdx,
                                "role",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-rose-500">
                            COMPANY
                          </label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) =>
                              handleExperienceChange(
                                expIdx,
                                "company",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-rose-500">
                            TYPE (e.g. Intern)
                          </label>
                          <input
                            type="text"
                            value={exp.type}
                            onChange={(e) =>
                              handleExperienceChange(
                                expIdx,
                                "type",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-rose-500">
                            PERIOD
                          </label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) =>
                              handleExperienceChange(
                                expIdx,
                                "period",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[9px] font-bold text-rose-500">
                            LOCATION
                          </label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) =>
                              handleExperienceChange(
                                expIdx,
                                "location",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <label className="text-[9px] font-bold text-rose-500">
                            DEPLOYMENT CONTRIBUTION DETAILS
                          </label>
                          <button
                            type="button"
                            onClick={() => addExpDetail(expIdx)}
                            className="text-[8px] bg-rose-950/30 border border-rose-900/35 px-2 py-0.5 rounded text-rose-400 hover:text-white"
                          >
                            + ADD DETAIL
                          </button>
                        </div>

                        <div className="space-y-2">
                          {exp.details.map((detail, detIdx) => (
                            <div
                              key={detIdx}
                              className="flex gap-2 items-center"
                            >
                              <textarea
                                rows={2}
                                value={detail}
                                onChange={(e) =>
                                  handleExpDetailChange(
                                    expIdx,
                                    detIdx,
                                    e.target.value,
                                  )
                                }
                                className="flex-1 bg-[#0a0305] border border-rose-950/50 rounded-xl px-3 py-1.5 text-xs text-white resize-none"
                              />
                              <button
                                type="button"
                                onClick={() => removeExpDetail(expIdx, detIdx)}
                                className="text-[12px] text-rose-600 hover:text-rose-400 px-2.5"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EDUCATION & CERTIFICATIONS EDIT */}
            {activeSubTab === "education" && (
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="border-b border-rose-950/20 pb-4 flex justify-between items-center">
                    <h3 className="text-lg font-display font-black text-white tracking-widest font-bold">
                      ACADEMIC TIMELINE DATA
                    </h3>
                    <button
                      type="button"
                      onClick={addEducation}
                      className="text-[9px] bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider"
                    >
                      + ADD ACADEMIC NODE
                    </button>
                  </div>

                  {siteData.education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/40 p-5 rounded-2xl border border-rose-900/10 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-rose-500">
                          ACADEMIC NODE #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteEducation(idx)}
                          className="text-[9px] bg-rose-950/30 hover:bg-rose-900/20 border border-rose-900/30 px-2.5 py-1 rounded-md text-rose-400 hover:text-white"
                        >
                          ✕ DELETE NODE
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[9px] font-bold text-rose-500">
                            INSTITUTION
                          </label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) =>
                              handleEducationChange(
                                idx,
                                "institution",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-rose-500">
                            DEGREE / AWARD
                          </label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) =>
                              handleEducationChange(
                                idx,
                                "degree",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-rose-500">
                            FIELD OF STUDY
                          </label>
                          <input
                            type="text"
                            value={edu.field}
                            onChange={(e) =>
                              handleEducationChange(
                                idx,
                                "field",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-rose-500">
                            PERIOD
                          </label>
                          <input
                            type="text"
                            value={edu.period}
                            onChange={(e) =>
                              handleEducationChange(
                                idx,
                                "period",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-rose-500">
                            ICON CODE (GraduationCap / BookOpen)
                          </label>
                          <input
                            type="text"
                            value={edu.icon}
                            onChange={(e) =>
                              handleEducationChange(idx, "icon", e.target.value)
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[9px] font-bold text-rose-500">
                            DESCRIPTION SUMMARY
                          </label>
                          <textarea
                            rows={2}
                            value={edu.description}
                            onChange={(e) =>
                              handleEducationChange(
                                idx,
                                "description",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 pt-4 border-t border-rose-950/20">
                  <div className="border-b border-rose-950/20 pb-4 flex justify-between items-center">
                    <h3 className="text-lg font-display font-black text-white tracking-widest font-bold">
                      PROFESSIONAL CERTIFICATIONS
                    </h3>
                    <button
                      type="button"
                      onClick={addCertification}
                      className="text-[9px] bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider"
                    >
                      + ADD CERTIFICATION NODE
                    </button>
                  </div>

                  {siteData.certifications.map((edu, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/40 p-5 rounded-2xl border border-rose-900/10 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-rose-500">
                          CERTIFICATION NODE #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteCertification(idx)}
                          className="text-[9px] bg-rose-950/30 hover:bg-rose-900/20 border border-rose-900/30 px-2.5 py-1 rounded-md text-rose-400 hover:text-white"
                        >
                          ✕ DELETE NODE
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[9px] font-bold text-rose-500">
                            INSTITUTION
                          </label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) =>
                              handleCertificationChange(
                                idx,
                                "institution",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-rose-500">
                            DEGREE / AWARD
                          </label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) =>
                              handleCertificationChange(
                                idx,
                                "degree",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-rose-500">
                            FIELD OF STUDY
                          </label>
                          <input
                            type="text"
                            value={edu.field}
                            onChange={(e) =>
                              handleCertificationChange(
                                idx,
                                "field",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-rose-500">
                            PERIOD
                          </label>
                          <input
                            type="text"
                            value={edu.period}
                            onChange={(e) =>
                              handleCertificationChange(
                                idx,
                                "period",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-rose-500">
                            ICON CODE (Award)
                          </label>
                          <input
                            type="text"
                            value={edu.icon}
                            onChange={(e) =>
                              handleCertificationChange(
                                idx,
                                "icon",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[9px] font-bold text-rose-500">
                            DESCRIPTION SUMMARY
                          </label>
                          <textarea
                            rows={2}
                            value={edu.description}
                            onChange={(e) =>
                              handleCertificationChange(
                                idx,
                                "description",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACHIEVEMENTS EDIT */}
            {activeSubTab === "achievements" && (
              <div className="space-y-6">
                <div className="border-b border-rose-950/20 pb-4 flex justify-between items-center">
                  <h3 className="text-lg font-display font-black text-white tracking-widest font-bold">
                    LEGENDARY & EPIC ACHIEVEMENTS
                  </h3>
                  <button
                    type="button"
                    onClick={addAchievement}
                    className="text-[9px] bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider"
                  >
                    + ADD ACHIEVEMENT CARD
                  </button>
                </div>

                <div className="space-y-6">
                  {siteData.achievements.map((ach, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/40 p-5 rounded-2xl border border-rose-900/10 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-rose-500">
                          ACHIEVEMENT CARD #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteAchievement(idx)}
                          className="text-[9px] bg-rose-950/30 hover:bg-rose-900/20 border border-rose-900/30 px-2.5 py-1 rounded-md text-rose-400 hover:text-white"
                        >
                          ✕ DELETE CARD
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[9px] font-bold text-rose-500">
                            ACHIEVEMENT TITLE
                          </label>
                          <input
                            type="text"
                            value={ach.title}
                            onChange={(e) =>
                              handleAchievementChange(
                                idx,
                                "title",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-rose-500">
                            CATEGORY (LEGENDARY, EPIC, RARE)
                          </label>
                          <input
                            type="text"
                            value={ach.category}
                            onChange={(e) =>
                              handleAchievementChange(
                                idx,
                                "category",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-rose-500">
                            STATUS (COMPLETED, ONGOING)
                          </label>
                          <input
                            type="text"
                            value={ach.status}
                            onChange={(e) =>
                              handleAchievementChange(
                                idx,
                                "status",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[9px] font-bold text-rose-500">
                            DESCRIPTION SUMMARY
                          </label>
                          <textarea
                            rows={2}
                            value={ach.description}
                            onChange={(e) =>
                              handleAchievementChange(
                                idx,
                                "description",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROJECTS EDIT */}
            {activeSubTab === "projects" && (
              <div className="space-y-6">
                <div className="border-b border-rose-950/20 pb-4 flex justify-between items-center">
                  <h3 className="text-lg font-display font-black text-white tracking-widest font-bold">
                    DEPLOYMENTS MODULE INVENTORY
                  </h3>
                  <button
                    type="button"
                    onClick={addProject}
                    className="text-[9px] bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider"
                  >
                    + ADD PROJECT MODULE
                  </button>
                </div>

                <div className="space-y-6">
                  {siteData.projects.map((project, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/40 p-5 rounded-2xl border border-rose-900/10 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-rose-500">
                          PROJECT MODULE #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteProject(idx)}
                          className="text-[9px] bg-rose-950/30 hover:bg-rose-900/20 border border-rose-900/30 px-2.5 py-1 rounded-md text-rose-400 hover:text-white"
                        >
                          ✕ DELETE MODULE
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[9px] font-bold text-rose-500">
                            PROJECT TITLE
                          </label>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) =>
                              handleProjectChange(idx, "title", e.target.value)
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-rose-500">
                            CATEGORY
                          </label>
                          <input
                            type="text"
                            value={project.category}
                            onChange={(e) =>
                              handleProjectChange(
                                idx,
                                "category",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-rose-500">
                            LAUNCH URL
                          </label>
                          <input
                            type="text"
                            value={project.link}
                            onChange={(e) =>
                              handleProjectChange(idx, "link", e.target.value)
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[9px] font-bold text-rose-500">
                            DESCRIPTION SUMMARY
                          </label>
                          <textarea
                            rows={3}
                            value={project.description}
                            onChange={(e) =>
                              handleProjectChange(
                                idx,
                                "description",
                                e.target.value,
                              )
                            }
                            className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-4 py-2.5 text-xs text-white resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SKILLS EDIT */}
            {activeSubTab === "skills" && (
              <div className="space-y-6">
                <div className="border-b border-rose-950/20 pb-4">
                  <h3 className="text-lg font-display font-black text-white tracking-widest font-bold">
                    TECHNICAL SKILLS LEVEL OVERRIDES
                  </h3>
                </div>

                {/* Add new skill inputs */}
                <div className="bg-slate-950/40 p-4 rounded-xl border border-rose-900/10 mb-6 flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-[200px] space-y-1">
                    <label className="text-[8px] font-bold text-rose-500">NEW SKILL NAME</label>
                    <input
                      type="text"
                      placeholder="e.g. Next.js"
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      className="w-full bg-[#0a0305] border border-rose-950/50 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-rose-500">STARTING XP LEVEL</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={newSkillLevel}
                        onChange={(e) => setNewSkillLevel(parseInt(e.target.value) || 0)}
                        className="w-20 h-1 bg-rose-950 accent-rose-500 rounded-lg cursor-pointer"
                      />
                      <span className="text-[10px] font-mono font-bold text-accent">{newSkillLevel}%</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addSkill}
                    className="bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-400 px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-wider h-fit mt-3 sm:mt-0"
                  >
                    + ADD SKILL
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {siteData.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/40 p-4 rounded-xl border border-rose-900/10 flex flex-wrap items-center justify-between gap-3"
                    >
                      <span className="text-[10px] font-bold text-white uppercase">
                        {skill.name}
                      </span>

                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          value={skill.level}
                          onChange={(e) =>
                            handleSkillChange(
                              idx,
                              parseInt(e.target.value) || 0,
                            )
                          }
                          className="w-24 h-1 bg-rose-950 accent-rose-500 rounded-lg cursor-pointer"
                        />
                        <span className="text-[10px] font-mono font-bold text-accent min-w-[32px] text-right">
                          {skill.level}%
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteSkill(idx)}
                          className="text-rose-600 hover:text-rose-400 font-bold ml-2 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
