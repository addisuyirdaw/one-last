import React, { useState } from 'react';
import { User, Phone, BookOpen, CheckCircle2, XCircle, ChevronDown } from 'lucide-react';

export function ClubRegistration() {
  // Student registration state
  const [studentData, setStudentData] = useState({
    studentId: '',
    phone: '',
    department: '',
    clubId: '',
    verificationFile: null
  });

  // Club representative state
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedMembers, setApprovedMembers] = useState([]);

  // Mock data
  const clubs = [
    { id: '1', name: 'Debate Society', representative: 'Rep. Alemu' },
    { id: '2', name: 'Football Club', representative: 'Rep. Tigist' },
    { id: '3', name: 'CS Society', representative: 'Rep. Daniel' }
  ];

  const departments = [
    'Computer Science', 
    'Engineering',
    'Business',
    'Medicine',
    'Law'
  ];

  // Handle student registration
  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!/^DBU\d{7}$/.test(studentData.studentId)) {
      alert('Invalid DBU ID format (DBU followed by 7 digits)');
      return;
    }
    
    // Add to pending requests
    setPendingRequests(prev => [...prev, {
      ...studentData,
      id: Date.now().toString(),
      status: 'pending',
      date: new Date().toISOString()
    }]);
    
    alert('Registration submitted for club approval');
    setStudentData({
      studentId: '',
      phone: '',
      department: '',
      clubId: '',
      verificationFile: null
    });
  };

  // Club representative actions
  const handleApprove = (requestId) => {
    const request = pendingRequests.find(r => r.id === requestId);
    setApprovedMembers(prev => [...prev, { ...request, status: 'approved' }]);
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const handleReject = (requestId) => {
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-8">
      {/* Student Registration Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <User className="mr-2" /> Club Registration
        </h2>
        
        <form onSubmit={handleStudentSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">DBU Student ID</label>
            <input
              type="text"
              value={studentData.studentId}
              onChange={(e) => setStudentData({...studentData, studentId: e.target.value.toUpperCase()})}
              placeholder="DBU1500962"
              className="w-full p-2 border rounded"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Format: DBU followed by 7 digits</p>
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <div className="flex items-center border rounded">
              <span className="px-3 bg-gray-100">+251</span>
              <input
                type="tel"
                value={studentData.phone}
                onChange={(e) => setStudentData({...studentData, phone: e.target.value})}
                placeholder="912345678"
                className="flex-1 p-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Department</label>
            <div className="relative">
              <select
                value={studentData.department}
                onChange={(e) => setStudentData({...studentData, department: e.target.value})}
                className="w-full p-2 border rounded appearance-none"
                required
              >
                <option value="">Select your department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Select Club</label>
            <div className="relative">
              <select
                value={studentData.clubId}
                onChange={(e) => setStudentData({...studentData, clubId: e.target.value})}
                className="w-full p-2 border rounded appearance-none"
                required
              >
                <option value="">Select a club</option>
                {clubs.map(club => (
                  <option key={club.id} value={club.id}>
                    {club.name} ({club.representative})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Upload Student ID (Photo/Scan)
            </label>
            <input
              type="file"
              onChange={(e) => setStudentData({...studentData, verificationFile: e.target.files[0]})}
              accept="image/*,.pdf"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Registration
          </button>
        </form>
      </div>

      {/* Club Representative Dashboard */}
      <div className="space-y-6">
        {/* Pending Approvals */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold mb-4 flex items-center">
            <BookOpen className="mr-2" /> Pending Approvals
          </h3>
          
          {pendingRequests.length === 0 ? (
            <p className="text-gray-500">No pending requests</p>
          ) : (
            <div className="space-y-3">
              {pendingRequests.map(request => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <p><span className="font-medium">ID:</span> {request.studentId}</p>
                    <p><span className="font-medium">Phone:</span> +251{request.phone}</p>
                    <p><span className="font-medium">Department:</span> {request.department}</p>
                    <p><span className="font-medium">Date:</span> {new Date(request.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => handleApprove(request.id)}
                      className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
                    >
                      <CheckCircle2 className="mr-1" size={16} /> Approve
                    </button>
                    <button 
                      onClick={() => handleReject(request.id)}
                      className="flex items-center px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                    >
                      <XCircle className="mr-1" size={16} /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Approved Members */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold mb-4 flex items-center">
            <CheckCircle2 className="mr-2" /> Approved Members
          </h3>
          
          {approvedMembers.length === 0 ? (
            <p className="text-gray-500">No approved members yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Student ID</th>
                    <th className="p-2 text-left">Department</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedMembers.map(member => (
                    <tr key={member.id} className="border-b">
                      <td className="p-2">{member.studentId}</td>
                      <td className="p-2">{member.department}</td>
                      <td className="p-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          Approved
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}