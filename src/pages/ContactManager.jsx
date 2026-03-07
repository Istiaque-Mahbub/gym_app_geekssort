// import React, { useState, useEffect } from 'react';
// import { base44 } from '@/api/base44Client';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { createPageUrl } from '@/utils';
// import { 
//   ArrowLeft, 
//   Mail, 
//   Phone, 
//   MessageSquare, 
//   Clock,
//   CheckCircle,
//   Eye,
//   Filter,
//   Search
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from '@/components/ui/card';
// import { usePermissions } from '@/components/PermissionCheck';

// export default function ContactManager() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [contacts, setContacts] = useState([]);
//   const [filter, setFilter] = useState('all');
//   const [search, setSearch] = useState('');
//   const { hasPermission, loading: permissionsLoading } = usePermissions();

//   useEffect(() => {
//     loadData();
//   }, []);

// //   useEffect(() => {
// //     if (!permissionsLoading && !hasPermission('InquiryManager')) {
// //       window.location.href = createPageUrl('AdminDashboard');
// //     }
// //   }, [permissionsLoading, hasPermission]);

//   const loadData = async () => {
//     try {
//       const currentUser = await base44.auth.me();
//       setUser(currentUser);
      
//       const data = await base44.entities.contact.list('-created_date');
//       setContacts(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error loading inquiries:', error);
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     await base44.entities.contact.update(id, { status });
//     setContacts(contacts.map(i => i.id === id ? { ...i, status } : i));
//   };

//   const filteredContacts = contacts.filter(contact => {
//     const matchesFilter = filter === 'all' || contact.status === filter;
//     const matchesSearch = search === '' || 
//       contact.name.toLowerCase().includes(search.toLowerCase()) ||
//       contact.email.toLowerCase().includes(search.toLowerCase()) ||
//       contact.message.toLowerCase().includes(search.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   if (loading || permissionsLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading contacts...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <div className="bg-black text-white py-8 px-6 shadow-lg">
//         <div className="max-w-7xl mx-auto">
//           <Link to={createPageUrl('AdminDashboard')} className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-4">
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back to Dashboard
//           </Link>
//           <h1 className="text-4xl font-black">Contact Manager</h1>
//           <p className="text-gray-400 mt-2">{filteredContacts.length} contact found</p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         {/* Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <div className="flex gap-2">
//             <Button
//               onClick={() => setFilter('all')}
//               variant={filter === 'all' ? 'default' : 'outline'}
//               className={filter === 'all' ? 'bg-yellow-400 text-black hover:bg-yellow-500' : ''}
//             >
//               All
//             </Button>
//             <Button
//               onClick={() => setFilter('new')}
//               variant={filter === 'new' ? 'default' : 'outline'}
//               className={filter === 'new' ? 'bg-yellow-400 text-black hover:bg-yellow-500' : ''}
//             >
//               New
//             </Button>
//             <Button
//               onClick={() => setFilter('read')}
//               variant={filter === 'read' ? 'default' : 'outline'}
//               className={filter === 'read' ? 'bg-yellow-400 text-black hover:bg-yellow-500' : ''}
//             >
//               Read
//             </Button>
//             <Button
//               onClick={() => setFilter('responded')}
//               variant={filter === 'responded' ? 'default' : 'outline'}
//               className={filter === 'responded' ? 'bg-yellow-400 text-black hover:bg-yellow-500' : ''}
//             >
//               Responded
//             </Button>
//           </div>
          
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <Input
//                 placeholder="Search contacts..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Inquiries List */}
//         <div className="space-y-4">
//           <AnimatePresence>
//             {filteredContacts.map((contact, index) => (
//               <motion.div
//                 key={contact.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <Card className={`hover:shadow-xl transition-all ${
//                   contact.status === 'new' ? 'border-l-4 border-l-yellow-400' : ''
//                 }`}>
//                   <CardContent className="p-6">
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex items-center gap-3">
//                         <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
//                           contact.status === 'new' ? 'bg-yellow-100' :
//                           contact.status === 'read' ? 'bg-blue-100' :
//                           'bg-green-100'
//                         }`}>
//                           {contact.status === 'new' ? <MessageSquare className="w-6 h-6 text-yellow-600" /> :
//                            contact.status === 'read' ? <Eye className="w-6 h-6 text-blue-600" /> :
//                            <CheckCircle className="w-6 h-6 text-green-600" />}
//                         </div>
//                         <div>
//                           <h3 className="text-xl font-bold">{contact.name}</h3>
//                           <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
//                             <span className="flex items-center gap-1">
//                               <Mail className="w-4 h-4" />
//                               {contact.email}
//                             </span>
//                             {contact.phone && (
//                               <span className="flex items-center gap-1">
//                                 <Phone className="w-4 h-4" />
//                                 {contact.phone}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
//                           contact.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
//                           contact.status === 'read' ? 'bg-blue-100 text-blue-800' :
//                           'bg-green-100 text-green-800'
//                         }`}>
//                           {contact.status.toUpperCase()}
//                         </span>
//                         <p className="text-xs text-gray-500 mt-2 flex items-center justify-end gap-1">
//                           <Clock className="w-3 h-3" />
//                           {new Date(contact.created_date).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>

//                     {contact.subject && (
//                       <p className="text-sm font-bold text-gray-700 mb-2">
//                         Subject: {contact.subject}
//                       </p>
//                     )}

//                     <p className="text-gray-700 mb-4 bg-gray-50 p-4 rounded-lg">
//                       {contact.message}
//                     </p>

