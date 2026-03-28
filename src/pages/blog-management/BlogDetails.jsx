import { useNavigate, useLocation } from "react-router-dom";

const BlogDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const blog = location.state?.blog;

    if (!blog) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <p style={{ color: '#6b7280', marginBottom: '16px' }}>No blog data found.</p>
                <button className="cancel-button" onClick={() => navigate('/blogs')}>Back to Blogs</button>
            </div>
        );
    }

    return (
        <>
            {/* Header */}
            <div className="logo-management-card">
                <div className="card-header" style={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <i className="bx bx-news"></i>
                        <h2 style={{ margin: 0 }}>Blog Details</h2>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => navigate('/blogs/create', { state: { blog } })}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '7px 16px', borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.15)', color: '#fff',
                                fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                            }}
                        >
                            <i className="bx bx-edit"></i> Edit
                        </button>
                        <button
                            onClick={() => navigate('/blogs')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '7px 16px', borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.1)', color: '#fff',
                                fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                            }}
                        >
                            <i className="bx bx-arrow-back"></i> Back
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Banner */}
            <div style={{
                height: '160px', background: 'linear-gradient(135deg, #062c15, #0a4a24)',
                borderRadius: '10px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', position: 'relative', marginBottom: '20px',
            }}>
                <i className="bx bx-news" style={{ fontSize: '70px', color: 'rgba(255,255,255,0.12)' }}></i>
                <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
                    <h2 style={{ margin: '0 0 8px', color: '#fff', fontSize: '20px', fontWeight: '700', lineHeight: 1.3 }}>{blog.title}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{ padding: '3px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                            {blog.category}
                        </span>
                        <span style={{
                            padding: '3px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '700',
                            background: blog.status === 'PUBLISHED' ? 'rgba(34,197,94,0.2)' : 'rgba(245,158,11,0.2)',
                            color: blog.status === 'PUBLISHED' ? '#6ee7b7' : '#fcd34d',
                        }}>
                            {blog.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Meta Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                {[
                    { label: 'Author', value: blog.author, icon: 'bx bx-user', color: '#2563eb' },
                    { label: 'Category', value: blog.category, icon: 'bx bx-category', color: '#7c3aed' },
                    { label: 'Total Views', value: blog.views.toLocaleString(), icon: 'bx bx-show', color: '#059669' },
                    { label: 'Published On', value: blog.createdAt, icon: 'bx bx-calendar', color: '#d97706' },
                    { label: 'Status', value: blog.status, icon: 'bx bx-check-circle', color: blog.status === 'PUBLISHED' ? '#16a34a' : '#d97706' },
                    { label: 'Tags', value: blog.tags.length, icon: 'bx bx-purchase-tag', color: '#0891b2' },
                ].map((s, i) => (
                    <div key={i} style={{
                        background: '#fff', border: '1px solid #e5e7eb',
                        borderLeft: `4px solid ${s.color}`, borderRadius: '8px',
                        padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px',
                    }}>
                        <div style={{
                            width: '36px', height: '36px', borderRadius: '8px',
                            background: '#f9f9f9', border: '1px solid #e5e7eb',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                            <i className={s.icon} style={{ fontSize: '18px', color: s.color }}></i>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: '700', color: '#1f2937', lineHeight: 1 }}>{s.value}</div>
                            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tags */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px', marginBottom: '16px' }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="bx bx-purchase-tag" style={{ color: '#0891b2' }}></i> Tags
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {blog.tags.map(tag => (
                        <span key={tag} style={{
                            padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                            background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb',
                        }}>#{tag}</span>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '24px' }}>
                <h4 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '700', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="bx bx-file-blank" style={{ color: '#059669' }}></i> Blog Content
                </h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#374151', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                    {blog.content}
                </p>
            </div>
        </>
    );
};

export default BlogDetails;
