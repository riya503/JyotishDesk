import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Search, ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/Common/PageHeader';
import Button from '../components/Common/Button';
import DataTable from '../components/Common/DataTable';
import SearchBar from '../components/Common/SearchBar';
import Modal from '../components/Common/Modal';
import Input from '../components/Common/Input';
import clientService from '../services/clientService';

export default function ClientsList() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Add Client Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    tob: '',
    pob: '',
    problemCategory: 'Career'
  });

  // Handle Search and Filter logic
  const filteredClients = clients.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = categoryFilter === 'All' || c.problemCategory === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await clientService.getClients();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient(prev => ({ ...prev, [name]: value }));
  };

  const handleAddClientSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedClient = await clientService.createClient(newClient);
      setClients(prev => [addedClient, ...prev]);
      setModalOpen(false);
      // Reset form
      setNewClient({
        name: '',
        phone: '',
        email: '',
        dob: '',
        tob: '',
        pob: '',
        problemCategory: 'Career'
      });
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  const columns = [
    {
      header: "Name",
      accessor: "name",
      render: (row) => (
        <div className="font-semibold text-gray-900 dark:text-white hover:text-[#8B5CF6] transition-colors">
          {row.name}
        </div>
      )
    },
    { header: "Phone", accessor: "phone" },
    { header: "Email", accessor: "email" },
    {
      header: "Birth Details",
      accessor: "dob",
      render: (row) => (
        <div className="text-xs text-gray-600 dark:text-gray-400">
          <div>{row.dob} ({row.tob})</div>
          <div className="text-[10px] text-gray-500 dark:text-gray-400">{row.pob}</div>
        </div>
      )
    },
    {
      header: "Primary Problem",
      accessor: "problemCategory",
      render: (row) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] text-gray-700 dark:text-gray-300">
          {row.problemCategory}
        </span>
      )
    },
    {
      header: "Action",
      accessor: "action",
      render: (row) => (
        <Button 
          variant="ghost" 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/dashboard/clients/${row.id}`);
          }}
          className="p-1 text-[#8B5CF6] hover:text-gray-900 dark:text-white"
          icon={<ArrowUpRight className="w-4 h-4" />}
        >
          View Profile
        </Button>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Clients Directory" 
        description="Search, view, and manage your complete astrology client records."
        actions={
          <Button 
            onClick={() => setModalOpen(true)}
            icon={<UserPlus className="w-4.5 h-4.5" />}
          >
            Add Client
          </Button>
        }
      />

      {/* Table Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-4">
        <SearchBar 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Search client name, phone, or email..."
        />
        
        {/* Category Filters */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Category:</span>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] text-gray-900 dark:text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-[#8B5CF6] cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Career">Career</option>
            <option value="Marriage">Marriage</option>
            <option value="Finance">Finance</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Main Clients Table */}
      <DataTable 
        columns={columns} 
        data={filteredClients} 
        onRowClick={(row) => navigate(`/dashboard/clients/${row.id}`)}
        emptyMessage="No clients matching current filters found."
      />

      {/* Add Client Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title="Add New Client Profile"
        size="lg"
      >
        <form onSubmit={handleAddClientSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input 
              label="Full Name" 
              name="name" 
              value={newClient.name} 
              onChange={handleInputChange} 
              required 
              placeholder="e.g. Rajesh Kumar"
            />
            <Input 
              label="Phone Number" 
              name="phone" 
              value={newClient.phone} 
              onChange={handleInputChange} 
              required 
              placeholder="e.g. +91 99999 88888"
            />
            <Input 
              label="Email Address" 
              name="email" 
              value={newClient.email} 
              type="email"
              onChange={handleInputChange} 
              placeholder="e.g. rajesh@example.com"
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#9CA3AF]">Problem Category</label>
              <select
                name="problemCategory"
                value={newClient.problemCategory}
                onChange={handleInputChange}
                className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] text-gray-900 dark:text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
              >
                <option value="Career">Career</option>
                <option value="Marriage">Marriage</option>
                <option value="Finance">Finance</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <Input 
              label="Date of Birth" 
              name="dob" 
              type="date"
              value={newClient.dob} 
              onChange={handleInputChange} 
              required
            />
            <Input 
              label="Time of Birth" 
              name="tob" 
              type="time"
              value={newClient.tob} 
              onChange={handleInputChange} 
              required
            />
            <div className="md:col-span-2">
              <Input 
                label="Place of Birth" 
                name="pob" 
                value={newClient.pob} 
                onChange={handleInputChange} 
                required 
                placeholder="City, State, Country (e.g. Pune, Maharashtra, India)"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-[#2A2A2A] pt-4 mt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Client Profile
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
