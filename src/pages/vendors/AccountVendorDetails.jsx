
import { useNavigate, useLocation } from 'react-router-dom';
import './AccountVendorDetails.scss';

const AccountVendorDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const vendor = location.state?.vendor;

  if (!vendor) {
    return (
      <div className="not-found-message">
        <p>No vendor data available</p>
        <button className="cancel-button" onClick={() => navigate('/vendors')}>Back to Vendors</button>
      </div>
    );
  }
  const vendorDetail = vendor.vendorDetail?.[0] || {};

  return (
    <>
      <div className="logo-management-card">
        <div className="card-header vendor-details-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="bx bx-info-circle"></i>
            <h2 style={{ margin: 0 }}>Vendor Details</h2>
          </div>
          <button onClick={() => navigate('/vendors')} className="back-button">
            <i className="bx bx-arrow-back"></i>
            Back
          </button>
        </div>
      </div>

      <div className="vendor-details-container">
        {vendorDetail.profile && (
          <div className="vendor-card card-profile">
            <img src={vendorDetail.profile} alt="Vendor Profile" />
          </div>
        )}

        <div className="vendor-grid">
          <div className="vendor-card card-basic">
            <h3><i className="bx bx-info-circle"></i>Basic Information</h3>
            <p><strong>Vendor ID:</strong> {vendor.id}</p>
            <p><strong>Name:</strong> {vendorDetail.name || "-"}</p>
            <p><strong>Phone Number:</strong> {vendor.phoneNumber}</p>
            <p><strong>Email:</strong> {vendorDetail.email || "-"}</p>
            <p><strong>Status:</strong> <span className={`status-badge status-${vendor.status?.toLowerCase()}`}>{vendor.status}</span></p>
          </div>

          <div className="vendor-card card-business">
            <h3><i className="bx bx-briefcase"></i>Business Information</h3>
            <p><strong>Business Name:</strong> {vendorDetail.businessName || "-"}</p>
            <p><strong>Aadhar Number:</strong> {vendorDetail.aadharNumber || "-"}</p>
            <p><strong>PAN Number:</strong> {vendorDetail.panNumber || "-"}</p>
            <p><strong>Service Area:</strong> {vendorDetail.serviceArea || "-"}</p>
          </div>
        </div>

        {vendorDetail.address && (
          <div className="vendor-card card-address">
            <h3><i className="bx bx-map"></i>Address Information</h3>
            <p><strong>Address:</strong> {vendorDetail.address}</p>
          </div>
        )}

        {(vendorDetail.aadharFront || vendorDetail.aadharBack || vendorDetail.pan || vendorDetail.businessProve) && (
          <div className="card-documents">
            <h3><i className="bx bx-file"></i>Documents</h3>
            <div className="documents-grid">
              {vendorDetail.aadharFront && (
                <div className="document-item">
                  <img src={vendorDetail.aadharFront} alt="Aadhar Front" />
                  <p>Aadhar Front</p>
                  <a href={vendorDetail.aadharFront} target="_blank" rel="noopener noreferrer">View</a>
                </div>
              )}
              {vendorDetail.aadharBack && (
                <div className="document-item">
                  <img src={vendorDetail.aadharBack} alt="Aadhar Back" />
                  <p>Aadhar Back</p>
                  <a href={vendorDetail.aadharBack} target="_blank" rel="noopener noreferrer">View</a>
                </div>
              )}
              {vendorDetail.pan && (
                <div className="document-item">
                  <img src={vendorDetail.pan} alt="PAN" />
                  <p>PAN Card</p>
                  <a href={vendorDetail.pan} target="_blank" rel="noopener noreferrer">View</a>
                </div>
              )}
              {vendorDetail.businessProve && (
                <div className="document-item">
                  <img src={vendorDetail.businessProve} alt="Business Proof" />
                  <p>Business Proof</p>
                  <a href={vendorDetail.businessProve} target="_blank" rel="noopener noreferrer">View</a>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="card-metadata">
          <h3><i className="bx bx-time"></i>Metadata</h3>
          <div className="metadata-content">
            <p><strong>Created At:</strong> {new Date(vendor.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(vendor.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountVendorDetails;