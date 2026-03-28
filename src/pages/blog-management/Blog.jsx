import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Components/Pagination/Pagination";
import { Tooltip } from "react-tooltip";
import Modal from "../../Components/Modal/Modal";

export const DUMMY_BLOGS = [
    { id: 1, title: "Top 10 Hill Stations in India", category: "Travel", author: "Amit Verma", tags: ["hills", "nature", "travel"], status: "PUBLISHED", views: 4320, createdAt: "2024-01-15", image: null, content: "India is home to some of the most breathtaking hill stations in the world. From the misty valleys of Himachal Pradesh to the lush greenery of Munnar, each destination offers a unique experience. Whether you are looking for adventure, relaxation, or cultural exploration, these hill stations have something for everyone. The cool climate, scenic landscapes, and warm hospitality make them perfect getaways from the hustle and bustle of city life." },
    { id: 2, title: "Best Beach Destinations for Families", category: "Travel", author: "Sneha Patel", tags: ["beach", "family", "vacation"], status: "PUBLISHED", views: 3100, createdAt: "2024-02-10", image: null, content: "Planning a family beach vacation? India's coastline stretches over 7,500 km offering pristine beaches for every type of traveler. From the golden sands of Goa to the serene shores of Andaman, discover the best family-friendly beach destinations that combine fun, safety, and natural beauty." },
    { id: 3, title: "A Guide to Budget Travel in Rajasthan", category: "Budget Travel", author: "Rahul Singh", tags: ["rajasthan", "budget", "heritage"], status: "PUBLISHED", views: 2870, createdAt: "2024-02-28", image: null, content: "Rajasthan, the land of kings, doesn't have to break the bank. With careful planning and the right tips, you can explore magnificent forts, vibrant bazaars, and desert landscapes without spending a fortune. This comprehensive guide covers accommodation, food, transport, and must-see attractions for budget travelers." },
    { id: 4, title: "Monsoon Travel: Hidden Gems of Kerala", category: "Seasonal", author: "Priya Nair", tags: ["kerala", "monsoon", "nature"], status: "DRAFT", views: 0, createdAt: "2024-03-05", image: null, content: "Kerala transforms into a lush paradise during the monsoon season. While most tourists avoid traveling during rains, the true beauty of God's Own Country reveals itself in the monsoon. Discover hidden waterfalls, rejuvenating Ayurveda retreats, and the magical backwaters draped in mist." },
    { id: 5, title: "Solo Travel Safety Tips for Women", category: "Tips & Tricks", author: "Meera Joshi", tags: ["solo", "women", "safety"], status: "PUBLISHED", views: 5600, createdAt: "2024-03-20", image: null, content: "Solo travel for women in India is increasingly popular and absolutely achievable with the right preparation. This guide covers essential safety tips, recommended destinations, packing advice, and how to connect with fellow travelers to make your solo journey safe, empowering, and unforgettable." },
    { id: 6, title: "Luxury Resorts Worth Every Penny", category: "Luxury", author: "Vikram Malhotra", tags: ["luxury", "resort", "premium"], status: "PUBLISHED", views: 1980, createdAt: "2024-04-01", image: null, content: "Sometimes you deserve to splurge. India's luxury resort landscape has evolved dramatically, offering world-class amenities, stunning locations, and personalized experiences. From palace hotels in Udaipur to private island resorts in Lakshadweep, explore the finest luxury accommodations that redefine hospitality." },
    { id: 7, title: "Adventure Sports Hotspots in India", category: "Adventure", author: "Arjun Kapoor", tags: ["adventure", "sports", "thrill"], status: "DRAFT", views: 0, createdAt: "2024-04-15", image: null, content: "For adrenaline junkies, India offers an incredible range of adventure sports across diverse terrains. From white-water rafting in Rishikesh to paragliding in Bir Billing, skiing in Auli to scuba diving in Andaman, this guide covers the top adventure sports destinations and what to expect." },
    { id: 8, title: "Street Food Trail: Mumbai to Delhi", category: "Food & Culture", author: "Kavya Sharma", tags: ["food", "street food", "culture"], status: "PUBLISHED", views: 3450, createdAt: "2024-05-02", image: null, content: "India's street food scene is legendary. Embark on a culinary journey from the vada pav stalls of Mumbai to the chaat corners of Delhi, exploring the flavors, stories, and traditions behind each dish. This food trail will tantalize your taste buds and give you a deeper appreciation of India's diverse culinary heritage." },
];

const CATEGORIES = ["All", "Travel", "Budget Travel", "Seasonal", "Tips & Tricks", "Luxury", "Adventure", "Food & Culture"];
const ITEMS_PER_PAGE = 6;

