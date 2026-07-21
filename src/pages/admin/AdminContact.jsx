import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../utils/api';
import './admin.css';

const AdminContact = () => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [hours, setHours] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const { data } = await api.get('/contact-info');
        setAddress(data.address);
        setPhone(data.phone);
        setEmail(data.email);
        setHours(data.hours);
      } catch (error) {
        console.error('Failed to fetch contact details', error);
      }
    };
    fetchContactInfo();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.put('/contact-info', {
        address,
        phone,
        email,
        hours
      });
      setMessage('Contact details updated successfully!');
    } catch (err) {
      setMessage('Failed to update details: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-content-header">
        <h2>Manage Contact Details</h2>
        <p>Edit contact details shown on the website's Contact page.</p>
      </div>

      <div className="reviews-admin-container" style={{ gridTemplateColumns: '1fr' }}>
        <div className="admin-card">
          <h3>Edit Website Contact Info</h3>
          {message && <div className="admin-message">{message}</div>}
          <form onSubmit={submitHandler} className="review-form">
            <div className="form-group">
              <label>Gurugram Center Address</label>
              <textarea required value={address} onChange={(e) => setAddress(e.target.value)} rows="3" placeholder="Plot No, 98-C, Udhyog Vihar Phase VII, Sector 35, Gurugram, Haryana 122004" />
            </div>
            
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="9484794843" />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="info@skillserve.in" />
            </div>

            <div className="form-group">
              <label>Training Hours</label>
              <input type="text" required value={hours} onChange={(e) => setHours(e.target.value)} placeholder="Monday - Saturday: 9:00 AM - 6:00 PM" />
            </div>

            <button type="submit" className="admin-btn" style={{ width: 'auto', padding: '0.9rem 2rem' }} disabled={loading}>
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminContact;
