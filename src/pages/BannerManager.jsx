import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  EyeOff,
  Save,
  MoveUp,
  MoveDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BannerManager() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    media_type: 'image',
    desktop_url: '',
    laptop_url: '',
    tablet_url: '',
    mobile_url: '',
    cta_text: '',
    cta_link: '',
    position: 0,
    is_active: true
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await base44.auth.me();
      
      if (currentUser.role !== 'admin') {
        window.location.href = createPageUrl('Home');
        return;
      }

      setUser(currentUser);
      const data = await base44.entities.SiteBanner.list('position');
      setBanners(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading banners:', error);
      window.location.href = createPageUrl('Home');
    }
  };

  const handleSave = async () => {
    if (editingBanner) {
      await base44.entities.SiteBanner.update(editingBanner.id, formData);
    } else {
      await base44.entities.SiteBanner.create(formData);
    }
    
    setShowDialog(false);
    setEditingBanner(null);
    setFormData({
      title: '',
      subtitle: '',
      media_type: 'image',
      desktop_url: '',
      laptop_url: '',
      tablet_url: '',
      mobile_url: '',
      cta_text: '',
      cta_link: '',
      position: 0,
      is_active: true
    });
    loadData();
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData(banner);
    setShowDialog(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this banner?')) {
      await base44.entities.SiteBanner.delete(id);
      loadData();
    }
  };

  const toggleActive = async (banner) => {
    await base44.entities.SiteBanner.update(banner.id, { is_active: !banner.is_active });
    loadData();
  };

  const movePosition = async (banner, direction) => {
    const newPosition = direction === 'up' ? banner.position - 1 : banner.position + 1;
    await base44.entities.SiteBanner.update(banner.id, { position: newPosition });
    loadData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading banners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-black text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <Link to={createPageUrl('AdminDashboard')} className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black">Banner Manager</h1>
              <p className="text-gray-400 mt-2">{banners.length} banners</p>
            </div>
            <Button
              onClick={() => {
                setEditingBanner(null);
                setFormData({
                  title: '',
                  subtitle: '',
                  media_type: 'image',
                  desktop_url: '',
                  laptop_url: '',
                  tablet_url: '',
                  mobile_url: '',
                  cta_text: '',
                  cta_link: '',
                  position: banners.length,
                  is_active: true
                });
                setShowDialog(true);
              }}
              className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Banner
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-4">
          <AnimatePresence>
            {banners.map((banner, index) => (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {banner.media_type === 'video' ? (
                        <video
                          src={banner.desktop_url || banner.laptop_url || banner.tablet_url || banner.mobile_url}
                          className="w-48 h-32 object-cover rounded-lg"
                          muted
                          loop
                          autoPlay
                        />
                      ) : (
                        <img
                          src={banner.desktop_url || banner.laptop_url || banner.tablet_url || banner.mobile_url}
                          alt={banner.title}
                          className="w-48 h-32 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-2xl font-bold">{banner.title}</h3>
                            {banner.subtitle && (
                              <p className="text-gray-600 mt-1">{banner.subtitle}</p>
                            )}
                          </div>
                          <button
                            onClick={() => toggleActive(banner)}
                            className={`p-2 rounded-lg ${
                              banner.is_active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            {banner.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                          </button>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(banner)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => movePosition(banner, 'up')}
                            disabled={index === 0}
                          >
                            <MoveUp className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => movePosition(banner, 'down')}
                            disabled={index === banners.length - 1}
                          >
                            <MoveDown className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(banner.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingBanner ? 'Edit Banner' : 'Add New Banner'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">Title *</label>
              <Input
                placeholder="Banner title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Subtitle</label>
              <Input
                placeholder="Banner subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Media Type *</label>
              <select
                value={formData.media_type}
                onChange={(e) => setFormData({ ...formData, media_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Desktop (1920x1080) *</label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://..."
                  value={formData.desktop_url}
                  onChange={(e) => setFormData({ ...formData, desktop_url: e.target.value })}
                />
                <Button
                  type="button"
                  onClick={async () => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = formData.media_type === 'video' ? 'video/*' : 'image/*';
                    input.onchange = async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setUploading(true);
                        const { file_url } = await base44.integrations.Core.UploadFile({ file });
                        setFormData({ ...formData, desktop_url: file_url });
                        setUploading(false);
                      }
                    };
                    input.click();
                  }}
                  disabled={uploading}
                >
                  Upload
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Laptop (1366x768)</label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://..."
                  value={formData.laptop_url}
                  onChange={(e) => setFormData({ ...formData, laptop_url: e.target.value })}
                />
                <Button
                  type="button"
                  onClick={async () => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = formData.media_type === 'video' ? 'video/*' : 'image/*';
                    input.onchange = async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setUploading(true);
                        const { file_url } = await base44.integrations.Core.UploadFile({ file });
                        setFormData({ ...formData, laptop_url: file_url });
                        setUploading(false);
                      }
                    };
                    input.click();
                  }}
                  disabled={uploading}
                >
                  Upload
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Tablet (768x1024)</label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://..."
                  value={formData.tablet_url}
                  onChange={(e) => setFormData({ ...formData, tablet_url: e.target.value })}
                />
                <Button
                  type="button"
                  onClick={async () => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = formData.media_type === 'video' ? 'video/*' : 'image/*';
                    input.onchange = async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setUploading(true);
                        const { file_url } = await base44.integrations.Core.UploadFile({ file });
                        setFormData({ ...formData, tablet_url: file_url });
                        setUploading(false);
                      }
                    };
                    input.click();
                  }}
                  disabled={uploading}
                >
                  Upload
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Mobile (375x667)</label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://..."
                  value={formData.mobile_url}
                  onChange={(e) => setFormData({ ...formData, mobile_url: e.target.value })}
                />
                <Button
                  type="button"
                  onClick={async () => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = formData.media_type === 'video' ? 'video/*' : 'image/*';
                    input.onchange = async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setUploading(true);
                        const { file_url } = await base44.integrations.Core.UploadFile({ file });
                        setFormData({ ...formData, mobile_url: file_url });
                        setUploading(false);
                      }
                    };
                    input.click();
                  }}
                  disabled={uploading}
                >
                  Upload
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Call to Action Text</label>
              <Input
                placeholder="e.g., Join Now"
                value={formData.cta_text}
                onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Call to Action Link</label>
              <Input
                placeholder="e.g., /packages"
                value={formData.cta_link}
                onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Position</label>
              <Input
                type="number"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: parseInt(e.target.value) })}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4"
              />
              <label className="text-sm font-medium">Active</label>
            </div>
            <Button
              onClick={handleSave}
              className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-bold"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Banner
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}