const Blog = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState(DUMMY_BLOGS);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const filtered = blogs.filter(b => {
        const matchKeyword = b.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            b.author.toLowerCase().includes(searchKeyword.toLowerCase());
        const matchCategory = categoryFilter === "All" || b.category === categoryFilter;
        const matchStatus = statusFilter === "ALL" || b.status === statusFilter;
        return matchKeyword && matchCategory && matchStatus;
    });

    const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleDelete = () => {
        setBlogs(prev => prev.filter(b => b.id !== deleteId));
        setDeleteModal(false);
    };

    const handleToggleStatus = (id) => {
        setBlogs(prev => prev.map(b => b.id === id
            ? { ...b, status: b.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" }
            : b
        ));
    };

    return (
        <>
            <div className="logo-management-card">
                <div className="card-header">
                    <i className="bx bx-news"></i>
                    <h2>Blog Management</h2>
                </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchKeyword}
                    onChange={(e) => { setSearchKeyword(e.target.value); setCurrentPage(1); }}
                    style={{ padding: '8px', width: '280px' }}
                />
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }} style={{ padding: '8px' }}>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} style={{ padding: '8px' }}>
                        <option value="ALL">All Status</option>
                        <option value="PUBLISHED">PUBLISHED</option>
                        <option value="DRAFT">DRAFT</option>
                    </select>
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>{filtered.length} blog{filtered.length !== 1 ? 's' : ''}</span>
                    <span
                        onClick={() => navigate('/blogs/create')}
                        style={{ cursor: 'pointer' }}
                        data-tooltip-id="add-tooltip"
                        data-tooltip-content="Create Blog"
                    >
                        <i className="bx bxs-plus-circle" style={{ fontSize: '30px', color: '#28a745' }}></i>
                    </span>
                </div>
            </div>

            {/* Cards Grid */}
            {paginated.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
                    <i className="bx bx-news" style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}></i>
                    No blogs found.
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                    {paginated.map(blog => (
                        <div key={blog.id} style={{
                            background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px',
                            overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                            transition: 'box-shadow 0.2s ease',
                        }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'}
                        >
                            {/* Card Header */}
                            <div style={{
                                height: '110px', background: 'linear-gradient(135deg, #062c15, #0a4a24)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                            }}>
                                <i className="bx bx-news" style={{ fontSize: '44px', color: 'rgba(255,255,255,0.2)' }}></i>
                                <span style={{
                                    position: 'absolute', top: '10px', left: '10px',
                                    padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600',
                                    background: 'rgba(255,255,255,0.15)', color: '#fff',
                                }}>{blog.category}</span>
                                <span style={{
                                    position: 'absolute', top: '10px', right: '10px',
                                    padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700',
                                    background: blog.status === 'PUBLISHED' ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.15)',
                                    color: blog.status === 'PUBLISHED' ? '#16a34a' : '#d97706',
                                }}>{blog.status}</span>
                            </div>

                            {/* Card Body */}
                            <div style={{ padding: '14px 16px' }}>
                                <h4 style={{ margin: '0 0 6px', fontSize: '14px', fontWeight: '700', color: '#1f2937', lineHeight: 1.4 }}>{blog.title}</h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                                    <span><i className="bx bx-user" style={{ marginRight: '3px' }}></i>{blog.author}</span>
                                    <span><i className="bx bx-calendar" style={{ marginRight: '3px' }}></i>{blog.createdAt}</span>
                                    <span><i className="bx bx-show" style={{ marginRight: '3px' }}></i>{blog.views.toLocaleString()}</span>
                                </div>
                                <p style={{ margin: '0 0 10px', fontSize: '12px', color: '#6b7280', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {blog.content}
                                </p>

                                {/* Tags */}
                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                                    {blog.tags.map(tag => (
                                        <span key={tag} style={{
                                            padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: '600',
                                            background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb',
                                        }}>#{tag}</span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '10px' }}>
                                    <div className="table-action-button">
                                        <div className="action-icon" onClick={() => navigate('/blogs/details', { state: { blog } })} data-tooltip-id="view-tooltip" data-tooltip-content="View">
                                            <i className="bx bx-info-circle text-olive"></i>
                                        </div>
                                        <div className="action-icon" onClick={() => navigate('/blogs/create', { state: { blog } })} data-tooltip-id="edit-tooltip" data-tooltip-content="Edit">
                                            <i className="bx bx-edit text-info"></i>
                                        </div>
                                        <div className="action-icon" onClick={() => handleToggleStatus(blog.id)} data-tooltip-id="status-tooltip" data-tooltip-content="Toggle Status">
                                            <i className={`bx ${blog.status === 'PUBLISHED' ? 'bx-hide' : 'bx-show'} text-warning`}></i>
                                        </div>
                                        <div className="action-icon" onClick={() => { setDeleteId(blog.id); setDeleteModal(true); }} data-tooltip-id="delete-tooltip" data-tooltip-content="Delete">
                                            <i className="bx bx-trash text-danger"></i>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>ID: {blog.id}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                totalItem={filtered.length}
                limitSelect={false}
                itemsPerPage={ITEMS_PER_PAGE}
                showEllipsisAfter={true}
                visiblePageCount={3}
                onPageChange={(page) => setCurrentPage(page)}
            />

            <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)} title="Delete Blog" width="400px">
                <p style={{ textAlign: 'center', padding: '10px 0' }}>Are you sure you want to delete this blog post?</p>
                <div className="button-group-modal">
                    <button className="confirm-button" onClick={handleDelete}>Delete</button>
                    <button className="cancel-button" onClick={() => setDeleteModal(false)}>Cancel</button>
                </div>
            </Modal>

            <Tooltip id="add-tooltip" />
            <Tooltip id="view-tooltip" />
            <Tooltip id="edit-tooltip" />
            <Tooltip id="status-tooltip" />
            <Tooltip id="delete-tooltip" />
        </>
    );
};

export default Blog;
