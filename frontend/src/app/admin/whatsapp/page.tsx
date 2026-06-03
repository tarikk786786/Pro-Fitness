'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function WhatsAppAdminPage() {
  const [status, setStatus] = useState<string>('LOADING');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWhatsAppStatus();
    // Poll every 5 seconds for status updates
    const interval = setInterval(fetchWhatsAppStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchWhatsAppStatus = async () => {
    try {
      // Setup the API base url, assuming standard backend running on port 5000
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/whatsapp/qr', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setStatus(response.data.status);
      setQrCode(response.data.qr || null);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch WhatsApp connection status. Are you an admin?');
      setStatus('ERROR');
    }
  };

  const getStatusBadge = () => {
    switch(status) {
      case 'CONNECTED': return <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">Connected</span>;
      case 'WAITING_FOR_QR': return <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">Waiting for Scan</span>;
      case 'DISCONNECTED': return <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">Disconnected</span>;
      default: return <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">{status}</span>;
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">WhatsApp Integration Admin</h1>
      
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Connection Status</h2>
          {getStatusBadge()}
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center justify-center py-8">
          {status === 'WAITING_FOR_QR' && qrCode ? (
            <div className="text-center">
              <p className="mb-4 text-gray-600">Scan this QR code with your WhatsApp app to link the number for automated reminders.</p>
              <div className="border p-4 bg-white inline-block rounded-xl shadow-sm">
                <Image src={qrCode} alt="WhatsApp QR Code" width={256} height={256} />
              </div>
            </div>
          ) : status === 'CONNECTED' ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">WhatsApp is Connected</h3>
              <p className="text-gray-500">Automated reminders and notifications will be sent from this account.</p>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>Please wait or refresh the page...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
