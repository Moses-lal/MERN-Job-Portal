import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    photoid:{
      type:String,
      default: "NA",
    },
    gender:{
      type: String,
      required:true,
      enum : ["male","female","others","NA"],
      default:"NA"
    },
    dob:{
      type:String,
      required:true,
      default:"NA"
    },
   address: {
      type: String,
      required: function () {
        return this.role === "applicant";
      },
      default: function () {
        return this.role === "applicant" ? "N/A" : undefined;
      },
    },
    exp: {
      type: String,
      required: function () {
        return this.role === "applicant";
      },
      default: function () {
        return this.role === "applicant" ? "N/A" : undefined;
      },
    },
    qualification: {
      type: String,
      required: function () {
        return this.role === "applicant";
      },
      default: function () {
        return this.role === "applicant" ? "N/A" : undefined;
      },
    },
    bio: {
      type: String,
      required: function () {
        return this.role === "applicant";
      },
      default: function () {
        return this.role === "applicant" ? "N/A" : undefined;
      },
    },
    linkedin: {
      type: String,
      required: true,
      default: "N/A",
    },
    github: {
      type: String,
      required: function () {
        return this.role === "applicant";
      },
      default: function () {
        return this.role === "applicant" ? "N/A" : undefined;
      },
    },
    insta: {
      type: String,
      required: true,
      default: "N/A",
    },
    twitter: {
      type: String,
      required: true,
      default: "N/A",
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },
    skills: {
      type: String,
      required: function () {
        return this.role === "applicant";
      },
      default: function () {
        return this.role === "applicant" ? "N/A" : undefined;
      },
    },
    role: {
      type: String,
      required: true,
      enum: ["applicant", "recruiter", "admin"],
      default: "applicant",
    },
    companyName: {
      type: String,
      required: function () {
        return this.role === "recruiter";
      },
      default: function () {
        return this.role === "recruiter" ? "N/A" : undefined;
      },
    },
    companyAddress: {
      type: String,
      required: function () {
        return this.role === "recruiter";
      },
      default: function () {
        return this.role === "recruiter" ? "N/A" : undefined;
      },
    },
    companyEmail: {
      type: String,
      required: function () {
        return this.role === "recruiter";
      },
      default: function () {
        return this.role === "recruiter" ? "N/A" : undefined;
      },
    },
    companyPhone: {
      type: String,
      required: function () {
        return this.role === "recruiter";
      },
      default: function () {
        return this.role === "recruiter" ? "N/A" : undefined;
      },
    },
    companyWebsite: {
      type: String,
      required: function () {
        return this.role === "recruiter";
      },
      default: function () {
        return this.role === "recruiter" ? "N/A" : undefined;
      },
    },
    companyDescription: {
      type: String,
      required: function () {
        return this.role === "recruiter";
      },
      default: function () {
        return this.role === "recruiter" ? "N/A" : undefined;
      },
    },
    companyDetail: {
      type: String,
      required: function () {
        return this.role === "recruiter";
      },
      default: function () {
        return this.role === "recruiter" ? "N/A" : undefined;
      },
    },
    companySince: {
      type: String,
      required: function () {
        return this.role === "recruiter";
      },
      default: function () {
        return this.role === "recruiter" ? "N/A" : undefined;
      },
    },
    companyEmployees: {
      type: String,
      required: function () {
        return this.role === "recruiter";
      },
      default: function () {
        return this.role === "recruiter" ? "N/A" : undefined;
      },
    },

  },
  { timestamps: true }
);

const User = mongoose.model("User",userSchema)

export default User;