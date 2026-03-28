import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CATEGORIES = ["Travel", "Budget Travel", "Seasonal", "Tips & Tricks", "Luxury", "Adventure", "Food & Culture"];

const SectionCard = ({ icon, iconColor, title, children }) => (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{
            padding: '12px 18px', borderBottom: '1px solid #e5e7eb',
            background: '#f9fafb', display: 'flex', alignItems: 'center', gap: '8px',
        }}>
            <i className={icon} style={{ fontSize: '16px', color: iconColor }}></i>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>{title}</span>
        </div>
        <div style={{ padding: '18px' }}>{children}</div>
    </div>
);

const Field = ({ label, required, hint, error, children }) => (
    <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>
                {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
            </label>
            {hint && <span style={{ fontSize: '11px', color: '#9ca3af' }}>{hint}</span>}
        </div>
        {children}
        {error && <span style={{ display: 'block', fontSize: '11px', color: '#dc2626', marginTop: '4px' }}>{error}</span>}
    </div>
);

const inputStyle = {
    width: '100%', padding: '9px 12px', border: '1px solid #d1d5db',
    borderRadius: '6px', fontSize: '13px', color: '#111827',
    background: '#fff', boxSizing: 'border-box', outline: 'none',
    fontFamily: 'inherit',
};

const BlogCreate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const existingBlog = location.state?.blog;
    const isEdit = !!existingBlog;

    const [formData, setFormData] = useState({
        title: "", category: "Travel", author: "",
        tags: "", status: "DRAFT", content: "",
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (existingBlog) {
            setFormData({
                title: existingBlog.title,
                category: existingBlog.category,
                author: existingBlog.author,
                tags: existingBlog.tags.join(", "),
                status: existingBlog.status,
                content: existingBlog.content,
            });
        }
    }, []);

    const validate = () => {
        const e = {};
        if (!formData.title.trim()) e.title = "* Title is required";
        if (!formData.author.trim()) e.author = "* Author is required";
        if (!formData.content.trim()) e.content = "* Content is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(p => ({ ...p, [name]: value }));
        setErrors(p => ({ ...p, [name]: "" }));
    };

    const handleSubmit = (statusOverride) => {
        if (validate()) {
            const payload = statusOverride ? { ...formData, status: statusOverride } : formData;
            console.log("Submit:", payload);
            navigate('/blogs');
        }
    };

    const tagList = formData.tags ? formData.tags.split(",").map(t => t.trim()).filter(Boolean) : [];
    const wordCount = formData.content.trim() ? formData.content.trim().split(/\s+/).length : 0;

    return (
        <>
            {/* Page Header */}
            <div className="logo-management-card">
                <div className="card-header" style={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <i className="bx bx-news"></i>
                        <h2 style={{ margin: 0 }}>{isEdit ? "Edit Blog Post" : "Create New Blog Post"}</h2>
                    </div>
                    <button onClick={() => navigate('/blogs')} style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '7px 16px', borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.25)',
                        background: 'rgba(255,255,255,0.12)', color: '#fff',
                        fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                    }}>
                        <i className="bx bx-arrow-back"></i> Back
                    </button>
                </div>
            </div>

            {/* Two-column layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 290px', gap: '16px', alignItems: 'start' }}>

                {/* ── LEFT COLUMN ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* Title */}
                    <SectionCard icon="bx bx-heading" iconColor="#062c15" title="Blog Title">
                        <Field label="Title" required error={errors.title}>
                            <input
                                name="title" value={formData.title} onChange={handleChange}
                                placeholder="Enter an engaging blog title..."
                                style={{ ...inputStyle, fontSize: '15px', fontWeight: '600', padding: '10px 12px' }}
                            />
                        </Field>
                    </SectionCard>

                    {/* Content */}
                    <SectionCard icon="bx bx-edit-alt" iconColor="#2563eb" title="Blog Content">
                        <Field label="Content" required hint={`${wordCount} words`} error={errors.content}>
                            <textarea
                                name="content" value={formData.content} onChange={handleChange}
                                placeholder="Write your blog content here. Share your travel experiences, tips, and insights..."
                                rows={18}
                                style={{
                                    ...inputStyle, resize: 'vertical',
                                    lineHeight: '1.75', fontSize: '14px',
                                }}
                            />
                        </Field>
                    </SectionCard>

                    {/* Tags */}
                    <SectionCard icon="bx bx-purchase-tag" iconColor="#0891b2" title="Tags">
                        <Field label="Tags" hint="Comma separated">
                            <input
                                name="tags" value={formData.tags} onChange={handleChange}
                                placeholder="e.g. travel, nature, tips"
                                style={inputStyle}
                            />
                        </Field>
                        {tagList.length > 0 && (
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                                {tagList.map((tag, i) => (
                                    <span key={i} style={{
                                        padding: '4px 12px', borderRadius: '20px', fontSize: '11px',
                                        fontWeight: '600', background: '#f0fdf4',
                                        color: '#16a34a', border: '1px solid #bbf7d0',
                                    }}>#{tag}</span>
                                ))}
                            </div>
                        )}
                    </SectionCard>
                </div>

                {/* ── RIGHT COLUMN ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* Publish */}
                    <SectionCard icon="bx bx-send" iconColor="#062c15" title="Publish">
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '10px 12px', background: '#f9fafb', borderRadius: '6px',
                            border: '1px solid #e5e7eb', marginBottom: '12px',
                        }}>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>Current Status</span>
                            <span style={{
                                padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700',
                                background: formData.status === 'PUBLISHED' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
                                color: formData.status === 'PUBLISHED' ? '#16a34a' : '#d97706',
                            }}>{formData.status}</span>
                        </div>

                        <div style={{ marginBottom: '14px' }}>
                            <label style={{ fontSize: '12px', fontWeight: '700', color: '#111827', display: 'block', marginBottom: '6px' }}>Set Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} style={{ ...inputStyle }}>
                                <option value="DRAFT">DRAFT</option>
                                <option value="PUBLISHED">PUBLISHED</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <button onClick={() => handleSubmit()} style={{
                                width: '100%', padding: '10px 0', borderRadius: '7px', border: 'none',
                                background: '#062c15', color: '#fff', fontSize: '13px',
                                fontWeight: '700', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                            }}>
                                <i className="bx bx-check-circle" style={{ fontSize: '16px' }}></i>
                                {isEdit ? "Update Blog" : formData.status === 'PUBLISHED' ? "Publish Now" : "Save Blog"}
                            </button>

                            {!isEdit && (
                                <button onClick={() => handleSubmit('DRAFT')} style={{
                                    width: '100%', padding: '10px 0', borderRadius: '7px',
                                    border: '1px solid #d1d5db', background: '#f9fafb',
                                    color: '#374151', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                                }}>
                                    <i className="bx bx-save" style={{ fontSize: '16px' }}></i> Save as Draft
                                </button>
                            )}

                            <button onClick={() => navigate('/blogs')} style={{
                                width: '100%', padding: '10px 0', borderRadius: '7px',
                                border: '1px solid #fecaca', background: '#fff',
                                color: '#dc2626', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                            }}>
                                <i className="bx bx-x" style={{ fontSize: '16px' }}></i> Cancel
                            </button>
                        </div>
                    </SectionCard>

                    {/* Author & Category */}
                    <SectionCard icon="bx bx-user" iconColor="#2563eb" title="Author & Category">
                        <Field label="Author" required error={errors.author}>
                            <input
                                name="author" value={formData.author} onChange={handleChange}
                                placeholder="Author name..."
                                style={inputStyle}
                            />
                        </Field>
                        <Field label="Category" style={{ marginBottom: 0 }}>
                            <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </Field>
                    </SectionCard>

                    {/* Live Preview */}
                    <SectionCard icon="bx bx-show" iconColor="#7c3aed" title="Live Preview">
                        <div style={{
                            height: '90px', background: 'linear-gradient(135deg, #062c15, #0a4a24)',
                            borderRadius: '8px', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', marginBottom: '12px', position: 'relative',
                        }}>
                            <i className="bx bx-news" style={{ fontSize: '36px', color: 'rgba(255,255,255,0.25)' }}></i>
                            {formData.category && (
                                <span style={{
                                    position: 'absolute', bottom: '8px', left: '10px',
                                    padding: '2px 8px', borderRadius: '10px', fontSize: '10px',
                                    fontWeight: '600', background: 'rgba(255,255,255,0.15)', color: '#fff',
                                }}>{formData.category}</span>
                            )}
                        </div>

                        <p style={{
                            margin: '0 0 6px', fontSize: '13px', fontWeight: '700',
                            color: formData.title ? '#111827' : '#9ca3af',
                            lineHeight: 1.4, fontStyle: formData.title ? 'normal' : 'italic',
                        }}>
                            {formData.title || 'No title yet...'}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#6b7280', marginBottom: '8px' }}>
                            <i className="bx bx-user" style={{ fontSize: '12px' }}></i>
                            <span>{formData.author || 'Unknown Author'}</span>
                            <span style={{ color: '#d1d5db' }}>•</span>
                            <span style={{
                                padding: '1px 7px', borderRadius: '10px', fontSize: '10px', fontWeight: '600',
                                background: formData.status === 'PUBLISHED' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
                                color: formData.status === 'PUBLISHED' ? '#16a34a' : '#d97706',
                            }}>{formData.status}</span>
                        </div>

                        <p style={{
                            margin: 0, fontSize: '11px', color: '#6b7280', lineHeight: 1.6,
                            display: '-webkit-box', WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical', overflow: 'hidden',
                            fontStyle: formData.content ? 'normal' : 'italic',
                        }}>
                            {formData.content || 'No content yet...'}
                        </p>

                        {tagList.length > 0 && (
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '10px' }}>
                                {tagList.slice(0, 3).map((tag, i) => (
                                    <span key={i} style={{
                                        padding: '2px 8px', borderRadius: '10px', fontSize: '10px',
                                        fontWeight: '600', background: '#f3f4f6', color: '#374151',
                                    }}>#{tag}</span>
                                ))}
                                {tagList.length > 3 && (
                                    <span style={{ fontSize: '10px', color: '#9ca3af', padding: '2px 4px' }}>+{tagList.length - 3} more</span>
                                )}
                            </div>
                        )}
                    </SectionCard>
                </div>
            </div>
        </>
    );
};

export default BlogCreate;