//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2 text-sm text-gray-500">
//                         <span className={`px-2 py-1 rounded ${
//                           contact.source === 'contact_page' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
//                         }`}>
//                           {contact.source === 'contact_page' ? 'Contact Page' : 'Chat Widget'}
//                         </span>
//                         {contact.club && <span>• Preferred Club: {contact.club}</span>}
//                       </div>

//                       <div className="flex gap-2">
//                         {contact.status === 'new' && (
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() => updateStatus(contact.id, 'read')}
//                           >
//                             Mark as Read
//                           </Button>
//                         )}
//                         {contact.status !== 'responded' && (
//                           <Button
//                             size="sm"
//                             className="bg-green-600 hover:bg-green-700 text-white"
//                             onClick={() => updateStatus(contact.id, 'responded')}
//                           >
//                             Mark as Responded
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </AnimatePresence>

//           {filteredContacts.length === 0 && (
//             <div className="text-center py-20">
//               <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <p className="text-xl text-gray-500">No contact found</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle,
  Eye,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { usePermissions } from '@/components/PermissionCheck';
import { ContactService } from '@/services/ContactService';

export default function ContactManager() {

  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const { hasPermission, loading: permissionsLoading } = usePermissions();

  useEffect(() => {
    loadContacts();
  }, [filter, search]);

  const loadContacts = async () => {
    try {
      const params = {};

      if (filter !== 'all') {
        params.status = filter;
      }

      if (search) {
        params.search = search;
      }

      const data = await ContactService.getDashboardContacts(params);
      setContacts(data.results || data);
      setLoading(false);

    } catch (error) {
      console.error('Error loading contacts:', error);
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      if (status === 'read') {
        await ContactService.markAsRead(id);
      } else if (status === 'responded') {
        await ContactService.markAsResponded(id);
      }

      loadContacts();

    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  if (loading || permissionsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Header */}
      <div className="bg-black text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <Link
            to={createPageUrl('AdminDashboard')}
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-black">Contact Manager</h1>
          <p className="text-gray-400 mt-2">
            {contacts.length} contact found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">

          <div className="flex gap-2">
            <Button
              onClick={() => setFilter('all')}
              variant={filter === 'all' ? 'default' : 'outline'}
              className={filter === 'all' ? 'bg-yellow-400 text-black hover:bg-yellow-500' : ''}
            >
              All
            </Button>

            <Button
              onClick={() => setFilter('new')}
              variant={filter === 'new' ? 'default' : 'outline'}
              className={filter === 'new' ? 'bg-yellow-400 text-black hover:bg-yellow-500' : ''}
            >
              New
            </Button>

            <Button
              onClick={() => setFilter('read')}
              variant={filter === 'read' ? 'default' : 'outline'}
              className={filter === 'read' ? 'bg-yellow-400 text-black hover:bg-yellow-500' : ''}
            >
              Read
            </Button>

            <Button
              onClick={() => setFilter('responded')}
              variant={filter === 'responded' ? 'default' : 'outline'}
              className={filter === 'responded' ? 'bg-yellow-400 text-black hover:bg-yellow-500' : ''}
            >
              Responded
            </Button>
          </div>

          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

        </div>

        {/* Contact List */}
        <div className="space-y-4">
          <AnimatePresence>
            {contacts.map((contact, index) => (

              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >

                <Card className={`hover:shadow-xl transition-all ${
                  contact.status === 'new' ? 'border-l-4 border-l-yellow-400' : ''
                }`}>

                  <CardContent className="p-6">

                    <div className="flex items-start justify-between mb-4">

                      <div className="flex items-center gap-3">

                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          contact.status === 'new' ? 'bg-yellow-100' :
                          contact.status === 'read' ? 'bg-blue-100' :
                          'bg-green-100'
                        }`}>

                          {contact.status === 'new' ? (
                            <MessageSquare className="w-6 h-6 text-yellow-600" />
                          ) : contact.status === 'read' ? (
                            <Eye className="w-6 h-6 text-blue-600" />
                          ) : (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          )}

                        </div>

                        <div>
                          <h3 className="text-xl font-bold">
                            {contact.name}
                          </h3>

                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {contact.email}
                            </span>

                            {contact.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                {contact.phone}
                              </span>
                            )}
                          </div>
                        </div>

                      </div>

                      <div className="text-right">

                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          contact.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                          contact.status === 'read' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {contact.status.toUpperCase()}
                        </span>

                        <p className="text-xs text-gray-500 mt-2 flex items-center justify-end gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(contact.created_at).toLocaleDateString()}
                        </p>

                      </div>

                    </div>

                    {contact.subject && (
                      <p className="text-sm font-bold text-gray-700 mb-2">
                        Subject: {contact.subject}
                      </p>
                    )}

                    <p className="text-gray-700 mb-4 bg-gray-50 p-4 rounded-lg">
                      {contact.message}
                    </p>

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {contact.preferred_club && (
                          <span>
                            Preferred Club: {contact.preferred_club_name}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">

                        {contact.status === 'new' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(contact.id, 'read')}
                          >
                            Mark as Read
                          </Button>
                        )}

                        {contact.status !== 'responded' && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => updateStatus(contact.id, 'responded')}
                          >
                            Mark as Responded
                          </Button>
                        )}

                      </div>

                    </div>

                  </CardContent>
                </Card>

              </motion.div>
            ))}
          </AnimatePresence>

          {contacts.length === 0 && (
            <div className="text-center py-20">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">
                No contact found
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
