// services/leadService.js
import api from './AxiosInstance';

const LEAD_BASE_URL = 'lead';

class LeadService {
  
  async getAllLeads() {
    try {
      const response = await api.get(`${LEAD_BASE_URL}/leads`);
      return response.data;
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  }

  async getActiveLeads() {
    try {
      const response = await api.get(`${LEAD_BASE_URL}/leads`);
      const allLeads = response.data.data.leads;
      
      // Filter out deleted and trashed leads
      const activeLeads = allLeads.filter(
        (lead) => lead.status !== "Deleted" && lead.status !== "Trashed"
      );
      
      return {
        ...response.data,
        data: {
          ...response.data.data,
          leads: activeLeads
        }
      };
    } catch (error) {
      console.error('Error fetching active leads:', error);
      throw error;
    }
  }

  async getTrashedLeads() {
    try {
      const response = await api.get(`${LEAD_BASE_URL}/leads`);
      const allLeads = response.data.data.leads;
      
      // Filter only trashed leads
      const trashedLeads = allLeads.filter(
        (lead) => lead.status === "Trashed"
      );
      
      return {
        ...response.data,
        data: {
          ...response.data.data,
          leads: trashedLeads
        }
      };
    } catch (error) {
      console.error('Error fetching trashed leads:', error);
      throw error;
    }
  }

  async createLead(leadData) {
    try {
      const payload = {
        institutionDomain: leadData.institutionDomain || "www.anginatlearning.com",
        course: leadData.course,
        applicantName: leadData.applicantName,
        phoneNumber: leadData.phoneNumber,
        email: leadData.email,
        status: leadData.status || "Pending"
      };

      const response = await api.post(`${LEAD_BASE_URL}/create`, payload);
      return response.data;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  }

  async updateLeadStatus(leadId, updateData) {
    try {
      const payload = {
        leadId: leadId,
        updateData: updateData
      };

      const response = await api.patch(`${LEAD_BASE_URL}/lead/status`, payload);
      return response.data;
    } catch (error) {
      console.error('Error updating lead status:', error);
      throw error;
    }
  }

  async deleteLead(leadId) {
    try {
      const payload = {
        leadId: leadId,
        updateData: { status: "Trashed" }
      };

      const response = await api.patch(`${LEAD_BASE_URL}/lead/status`, payload);
      return response.data;
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw error;
    }
  }

  async permanentlyDeleteLead(leadId, leadData) {
    try {
      const payload = {
        leadId: leadId,
        updateData: {
          status: "Deleted",
          course: leadData.course,
          applicantName: leadData.applicantName,
          phoneNumber: leadData.phoneNumber,
          email: leadData.email,
        }
      };

      const response = await api.patch(`${LEAD_BASE_URL}/lead/status`, payload);
      return response.data;
    } catch (error) {
      console.error('Error permanently deleting lead:', error);
      throw error;
    }
  }

  async restoreLead(leadId) {
    try {
      const payload = {
        leadId: leadId,
        updateData: { status: "Pending" }
      };

      const response = await api.patch(`${LEAD_BASE_URL}/lead/status`, payload);
      return response.data;
    } catch (error) {
      console.error('Error restoring lead:', error);
      throw error;
    }
  }

  async updateLead(leadId, leadData) {
    try {
      const payload = {
        leadId: leadId,
        updateData: {
          status: leadData.status,
          course: leadData.course,
          applicantName: leadData.applicantName,
          phoneNumber: leadData.phoneNumber,
          email: leadData.email,
        }
      };

      const response = await api.patch(`${LEAD_BASE_URL}/lead/status`, payload);
      return response.data;
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    }
  }

  // Helper method to format date
  formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}


export default new LeadService();