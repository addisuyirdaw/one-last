import React, { useState, useRef } from 'react';
import { Upload, FileInput, X, Check, Vote, Users } from 'lucide-react';

export function Elections() {
  const [selectedElection, setSelectedElection] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [idFile, setIdFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [verificationStep, setVerificationStep] = useState(1); // 1: ID input, 2: Upload, 3: Confirm
  const fileInputRef = useRef(null);

  const mockElections = [
    {
      id: "1",
      title: "Student Union President Election 2024",
      status: "active",
      candidates: [
        { id: "1", name: "Candidate A" },
        { id: "2", name: "Candidate B" }
      ]
    }
  ];

  const validateStudentId = (id) => /^DBU\d{7}$/.test(id);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setIdFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleVerifyStudent = () => {
    if (!validateStudentId(studentId)) {
      alert('Please enter a valid DBU student ID (format: DBU followed by 7 digits)');
      return;
    }
    setVerificationStep(2);
  };

  const handleSubmitVote = (candidateId) => {
    if (!idFile) {
      alert('Please upload your university ID');
      return;
    }
    
    // In a real app, you would send this to your backend
    console.log('Vote submitted:', {
      studentId,
      candidateId,
      idVerified: true
    });
    
    alert(`Vote submitted successfully for ${candidateId}`);
    resetVerification();
  };

  const resetVerification = () => {
    setStudentId('');
    setIdFile(null);
    setPreviewUrl('');
    setVerificationStep(1);
    setSelectedElection(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Election Listing */}
      <div className="grid gap-4 mb-8">
        {mockElections.map(election => (
          <div key={election.id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-bold">{election.title}</h2>
            <p className="text-gray-600 mb-2">{election.status}</p>
            <button
              onClick={() => setSelectedElection(election)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Vote Now
            </button>
          </div>
        ))}
      </div>

      {/* Verification Modal */}
      {selectedElection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Student Verification</h2>
                <button onClick={resetVerification} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>

              {/* Step 1: Student ID Input */}
              {verificationStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium">DBU Student ID</label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                      placeholder="DBU1500962"
                      className="w-full p-2 border rounded"
                    />
                    <p className="text-sm text-gray-500 mt-1">Format: DBU followed by 7 digits</p>
                  </div>
                  <button
                    onClick={handleVerifyStudent}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Verify ID
                  </button>
                </div>
              )}

              {/* Step 2: ID Upload */}
              {verificationStep === 2 && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg flex items-center">
                    <Check className="text-green-500 mr-2" />
                    <span>Verified: {studentId}</span>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">Upload University ID</label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      {previewUrl ? (
                        <div className="relative">
                          <img 
                            src={previewUrl} 
                            alt="ID preview" 
                            className="max-h-40 mx-auto mb-4"
                          />
                          <button
                            onClick={handleRemoveFile}
                            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-center mb-2">
                            <Upload size={24} className="text-gray-400" />
                          </div>
                          <p className="text-gray-500 mb-2">Drag & drop your ID or</p>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*,.pdf"
                            className="hidden"
                            id="idUpload"
                          />
                          <label
                            htmlFor="idUpload"
                            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                          >
                            Select File
                          </label>
                          <p className="text-xs text-gray-500 mt-2">
                            Accepted: JPG, PNG, PDF (max 5MB)
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setVerificationStep(3)}
                    disabled={!idFile}
                    className={`w-full py-2 rounded ${idFile ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* Step 3: Voting */}
              {verificationStep === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg flex items-center">
                    <Check className="text-green-500 mr-2" />
                    <span>Identity Verified: {studentId}</span>
                  </div>

                  <h3 className="font-bold">Select Candidate:</h3>
                  <div className="space-y-2">
                    {selectedElection.candidates.map(candidate => (
                      <div 
                        key={candidate.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleSubmitVote(candidate.id)}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <User size={20} className="text-gray-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">{candidate.name}</h4>
                            <p className="text-sm text-gray-500">Candidate for {selectedElection.title}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}