import api from './AxiosInstance';

const COURSE_BASE_URL = 'course/courses';

class CourseService {
  
  async getAllCourses() {
    try {
      const response = await api.get(`${COURSE_BASE_URL}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }

  async getCourseById(courseId) {
    try {
      const response = await api.get(`${COURSE_BASE_URL}/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course details:', error);
      throw error;
    }
  }

  async createCourse(courseData, thumbnail) {
    try {
      const instituteDetails = JSON.parse(localStorage.getItem('InstitutionDetails') || '{}');
      
      const payload = {
        institutionCode: instituteDetails.institutionCode,
        institution: instituteDetails._id,
        courseName: courseData.courseName,
        description: courseData.description,
        pricingType: courseData.pricingType,
        languages: courseData.languages,
        batches: courseData.batches || [],
        status: "active",
      };

      if (courseData.pricingType === 'one-time') {
        payload.price = courseData.price;
      } else if (courseData.pricingType === 'batch') {
        payload.batches = payload.batches.map(batch => {
          if (!batch.price || !batch.price[0] || !batch.price[0].offerPrice || !batch.price[0].standardPrice) {
            throw new Error(`Batch "${batch.name}" is missing pricing information`);
          }
          return batch;
        });
      }

      const formData = new FormData();
      
      if (thumbnail) {
        formData.append('thumbnail', thumbnail);
      }
      
      formData.append('payload', JSON.stringify(payload));

      const response = await api.post(`${COURSE_BASE_URL}/create-course`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  }

  async updateCourse(courseId, courseData, thumbnail) {
    try {
      const payload = {
        courseName: courseData.courseName,
        description: courseData.description,
        pricingType: courseData.pricingType,
        languages: courseData.languages,
        batches: courseData.batches || [],
        status: "active",
      };

      // Add price data based on pricing type
      if (courseData.pricingType === 'one-time') {
        payload.price = courseData.price;
      } else if (courseData.pricingType === 'batch') {
        // Ensure all batches have pricing if using batch pricing
        payload.batches = payload.batches.map(batch => {
          if (!batch.price || !batch.price[0] || !batch.price[0].offerPrice || !batch.price[0].standardPrice) {
            throw new Error(`Batch "${batch.name}" is missing pricing information`);
          }
          return batch;
        });
      }

      const formData = new FormData();
      
      if (thumbnail) {
        formData.append('thumbnail', thumbnail);
      }
      
      formData.append('payload', JSON.stringify(payload));

      const response = await api.put(`${COURSE_BASE_URL}/${courseId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  }

  async deleteCourse(courseId) {
    try {
      const response = await api.delete(`${COURSE_BASE_URL}/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  }

  async addBatch(courseId, batchData) {
    try {
      const response = await api.post(`course/course/batches/${courseId}`, batchData);
      return response.data;
    } catch (error) {
      console.error('Error adding batch:', error);
      throw error;
    }
  }

  async updateBatch(courseId, batchId, batchData) {
    try {
      const response = await api.put(`${COURSE_BASE_URL}/${courseId}/batches/${batchId}`, batchData);
      return response.data;
    } catch (error) {
      console.error('Error updating batch:', error);
      throw error;
    }
  }

  async deleteBatch(courseId, batchId) {
    try {
      const response = await api.delete(`${COURSE_BASE_URL}/${courseId}/batches/${batchId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting batch:', error);
      throw error;
    }
  }

  async uploadPricingCSV(courseId, file) {
    try {
      const formData = new FormData();
      const fileBlob = new Blob([file], { type: "text/csv" });
      formData.append('file', fileBlob, file.name);

      const response = await api.post(`${COURSE_BASE_URL}/${courseId}/pricing/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading pricing CSV:', error);
      throw error;
    }
  }

  filterCoursesByQuery(courses, query) {
    if (!query || query === '') {
      return courses;
    }
    return courses.filter((course) =>
      course.courseName.toLowerCase().includes(query.toLowerCase())
    );
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  calculateDaysBetween(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const dayInMilliseconds = 1000 * 60 * 60 * 24;
    return Math.ceil(timeDifference / dayInMilliseconds);
  }

  calculateBatchDays(startDate, endDate, batchType) {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (batchType === 'weekdays') {
      let weekdays = 0;
      const current = new Date(start);
      
      while (current <= end) {
        const dayOfWeek = current.getDay();
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          weekdays++;
        }
        current.setDate(current.getDate() + 1);
      }
      return weekdays;
    } else if (batchType === 'weekends') {
      let weekends = 0;
      const current = new Date(start);
      
      while (current <= end) {
        const dayOfWeek = current.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          weekends++;
        }
        current.setDate(current.getDate() + 1);
      }
      return weekends;
    }
    
    return totalDays + 1;
  }

  getUpcomingBatchDuration(batches) {
    if (!batches || batches.length === 0) return null;

    const currentDate = new Date();
    const batch = batches
      .filter((batch) => new Date(batch.startDate) > currentDate)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0];

    if (!batch) return null;

    const duration = this.calculateBatchDays(batch.startDate, batch.endDate, batch.batchType);
    return `${duration} days`;
  }

  renderBatchStartDate(batches) {
    if (!batches || batches.length === 0) return null;

    const firstBatchStartDate = this.formatDate(batches[0].startDate);
    const additionalBatchesCount = batches.length - 1;

    if (batches.length === 1) {
      return firstBatchStartDate;
    }

    return `${firstBatchStartDate} (+${additionalBatchesCount} more batch${additionalBatchesCount > 1 ? "es" : ""})`;
  }

  validateImageFile(file, maxSizeKB = 500) {
    const validationResult = {
      isValid: true,
      message: ''
    };

    if (!file) {
      validationResult.isValid = false;
      validationResult.message = 'Please select a file.';
      return validationResult;
    }

    if (!file.type.startsWith('image/')) {
      validationResult.isValid = false;
      validationResult.message = 'Please upload a valid image file.';
      return validationResult;
    }

    const maxFileSize = maxSizeKB * 1024;
    if (file.size > maxFileSize) {
      validationResult.isValid = false;
      validationResult.message = `File size exceeds ${maxSizeKB} KB. Please upload a smaller image.`;
      return validationResult;
    }

    return validationResult;
  }

  formatTimeTo12Hour(time) {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const period = +hours >= 12 ? "PM" : "AM";
    const formattedHours = +hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  }

  convertTimeRangeTo24Hour(timeRange) {
    if (!timeRange || typeof timeRange !== "string") {
      return {
        error: "Invalid time range. Please provide a valid time range string.",
      };
    }

    const convertTo24HourFormat = (time) => {
      const [timePart, meridian] = time.split(" ");
      if (!timePart || !meridian || !["AM", "PM"].includes(meridian)) {
        throw new Error("Invalid time format");
      }

      let [hours, minutes] = timePart.split(":").map(Number);

      if (isNaN(hours) || isNaN(minutes)) {
        throw new Error("Invalid time format");
      }

      if (meridian === "PM" && hours !== 12) {
        hours += 12;
      } else if (meridian === "AM" && hours === 12) {
        hours = 0;
      }

      hours = hours.toString().padStart(2, "0");
      minutes = minutes.toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    try {
      const [startTime, endTime] = timeRange.split(" - ");

      if (!startTime || !endTime) {
        throw new Error("Time range must include a start and end time separated by ' - '");
      }

      const start = convertTo24HourFormat(startTime.trim());
      const end = convertTo24HourFormat(endTime.trim());

      return { start, end };
    } catch (error) {
      return { error: error.message };
    }
  }

  combineDateTime(date, time) {
    if (!date || !time) return null;
    
    const dateObj = new Date(date);
    const [hours, minutes] = time.split(':');
    
    dateObj.setHours(parseInt(hours, 10));
    dateObj.setMinutes(parseInt(minutes, 10));
    dateObj.setSeconds(0);
    dateObj.setMilliseconds(0);
    
    return dateObj;
  }
}

export default new CourseService();