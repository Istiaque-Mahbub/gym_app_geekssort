import apiClient from '@/lib/apiClient';

export const BlogService = {
  // ==========================
  // page BLOGS
  // ==========================
  getBlogsList: async (params = {}) => {
    const res = await apiClient.get('/blogs/', { params });
    return res.data;
  },
  getBlogDetailPublic: async (slug) => {
    const res = await apiClient.get(`/blogs/${slug}/`);
    return res.data;
  },
  getCategoriesList: async () => {
    const res = await apiClient.get('/blog-categories/');
    return res.data;
  },
  // ==========================
  // DASHBOARD BLOGS
  // ==========================

  getBlogs: async (params = {}) => {
    const res = await apiClient.get('/dashboard/blogs/', { params });
    return res.data;
  },

  getBlogDetail: async (slug) => {
    const res = await apiClient.get(`/dashboard/blogs/${slug}/`);
    return res.data;
  },


  createBlog: async (data) => {
  // data is FormData
  const res = await apiClient.post('/dashboard/blogs/', data, {
      headers: { 'Content-Type': 'multipart/form-data' } // <-- override only here
  });
  return res.data;
  },

  updateBlog: async (id, data) => {
  const res = await apiClient.patch(`/dashboard/blogs/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
  },

  deleteBlog: async (id) => {
    const res = await apiClient.delete(`/dashboard/blogs/${id}/`);
    return res.data;
  },

  getCategories: async () => {
    const res = await apiClient.get('/dashboard/blog-categories/');
    return res.data;
  }
};
