import { useState, useEffect, useRef } from "react";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://backendzarva.onrender.com";

const ZarvaVoiceRecognition = () => {
  const [wordInput, setWordInput] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English (US)");
  const [savedWords, setSavedWords] = useState<string[]>([]);
  const [isSystemReady, setIsSystemReady] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState("");
  const [currentLocation, setCurrentLocation] = useState<{latitude: number; longitude: number} | null>(null);
  const recognitionRef = useRef<any>(null);
  
  // Emergency popup state
  const [showEmergencyPopup, setShowEmergencyPopup] = useState(false);
  const [detectedWord, setDetectedWord] = useState("");
  const [emergencyTimeout, setEmergencyTimeout] = useState<NodeJS.Timeout | null>(null);

  // Placeholder for background image URL - you can replace this
  const bgImageUrl = "background.z.jpg";

  // Get current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setStatus("Error getting location. Please enable location services.");
        }
      );
    } else {
      setStatus("Geolocation is not supported by your browser");
    }
  }, []);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedWordsData = localStorage.getItem("savedWords");
    const savedContacts = localStorage.getItem("savedContacts");

    if (savedWordsData) {
      setSavedWords(JSON.parse(savedWordsData));
    }
    if (savedContacts) {
      const contacts = JSON.parse(savedContacts);
      setContact1(contacts.contact1 || "");
      setContact2(contacts.contact2 || "");
    }
  }, []);

  // Check if system is ready whenever contacts or words change
  useEffect(() => {
    const savedWordsData = localStorage.getItem("savedWords");
    const savedContacts = localStorage.getItem("savedContacts");

    setIsSystemReady(!!(savedWordsData && savedContacts));
  }, [savedWords, contact1, contact2]);

  // Cleanup emergency timeout when component unmounts or popup closes
  useEffect(() => {
    return () => {
      if (emergencyTimeout) {
        clearTimeout(emergencyTimeout);
      }
    };
  }, [emergencyTimeout]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLanguage === "English (US)" ? "en-US" : 
                        selectedLanguage === "Hindi" ? "hi-IN" :
                        selectedLanguage === "Spanish" ? "es-ES" :
                        selectedLanguage === "French" ? "fr-FR" :
                        "de-DE";

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
            // Check if any saved word is detected
            const detectedWord = savedWords.find(word => 
              finalTranscript.toLowerCase().includes(word.toLowerCase())
            );
            if (detectedWord) {
              handleWordDetection(detectedWord);
            }
          } else {
            interimTranscript += transcript;
          }
        }

        setFinalTranscript(finalTranscript);
        setInterimTranscript(interimTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        // Only stop if it's a fatal error
        if (event.error === 'no-speech' || event.error === 'audio-capture') {
          // Restart recognition if it was supposed to be listening
          if (isListening) {
            try {
              recognition.start();
            } catch (error) {
              console.error('Error restarting recognition:', error);
            }
          }
        } else {
          setIsListening(false);
        }
      };

      // Handle when recognition ends
      recognition.onend = () => {
        // Restart recognition if it was supposed to be listening
        if (isListening) {
          try {
            recognition.start();
          } catch (error) {
            console.error('Error restarting recognition:', error);
          }
        }
      };

      recognitionRef.current = recognition;
    }
  }, [selectedLanguage, savedWords, isListening]);

  const getLocationString = async () => {
    if (!currentLocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        return `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
      } catch (error) {
        console.error("Error getting location:", error);
        return "Location unavailable";
      }
    }
    return `https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`;
  };

  const handleWordDetection = async (detectedWord: string) => {
    // Show emergency popup instead of immediately making calls
    setDetectedWord(detectedWord);
    setShowEmergencyPopup(true);
    
    
    // Set 30-second timeout for automatic emergency action
    const timeout = setTimeout(() => {
      handleEmergencyAction(detectedWord);
    }, 30000);
    
    setEmergencyTimeout(timeout);
  };

  const handleEmergencyAction = async (word: string) => {
    const locationUrl = await getLocationString();
    const message = `Emergency alert! The word "${word}" was detected. This is an automated message from Zarva Safety System. Current location: ${locationUrl}`;
    
    // Call both contacts
    if (contact1) {
      await initiateCall(contact1, message);
    }
    if (contact2) {
      await initiateCall(contact2, message);
    }

    // Send messages to both contacts
    if (contact1) {
      await initiatemessage(contact1, message);
    }
    if (contact2) {
      await initiatemessage(contact2, message);
    }
  };

  const handleEmergencyResponse = (isInDanger: boolean) => {
    // Clear the timeout
    if (emergencyTimeout) {
      clearTimeout(emergencyTimeout);
      setEmergencyTimeout(null);
    }
    
    // Close the popup
    setShowEmergencyPopup(false);
    setDetectedWord("");
    
    if (isInDanger) {
      // User confirmed they are in danger, proceed with emergency action
      handleEmergencyAction(detectedWord);
    } else {
      // User confirmed they are safe, no action needed
      setStatus("Emergency alert cancelled. You're safe.");
    }
  };

  const ensureIndianNumber = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
      return `+${digitsOnly.slice(-12)}`;
    }
    const lastTenDigits = digitsOnly.slice(-10);
    return lastTenDigits.length === 10 ? `+91${lastTenDigits}` : "";
  };

  const initiateCall = async (toNumber: string, newmessage: string) => {
    const formattedNumber = ensureIndianNumber(toNumber);
    if (!formattedNumber) {
      setStatus(
        "Invalid contact number. Please provide a 10-digit Indian mobile number."
      );
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/twilio-call`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: formattedNumber,
          message: newmessage,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to initiate the call.");
      }
      console.log(data);
      setStatus(`Call initiated to ${formattedNumber}: ${data.sid}`);
    } catch (error) {
      console.error(error);
      setStatus(
        error instanceof Error
          ? error.message
          : `Error making call to ${formattedNumber}`
      );
    }
  };

  const initiatemessage = async (toNumber: string, newmessage: string) => {
    const formattedNumber = ensureIndianNumber(toNumber);
    if (!formattedNumber) {
      setStatus(
        "Invalid contact number. Please provide a 10-digit Indian mobile number."
      );
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/twilio-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: formattedNumber,
          messageText: newmessage,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to send the message.");
      }
      console.log(data);
      setStatus(`Message sent to ${formattedNumber}: ${data.sid}`);
    } catch (error) {
      console.error(error);
      setStatus(
        error instanceof Error
          ? error.message
          : `Error sending message to ${formattedNumber}`
      );
    }
  };

  const handleMicClick = () => {
    if (!isSystemReady) {
      alert(
        "Please save at least one word and both contact numbers before using voice recognition."
      );
      return;
    }

    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting recognition:', error);
        setStatus("Error starting voice recognition. Please try again.");
      }
    }
  };

  const handleDeleteWord = (wordToDelete: string) => {
    const updatedWords = savedWords.filter((word) => word !== wordToDelete);
    setSavedWords(updatedWords);
    localStorage.setItem("savedWords", JSON.stringify(updatedWords));
  };

  const handleSave = () => {
    // Save words
    const newSavedWords = [...savedWords, wordInput];
    setSavedWords(newSavedWords);
    localStorage.setItem("savedWords", JSON.stringify(newSavedWords));
    setWordInput("");

    // Save contacts
    const contacts = { contact1, contact2 };
    localStorage.setItem("savedContacts", JSON.stringify(contacts));
  };

  const handleClear = () => {
    setFinalTranscript("");
    setInterimTranscript("");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-8"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Main container */}
      <div className="flex flex-col md:flex-row gap-32 md:gap-32 w-full max-w-6xl items-stretch">
        {/* Left Panel - Word Storage */}
        <div
          className="rounded-xl p-3 md:p-4 w-full md:w-[55%] border-2 flex flex-col"
          style={{
            backgroundColor: "#d1cec5",
            borderColor: "#a8a596",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Word Storage Section */}
          <div className="mb-2 md:mb-3 flex-1">
            <h2 className="text-black font-bold text-base md:text-lg mb-2 md:mb-3">
              Word Storage
            </h2>

            <input
              type="text"
              placeholder="Enter a Word..."
              value={wordInput}
              onChange={(e) => setWordInput(e.target.value)}
              className="w-full p-2 border-2 border-gray-300 rounded-lg mb-2 bg-white text-gray-800 text-sm"
            />

            <div className="mb-2">
              <label className="block text-sm font-semibold text-black mb-1">
                Saved Words:
              </label>
              <div className="flex flex-wrap gap-2 text-xs text-gray-800">
                {savedWords.length > 0 ? (
                  savedWords.map((word, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-white px-2 py-1 rounded shadow border text-xs"
                    >
                      <span className="mr-2">{word}</span>
                      <button
                        onClick={() => handleDeleteWord(word)}
                        className="text-red-500 font-bold hover:text-red-700"
                        title="Delete Word"
                      >
                        &times;
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500">No Words saved yet...</span>
                )}
              </div>
            </div>
          </div>

          {/* Safe Contacts Section */}
          <div className="mb-2 md:mb-3 flex-1">
            <h2 className="text-black font-bold text-base md:text-lg mb-2 md:mb-3">
              Safe Contacts
            </h2>

            <input
              type="text"
              placeholder="Enter Mobile no."
              value={contact1}
              onChange={(e) => setContact1(e.target.value)}
              className="w-full p-2 border-2 border-gray-300 rounded-lg mb-2 bg-white text-gray-800 text-sm"
            />

            <input
              type="text"
              placeholder="Enter Mobile no."
              value={contact2}
              onChange={(e) => setContact2(e.target.value)}
              className="w-full p-2 border-2 border-gray-300 rounded-lg mb-2 bg-white text-gray-800 text-sm"
            />
          </div>

          {/* Save Button - Moved up */}
          <div className="flex justify-center py-16">
            <button
              onClick={handleSave}
              className="w-32  bg-black text-[#bcb291] py-3 px-1 rounded-full font-medium text-xl hover:opacity-80 transition-opacity"
              style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)" }}
            >
              Save
            </button>
          </div>
        </div>

        {/* Right Panel - Voice Recognition System */}
        <div
          className="rounded-xl p-3 md:p-4 w-full md:w-[55%] border-2 flex flex-col"
          style={{
            backgroundColor: "#d1cec5",
            borderColor: "#a8a596",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h1 className="text-black font-bold text-base md:text-lg text-center mb-2 md:mb-3">
            VOICE RECOGNITION SYSTEM
          </h1>

          {/* Microphone Icon - Made larger */}
          <div className="flex justify-center mb-2 md:mb-3">
            <button
              onClick={handleMicClick}
              className={`w-36 h-36 md:w-36 md:h-36 rounded-full flex items-center justify-center transition-opacity cursor-pointer border-4 ${
                isSystemReady ? "hover:opacity-80" : "opacity-50"
              } ${isListening ? "animate-pulse bg-red-500" : ""}`}
              style={{
                backgroundColor: isListening ? "red" : "black",
                borderColor: isListening ? "red" : "black",
                boxShadow: "0 6px 24px rgba(0, 0, 0, 2)",
              }}
              title={
                !isSystemReady
                  ? "Please save words and contacts first"
                  : isListening
                  ? "Click to stop listening"
                  : "Click to start listening"
              }
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-black rounded-full flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/dub7qyv8e/image/upload/v1748885451/gyhygkgmdfwopix5pnlo.png"
                  alt="Microphone"
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full"
                />
              </div>
            </button>
          </div>

          {/* Final Transcript */}
          <div className="mb-3 md:mb-4 flex-1">
            <label className="block text-black font-semibold text-base md:text-lg mb-2">
              Final Transcript
            </label>
            <div className="w-full h-16 md:h-20 p-3 md:p-4 border-2 border-gray-300 rounded-lg bg-white overflow-y-auto">
              <p className="text-gray-800 text-sm md:text-base whitespace-pre-wrap">
                {finalTranscript}
              </p>
            </div>
          </div>

          {/* Interim Transcript */}
          <div className="mb-6 md:mb-8 flex-1">
            <label className="block text-black font-semibold text-base md:text-lg mb-2">
              Current Speech
            </label>
            <div className="w-full h-16 md:h-20 p-3 md:p-4 border-2 border-gray-300 rounded-lg bg-white overflow-y-auto">
              <p className="text-gray-800 text-sm md:text-base italic">
                {interimTranscript || "Listening..."}
              </p>
            </div>
          </div>

          {/* Status Message */}
          {status && (
            <div className="text-center mb-4">
              <span className="text-sm text-gray-700">{status}</span>
            </div>
          )}

          {/* Listening Status */}
          {isListening && (
            <div className="text-center mb-4">
              <span className="text-sm text-red-600 font-semibold animate-pulse">
                ● Listening...
              </span>
            </div>
          )}

          {/* Decrease text size in language selection */}
          <div className="flex flex-col sm:flex-row items-center justify-center mb-2 gap-1">
            
            <span className="text-black font-semibold text-xs md:text-sm mr-0 sm:mr-2">
              Select Language:
            </span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent border-none text-gray-700 cursor-pointer text-xs"
            >
              <option value="English (US)">English (US)</option>
              <option value="Spanish">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>

          {/* Clear Button */}
          <div className="flex justify-center mt-auto">
            <button
              onClick={handleClear}
              className="bg-black text-white py-2 px-6 md:px-8 rounded-full text-sm md:text-base font-semibold hover:bg-gray-800 transition-colors"
              style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)" }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Check Popup */}
      {showEmergencyPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h2 className="text-xl font-bold text-black mb-4 text-center">
              Emergency Check
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              The word "{detectedWord}" was detected. Are you in danger?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleEmergencyResponse(true)}
                className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Yes, I'm in danger
              </button>
              <button
                onClick={() => handleEmergencyResponse(false)}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                No, I'm safe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              If no response within 30 seconds, emergency contacts will be notified automatically
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZarvaVoiceRecognition;
