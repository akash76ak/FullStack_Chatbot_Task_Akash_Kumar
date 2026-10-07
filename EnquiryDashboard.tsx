import React, { useEffect, useState } from 'react';
import { Search, Trash2 } from 'lucide-react';

interface Enquiry { id:number; name:string; email:string; phone:string; service:string; message:string; status:string; createdAt:string; }

export const EnquiryDashboard: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchEnquiries = async () => {
    try {
      const query = new URLSearchParams({search, status:statusFilter}).toString();
      const res = await fetch(`http://localhost:5000/api/enquiries?${query}`);
      setEnquiries(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchEnquiries(); }, [search, statusFilter]);

  const updateStatus = async (id:number, status:string) => {
    await fetch(`http://localhost:5000/api/enquiries/${id}`, {method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({status})});
    fetchEnquiries();
  };

  const deleteEnquiry = async (id:number) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    await fetch(`http://localhost:5000/api/enquiries/${id}`, {method:'DELETE'});
    fetchEnquiries();
  };

  return <div className="dashboard">
    <h2>Admin Enquiry Dashboard</h2>
    <div className="filters">
      <div className="search"><Search size={19}/><input placeholder="Search by name, email or phone..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
        <option>All</option><option>Pending</option><option>In Progress</option><option>Resolved</option>
      </select>
    </div>
    <div className="table-wrap"><table><thead><tr><th>ID</th><th>Customer</th><th>Service</th><th>Message</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>{enquiries.length===0 ? <tr><td colSpan={6} className="empty">No enquiries found.</td></tr> : enquiries.map(e=>
        <tr key={e.id}><td>#{e.id}</td><td><strong>{e.name}</strong><small>{e.email} | {e.phone}</small></td><td>{e.service}</td><td className="truncate">{e.message}</td>
        <td><select value={e.status} onChange={ev=>updateStatus(e.id,ev.target.value)}><option>Pending</option><option>In Progress</option><option>Resolved</option></select></td>
        <td><button className="delete" onClick={()=>deleteEnquiry(e.id)}><Trash2 size={17}/></button></td></tr>
      )}</tbody>
    </table></div>
  </div>;
};