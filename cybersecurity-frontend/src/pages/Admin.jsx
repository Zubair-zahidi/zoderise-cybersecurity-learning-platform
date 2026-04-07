import { useState, useEffect } from 'react';
import { Shield, Users, UserCheck, UserX, Trash2, Crown, Plus, Search } from 'lucide-react';
import axios from '../utils/axios';
import { useAuthStore } from '../store/authStore';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/admin/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId, action, data = {}) => {
    setActionLoading(true);
    try {
      let endpoint = `/admin/users/${userId}`;
      let method = 'patch';

      switch (action) {
        case 'deactivate':
          endpoint += '/deactivate';
          break;
        case 'activate':
          endpoint += '/activate';
          break;
        case 'delete':
          method = 'delete';
          break;
        case 'grant_thunder':
          method = 'post';
          endpoint += '/grant-thunder';
          break;
        case 'add_credits':
          method = 'post';
          endpoint += '/add-credits';
          await axios[method](endpoint, data);
          break;
      }

      if (action !== 'grant_thunder' && action !== 'add_credits') {
        await axios[method](endpoint);
      }

      await fetchUsers(); // Refresh the list
      setSelectedUser(null);
    } catch (error) {
      console.error(`Failed to ${action} user:`, error);
      alert(`Failed to ${action} user. Please try again.`);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading admin panel...</div>
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-slate-400">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-cyan-400" />
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
        </div>
        <p className="text-slate-400 mb-8">Manage users, accounts, and platform settings</p>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-slate-400 text-sm">Total Users</span>
            </div>
            <div className="text-2xl font-bold text-white">{users.length}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="w-5 h-5 text-green-400" />
              <span className="text-slate-400 text-sm">Active Users</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {users.filter(u => u.isActive).length}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-cyan-400" />
              <span className="text-slate-400 text-sm">Thunder Users</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {users.filter(u => u.plan === 'thunder').length}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <UserX className="w-5 h-5 text-red-400" />
              <span className="text-slate-400 text-sm">Inactive Users</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {users.filter(u => !u.isActive).length}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search users by email or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-white"
          />
        </div>

        {/* Users Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Plan</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Credits</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Joined</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-800/50">
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-white font-medium">{u.name}</div>
                        <div className="text-slate-400 text-sm">{u.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        u.plan === 'thunder' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {u.plan === 'thunder' ? 'Thunder' : 'Free'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-white">{u.credits}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        u.isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                      }`}>
                        {u.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-400 text-sm">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {u.isActive ? (
                          <button
                            onClick={() => handleUserAction(u._id, 'deactivate')}
                            disabled={actionLoading}
                            className="text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded border border-red-400/30 hover:border-red-400/60 transition"
                          >
                            Deactivate
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUserAction(u._id, 'activate')}
                            disabled={actionLoading}
                            className="text-green-400 hover:text-green-300 text-sm px-2 py-1 rounded border border-green-400/30 hover:border-green-400/60 transition"
                          >
                            Activate
                          </button>
                        )}
                        <button
                          onClick={() => handleUserAction(u._id, 'grant_thunder')}
                          disabled={actionLoading}
                          className="text-cyan-400 hover:text-cyan-300 text-sm px-2 py-1 rounded border border-cyan-400/30 hover:border-cyan-400/60 transition"
                        >
                          Grant Thunder
                        </button>
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="text-blue-400 hover:text-blue-300 text-sm px-2 py-1 rounded border border-blue-400/30 hover:border-blue-400/60 transition"
                        >
                          Add Credits
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${u.name}?`)) {
                              handleUserAction(u._id, 'delete');
                            }
                          }}
                          disabled={actionLoading}
                          className="text-red-600 hover:text-red-500 text-sm px-2 py-1 rounded border border-red-600/30 hover:border-red-600/60 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No users found</p>
            </div>
          )}
        </div>

        {/* Add Credits Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 max-w-md w-full p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Add Credits to {selectedUser.name}</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const credits = parseInt(e.target.credits.value);
                  if (credits > 0) {
                    handleUserAction(selectedUser._id, 'add_credits', { credits });
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Credits to Add</label>
                  <input
                    type="number"
                    name="credits"
                    min="1"
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="Enter amount"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-700 text-white py-2 px-4 rounded-lg transition"
                  >
                    {actionLoading ? 'Adding...' : 'Add Credits'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="flex-1 border border-slate-600 text-slate-300 py-2 px-4 rounded-lg hover:border-slate-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;