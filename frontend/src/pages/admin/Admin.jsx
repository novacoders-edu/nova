import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  MessageSquare,
  Trash2,
  Shield,
  CheckCircle,
  XCircle,
  Loader2,
  LogOut,
  LayoutDashboard,
  Search,
  Bell,
  ChevronRight,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Globe
} from "lucide-react";
import { memberAPI, contactAPI } from "../../api/api";

// Toast Notification Component
const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.3 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    className={`fixed bottom-4 right-4 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border ${type === 'success'
        ? 'bg-green-500/10 border-green-500/20 text-green-400'
        : 'bg-red-500/10 border-red-500/20 text-red-400'
      } z-50`}
  >
    {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
    <span className="font-medium">{message}</span>
    <button onClick={onClose} className="ml-4 hover:opacity-70 transition-opacity">
      <XCircle className="w-4 h-4 opacity-50" />
    </button>
  </motion.div>
);

// Delete Confirmation Modal
const DeleteModal = ({ isOpen, onClose, onConfirm, loading, title, message }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-slate-900 border border-slate-700/50 p-6 rounded-2xl shadow-2xl z-50 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-400" />
            {title}
          </h3>
          <p className="text-gray-400 mb-6">{message}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-xl font-medium text-gray-300 hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-4 py-2 rounded-xl font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const Admin = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("members");
  const [members, setMembers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, type: null });

  const isAdmin = user?.role === 'admin' || user?.email?.includes('admin') || user?.isAdmin;

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchData();
    }
  }, [isAuthenticated, isAdmin, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "members") {
        const result = await memberAPI.getAll();
        if (result.success) {
          setMembers(result.data.data?.members || []);
        } else {
          showToast(result.error?.message || "Failed to fetch members", 'error');
        }
      } else if (activeTab === "contacts") {
        const result = await contactAPI.getAll();
        if (result.success) {
          setContacts(result.data.data || []);
        } else {
          showToast(result.error?.message || "Failed to fetch contacts", 'error');
        }
      }
    } catch (err) {
      showToast("Network error occurred", 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const confirmDelete = (id, type) => {
    setDeleteModal({ isOpen: true, id, type });
  };

  const handleDelete = async () => {
    const { id, type } = deleteModal;
    setActionLoading(id);

    try {
      if (type === 'member') {
        const result = await memberAPI.delete(id);
        if (result.success) {
          setMembers(members.filter(m => m._id !== id));
          showToast("Member deleted successfully");
        } else {
          showToast(result.error?.message || "Failed to delete member", 'error');
        }
      } else {
        const result = await contactAPI.delete(id);
        if (result.success) {
          setContacts(contacts.filter(c => c._id !== id));
          showToast("Contact message deleted successfully");
        } else {
          showToast(result.error?.message || "Failed to delete contact", 'error');
        }
      }
    } catch (err) {
      showToast("Network error occurred", 'error');
    } finally {
      setActionLoading(null);
      setDeleteModal({ isOpen: false, id: null, type: null });
    }
  };

  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-10 rounded-3xl shadow-2xl max-w-md w-full mx-4"
        >
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
            <Shield className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Access Denied</h1>
          <p className="text-slate-400 mb-8">You don't have the required administrative privileges to view this area.</p>
          <a href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
            Return Home
          </a>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: "members", label: "Members Directory", icon: Users, count: members.length, color: "text-blue-400", bg: "bg-blue-500/10" },
    { id: "contacts", label: "Contact Inquiries", icon: MessageSquare, count: contacts.length, color: "text-purple-400", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col md:flex-row overflow-hidden relative mt-20">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-full md:w-72 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/60 flex flex-col z-20 shrink-0"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/10">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Nova Admin
            </h2>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${isActive
                      ? 'bg-slate-800/80 border border-slate-700/50 shadow-lg'
                      : 'hover:bg-slate-800/40 border border-transparent'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isActive ? tab.bg : 'bg-slate-800'} transition-colors`}>
                      <Icon className={`w-5 h-5 ${isActive ? tab.color : 'text-slate-400'}`} />
                    </div>
                    <span className={`font-medium ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {tab.label}
                    </span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-slate-500" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800/60">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 border border-slate-700/30">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold ring-2 ring-slate-600">
              {(user?.fullName || user?.userName || "A")[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-white truncate text-sm">{user?.fullName || user?.userName}</p>
              <p className="text-xs text-slate-500 truncate">Administrator</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden z-10">
        {/* Topbar */}
        <header className="h-20 bg-slate-900/30 backdrop-blur-md border-b border-slate-800/60 flex items-center justify-between px-8 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {activeTab === 'members' ? 'Members Overview' : 'Contact Inquiries'}
            </h1>
            <p className="text-sm text-slate-400">
              {activeTab === 'members' ? 'Manage your community members' : 'Review and handle incoming messages'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-slate-800/50 border border-slate-700/50 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow w-64"
              />
            </div>
            <button className="p-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              {contacts.filter(c => c.status === 'new').length > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-[#0f172a]" />
              )}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm rounded-2xl p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users className="w-24 h-24" />
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">Total Members</p>
              <h3 className="text-4xl font-bold text-white">{members.length}</h3>
              <div className="mt-4 flex items-center text-xs text-green-400">
                <span className="bg-green-500/10 px-2 py-1 rounded-full">+Active community</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm rounded-2xl p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <MessageSquare className="w-24 h-24" />
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">Total Contacts</p>
              <h3 className="text-4xl font-bold text-white">{contacts.length}</h3>
              <div className="mt-4 flex items-center text-xs text-blue-400">
                <span className="bg-blue-500/10 px-2 py-1 rounded-full">All messages</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm rounded-2xl p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Bell className="w-24 h-24" />
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">New Inquiries</p>
              <h3 className="text-4xl font-bold text-white">{contacts.filter(c => c.status === 'new').length || 0}</h3>
              <div className="mt-4 flex items-center text-xs text-red-400">
                <span className="bg-red-500/10 px-2 py-1 rounded-full">Requires attention</span>
              </div>
            </motion.div>
          </div>

          {/* Main List */}
          <div className="bg-slate-900/40 border border-slate-800/60 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl">
            {loading ? (
              <div className="h-64 flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
                <p className="text-slate-400 font-medium">Loading data...</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {activeTab === 'members' && (
                  <motion.div
                    key="members"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {members.length === 0 ? (
                      <div className="p-12 text-center">
                        <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-white">No Members Found</h3>
                        <p className="text-slate-400 mt-1">Your community is currently empty.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-300">
                          <thead className="text-xs text-slate-400 uppercase bg-slate-800/50 border-b border-slate-700/50">
                            <tr>
                              <th className="px-6 py-4 font-semibold tracking-wider">Member</th>
                              <th className="px-6 py-4 font-semibold tracking-wider">Contact Info</th>
                              <th className="px-6 py-4 font-semibold tracking-wider">Education</th>
                              <th className="px-6 py-4 font-semibold tracking-wider">Joined</th>
                              <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {members.map((member) => (
                              <tr key={member._id} className="hover:bg-slate-800/30 transition-colors group">
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                                      {(member.fullName || "U")[0].toUpperCase()}
                                    </div>
                                    <div>
                                      <div className="font-semibold text-white">{member.fullName}</div>
                                      <div className="text-xs text-slate-500 truncate max-w-[150px]">{member.interests}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex flex-col gap-1">
                                    <span className="flex items-center gap-2 text-slate-300"><Mail className="w-3 h-3 text-slate-500" /> {member.email}</span>
                                    <span className="flex items-center gap-2 text-slate-400"><Phone className="w-3 h-3 text-slate-500" /> {member.phone}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex flex-col gap-1">
                                    <span className="flex items-center gap-2 text-slate-300"><GraduationCap className="w-3 h-3 text-slate-500" /> {member.university}</span>
                                    <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded w-fit">Year: {member.year}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="flex items-center gap-2 text-slate-400"><Calendar className="w-3 h-3 text-slate-500" /> {new Date(member.createdAt).toLocaleDateString()}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <button
                                    onClick={() => confirmDelete(member._id, 'member')}
                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'contacts' && (
                  <motion.div
                    key="contacts"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-6"
                  >
                    {contacts.length === 0 ? (
                      <div className="col-span-full p-12 text-center">
                        <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-white">No Contact Messages</h3>
                        <p className="text-slate-400 mt-1">Inbox is empty.</p>
                      </div>
                    ) : (
                      contacts.map((contact) => (
                        <div key={contact._id} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/60 transition-colors group relative">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xl">
                                {(contact.name || "U")[0].toUpperCase()}
                              </div>
                              <div>
                                <h4 className="font-bold text-white text-lg">{contact.name}</h4>
                                <span className="text-xs text-slate-400">{new Date(contact.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${contact.status === 'new' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                contact.status === 'read' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                  contact.status === 'replied' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                    'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                              }`}>
                              {contact.status ? contact.status.toUpperCase() : 'NEW'}
                            </span>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                              <Mail className="w-4 h-4 text-slate-500" /> {contact.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                              <Phone className="w-4 h-4 text-slate-500" /> {contact.phone}
                            </div>
                            {contact.url && (
                              <div className="flex items-center gap-2 text-sm text-blue-400">
                                <Globe className="w-4 h-4 text-slate-500" />
                                <a href={contact.url} target="_blank" rel="noreferrer" className="hover:underline">{contact.url}</a>
                              </div>
                            )}
                          </div>

                          <div className="bg-slate-900/50 rounded-xl p-4 text-sm text-slate-300 border border-slate-700/30">
                            {contact.message}
                          </div>

                          <button
                            onClick={() => confirmDelete(contact._id, 'contact')}
                            className="absolute top-6 right-6 p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {toast.show && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false, message: '', type: 'success' })} />
        )}
      </AnimatePresence>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null, type: null })}
        onConfirm={handleDelete}
        loading={actionLoading !== null}
        title={`Delete ${deleteModal.type === 'member' ? 'Member' : 'Contact Message'}`}
        message={`Are you sure you want to permanently delete this ${deleteModal.type}? This action cannot be undone.`}
      />

      {/* Global styling for custom scrollbar within this component scope */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(51, 65, 85, 0.5); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(71, 85, 105, 0.8); }
      `}</style>
    </div>
  );
};

export default Admin;