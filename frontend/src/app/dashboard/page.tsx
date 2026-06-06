"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  Activity, 
  Target, 
  Utensils, 
  Dumbbell, 
  Droplets,
  Share2,
  Download,
  CheckCircle2,
  Clock,
  Flame,
  User,
  MapPin
} from "lucide-react";

// Types
type Gender = "Male" | "Female" | "Other" | "";
type Goal = "Fat Loss" | "Muscle Gain" | "Beginner" | "Women Fitness" | "Home Workout" | "";
type DietType = "Veg" | "Non-Veg" | "";
type Location = "Home" | "Gym" | "";

interface UserProfile {
  name: string;
  age: string;
  height: string;
  weight: string;
  gender: Gender;
  goal: Goal;
  diet: DietType;
  location: Location;
}

export default function DashboardWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    goal: "",
    diet: "",
    location: ""
  });

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    // Simulate API call / Expert system processing
    setTimeout(() => {
      setStep(3);
    }, 2500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {/* STEP 1: WIZARD FORM */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center p-3 bg-[#FFD600]/10 rounded-full mb-2">
                <Target className="h-8 w-8 text-[#FFD600]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">Build Your Indian <span className="text-[#FFD600]">Fitness Plan</span></h1>
              <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto">
                Tell us about yourself to get a personalized workout and diet plan instantly.
              </p>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-8 bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-sm">
              {/* Personal Info */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 border-b border-white/10 pb-2">
                  <User className="h-5 w-5 text-[#FFD600]" /> Personal Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm text-gray-400">Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Rahul"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] transition-all"
                      value={profile.name}
                      onChange={e => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm text-gray-400">Age</label>
                    <input 
                      required
                      type="number" 
                      placeholder="e.g. 24"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] transition-all"
                      value={profile.age}
                      onChange={e => setProfile({...profile, age: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm text-gray-400">Height (cm)</label>
                    <input 
                      required
                      type="number" 
                      placeholder="e.g. 175"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] transition-all"
                      value={profile.height}
                      onChange={e => setProfile({...profile, height: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm text-gray-400">Weight (kg)</label>
                    <input 
                      required
                      type="number" 
                      placeholder="e.g. 70"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] transition-all"
                      value={profile.weight}
                      onChange={e => setProfile({...profile, weight: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-3">
                <label className="text-sm text-gray-400">Gender</label>
                <div className="grid grid-cols-2 gap-3">
                  {["Male", "Female"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setProfile({...profile, gender: g as Gender})}
                      className={`py-3 px-4 rounded-xl border font-medium transition-all ${
                        profile.gender === g 
                        ? "bg-[#FFD600]/10 border-[#FFD600] text-[#FFD600]" 
                        : "bg-black/50 border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal */}
              <div className="space-y-3">
                <label className="text-sm text-gray-400 flex items-center gap-2">
                  <Flame className="h-4 w-4" /> Primary Goal
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["Fat Loss", "Muscle Gain", "Beginner", "Women Fitness", "Home Workout"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setProfile({...profile, goal: g as Goal})}
                      className={`py-3 px-3 rounded-xl border text-sm font-medium transition-all ${
                        profile.goal === g 
                        ? "bg-[#FFD600] border-[#FFD600] text-black shadow-[0_0_15px_rgba(255,214,0,0.3)]" 
                        : "bg-black/50 border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Diet & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <Utensils className="h-4 w-4" /> Diet Preference
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Veg", "Non-Veg"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setProfile({...profile, diet: d as DietType})}
                        className={`py-3 px-2 rounded-xl border text-sm font-medium transition-all ${
                          profile.diet === d 
                          ? "bg-[#FFD600]/10 border-[#FFD600] text-[#FFD600]" 
                          : "bg-black/50 border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Where will you workout?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Home", "Gym"].map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setProfile({...profile, location: l as Location})}
                        className={`py-3 px-2 rounded-xl border text-sm font-medium transition-all ${
                          profile.location === l 
                          ? "bg-[#FFD600]/10 border-[#FFD600] text-[#FFD600]" 
                          : "bg-black/50 border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={!profile.name || !profile.age || !profile.height || !profile.weight || !profile.gender || !profile.goal || !profile.diet || !profile.location}
                  className="w-full bg-[#FFD600] hover:bg-[#FFD600]/90 text-black font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,214,0,0.2)] hover:shadow-[0_0_30px_rgba(255,214,0,0.4)]"
                >
                  Generate My Plan <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* STEP 2: LOADING */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-32 space-y-6"
          >
            <div className="relative">
              <div className="w-20 h-20 border-4 border-white/10 border-t-[#FFD600] rounded-full animate-spin"></div>
              <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-[#FFD600]" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Analyzing Profile...</h2>
              <p className="text-gray-400 text-sm animate-pulse">Building the perfect Indian fitness plan for your goals</p>
            </div>
            <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#FFD600] w-1/2 animate-[slide_1.5s_ease-in-out_infinite]"></div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: RESULTS */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
              <div>
                <h2 className="text-xl font-bold">Hey {profile.name}, your plan is ready! 🎯</h2>
                <p className="text-sm text-gray-400">Customized for {profile.goal} • {profile.diet} • {profile.location}</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button 
                  onClick={() => alert("Downloading PDF Report...")}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  <Download className="h-4 w-4" /> PDF
                </button>
                <button 
                  onClick={() => alert("Opening WhatsApp to share...")}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/30 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </div>

            {/* Diet Plan */}
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="bg-[#FFD600]/10 p-2.5 rounded-xl">
                  <Utensils className="h-6 w-6 text-[#FFD600]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Simple Indian Diet</h3>
                  <p className="text-sm text-gray-400">Easy to make at home</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <DietItem time="Morning (8 AM)" meal="Oats with Milk & Banana OR Poha with Peanuts" />
                <DietItem time="Lunch (1 PM)" meal={`2 Roti, 1 Bowl Dal, Sabzi, ${profile.diet === "Non-Veg" ? "2 Boiled Eggs/Chicken Tikka" : "1 Bowl Curd/Paneer"}`} />
                <DietItem time="Evening (5 PM)" meal="Black Coffee/Tea + Roasted Chana or Makhana" />
                <DietItem time="Dinner (8 PM)" meal={`1 Roti, Dal, Salad, ${profile.diet === "Non-Veg" ? "Grilled Chicken" : "Soya Chunks/Paneer Bhurji"}`} />
              </div>
            </div>

            {/* Workout Plan */}
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="bg-[#FFD600]/10 p-2.5 rounded-xl">
                  <Dumbbell className="h-6 w-6 text-[#FFD600]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Workout Routine</h3>
                  <p className="text-sm text-gray-400">{profile.location} Workout • 45 mins/day</p>
                </div>
              </div>
              
              <div className="grid gap-4">
                {profile.location === "Home" ? (
                  <>
                    <WorkoutItem exercise="Jumping Jacks (Warmup)" sets="3 sets" reps="30 secs" />
                    <WorkoutItem exercise="Push-ups" sets="3 sets" reps="10-15 reps" />
                    <WorkoutItem exercise="Bodyweight Squats" sets="3 sets" reps="15-20 reps" />
                    <WorkoutItem exercise="Plank" sets="3 sets" reps="45 secs" />
                  </>
                ) : (
                  <>
                    <WorkoutItem exercise="Treadmill/Cycling (Warmup)" sets="1 set" reps="10 mins" />
                    <WorkoutItem exercise="Machine Chest Press" sets="3 sets" reps="12 reps" />
                    <WorkoutItem exercise="Lat Pulldown" sets="3 sets" reps="12 reps" />
                    <WorkoutItem exercise="Leg Press / Squats" sets="3 sets" reps="12-15 reps" />
                  </>
                )}
              </div>
            </div>

            {/* Daily Timetable & Water */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-5 w-5 text-[#FFD600]" />
                  <h3 className="font-bold">Daily Timetable</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-[#FFD600] mt-0.5 shrink-0" /> Wake up before 7:30 AM</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-[#FFD600] mt-0.5 shrink-0" /> Workout in Morning or 6 PM</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-[#FFD600] mt-0.5 shrink-0" /> 7-8 hours of sleep required</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-[#FFD600] mt-0.5 shrink-0" /> Walk 5,000 steps daily</li>
                </ul>
              </div>
              
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Droplets className="h-5 w-5 text-[#3b82f6]" />
                  <h3 className="font-bold">Water Intake</h3>
                </div>
                <div className="text-center py-4">
                  <div className="text-4xl font-black mb-2 text-[#FFD600]">3-4<span className="text-xl text-gray-400"> Litres</span></div>
                  <p className="text-sm text-gray-400">Carry a 1L bottle and refill 3 times.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 pb-12 flex justify-center">
              <button 
                onClick={() => { setStep(1); setProfile({...profile, name: "", age: "", height: "", weight: ""})}}
                className="text-gray-400 hover:text-white underline text-sm transition-colors"
              >
                Start Over
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}} />
    </div>
  );
}

function DietItem({ time, meal }: { time: string, meal: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-black/30 border border-white/5 gap-2">
      <span className="text-[#FFD600] font-medium text-sm whitespace-nowrap">{time}</span>
      <span className="text-gray-300 text-sm sm:text-right">{meal}</span>
    </div>
  );
}

function WorkoutItem({ exercise, sets, reps }: { exercise: string, sets: string, reps: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-white/5">
      <span className="font-medium text-white">{exercise}</span>
      <div className="flex items-center gap-3 text-sm">
        <span className="text-gray-400">{sets}</span>
        <span className="bg-white/10 px-2 py-1 rounded text-[#FFD600] font-medium">{reps}</span>
      </div>
    </div>
  );
}
