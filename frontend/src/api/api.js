import axios from "./axiosconfig.jsx";

export const authAPI = {
  register: async (userData) => {
    try {
      const resp = await axios.post("/api/auth/register", userData);
      return { success: true, data: resp.data };
    } catch (err) {
      console.error("authAPI.register error", err);
      return {
        success: false,
        error: err?.response?.data || err.message || String(err),
      };
    }
  },
  login: async (credentials) => {
    try {
      const resp = await axios.post("/api/auth/login", credentials);
      return { success: true, data: resp.data };
    } catch (err) {
      console.error("authAPI.login error", err);
      return {
        success: false,
        error: err?.response?.data || err.message || String(err),
      };
    }
  },
  getCurrentUser: async () => {
    try {
      const resp = await axios.get("/api/auth/me");
      return { success: true, data: resp.data };
    } catch (err) {
      console.error("authAPI.getCurrentUser error", err);
      return {
        success: false,
        error: err?.response?.data || err.message || String(err),
      };
    }
  },
};

export const contactAPI = {
  create: async (contactData) => {
    try {
      const resp = await axios.post("/api/contact/create", contactData);
      return { success: true, data: resp.data };
    } catch (err) {
      console.error("contactAPI.create error", err);
      return {
        success: false,
        error: err?.response?.data || err.message || String(err),
      };
    }
  },
  getAll: async (params) => {
    try {
      const resp = await axios.get("/api/contact/all", { params });
      return { success: true, data: resp.data };
    } catch (err) {
      console.error("contactAPI.getAll error", err);
      return {
        success: false,
        error: err?.response?.data || err.message || String(err),
      };
    }
  },
  delete: async (id) => {
    try {
      const resp = await axios.delete(`/api/contact/${id}`);
      return { success: true, data: resp.data };
    } catch (err) {
      console.error("contactAPI.delete error", err);
      return {
        success: false,
        error: err?.response?.data || err.message || String(err),
      };
    }
  },
};

export const memberAPI = {
  create: async (memberData) => {
    try {
      const resp = await axios.post("/api/member/join-member", memberData);
      return { success: true, data: resp.data };
    } catch (err) {
      console.error("memberAPI.create error", err);
      return {
        success: false,
        error: err?.response?.data || err.message || String(err),
      };
    }
  },

  getAll: async (params) => {
    try {
      const resp = await axios.get("/api/member/all", { params });
      return { success: true, data: resp.data };
    } catch (err) {
      console.error("memberAPI.getAll error", err);
      return {
        success: false,
        error: err?.response?.data || err.message || String(err),
      };
    }
  },
  delete: async (id) => {
    try {
      const resp = await axios.delete(`/api/member/${id}`);
      return { success: true, data: resp.data };
    } catch (err) {
      console.error("memberAPI.delete error", err);
      return {
        success: false,
        error: err?.response?.data || err.message || String(err),
      };
    }
  },
};

export const certificateAPI = {
  addCertificate: async (certificateData) => {
    try {
      const resp = await axios.post(
        "/api/certificate/admin/add",
        certificateData,
      );
      return { success: true, data: resp.data };
    } catch (err) {
      console.error("certificateAPI.addCertificate error", err);
      return {
        success: false,
        error: err?.response?.data || err.message || String(err),
      };
    }
  },
  bulkUploadCertificates: async (certificates) => {
    try {
      const resp = await axios.post(
        "/api/certificate/admin/bulk",
        certificates,
      );
      return { success: true, data: resp.data };
    } catch (err) {
      console.error("certificateAPI.bulkUploadCertificates error", err);
      return {
        success: false,
        error: err?.response?.data || err.message || String(err),
      };
    }
  },
  verifyCertificate: async (certificateId) => {
    try {
      const resp = await axios.get(
        `/api/certificate/verify-certificate/${certificateId}`,
      );
      return { success: true, data: resp.data };
    } catch (err) {
      console.error("certificateAPI.verifyCertificate error", err);
      return {
        success: false,
        error: err?.response?.data || err.message || String(err),
      };
    }
  },
};

export default { authAPI, contactAPI, memberAPI, certificateAPI };
