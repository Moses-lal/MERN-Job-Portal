import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
      default: "N/A",
    },

    photoid: {
      type: String,
      default: "NA",
    },

    gender: {
      type: String,
      enum: ["male", "female", "others", "NA"],
      default: "NA",
    },

    dob: {
      type: String,
      default: "NA",
    },

    role: {
      type: String,
      enum: ["applicant", "recruiter", "admin"],
      default: "applicant",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },

    address: {
      type: String,
      default: "N/A",
    },

    exp: {
      type: String,
      default: "N/A",
    },

    title: {
      type: String,
      default: "N/A",
    },

    pronouns: {
      type: String,
      default: "N/A",
    },

    location: {
      type: String,
      default: "N/A",
    },

    bio: {
      type: String,
      default: "N/A",
    },

    linkedin: {
      type: String,
      default: "N/A",
    },

    github: {
      type: String,
      default: "N/A",
    },

    insta: {
      type: String,
      default: "N/A",
    },

    twitter: {
      type: String,
      default: "N/A",
    },

    skills: {
      type: String,
      default: "N/A",
    },

    preferredjob: {
      type: [String],
      enum: [
        "internship",
        "fulltime",
        "parttime",
        "wfh",
        "hybrid",
        "contract",
        "freelance",
      ],
      default: ["internship"],
    },

    availability: {
      type: [String],
      enum: [
        "immediate",
        "15days",
        "1month",
        "morethan1month",
      ],
      default: ["immediate"],
    },

    preferredlocation: {
      type: [String],
      default: [],
    },

    education: [
      {
        degree: {
          type: String,
          default: "N/A",
        },

        institute: {
          type: String,
          default: "N/A",
        },

        percentage: {
          type: String,
          default: "N/A",
        },
      },
    ],

    experience: [
      {
        companyName: {
          type: String,
          default: "N/A",
        },

        role: {
          type: String,
          default: "N/A",
        },

        startDate: {
          type: String,
          default: "N/A",
        },

        endDate: {
          type: String,
          default: "N/A",
        },
      },
    ],

    projects: [
      {
        projectName: {
          type: String,
          default: "N/A",
        },

        startDate: {
          type: String,
          default: "N/A",
        },

        endDate: {
          type: String,
          default: "N/A",
        },

        techStack: {
          type: String,
          default: "N/A",
        },
      },
    ],

    companyeducation: {
      degree: {
        type: String,
        default: "N/A",
      },

      institute: {
        type: String,
        default: "N/A",
      },
    },

    recruiterExperience: {
      companyName: {
        type: String,
        default: "N/A",
      },
    },

    companyName: {
      type: String,
      default: "N/A",
    },

    companyAddress: {
      type: String,
      default: "N/A",
    },

    companyEmail: {
      type: String,
      default: "N/A",
    },

    companyPhone: {
      type: String,
      default: "N/A",
    },

    companyWebsite: {
      type: String,
      default: "N/A",
    },

    companyDescription: {
      type: String,
      default: "N/A",
    },

    companyDetail: {
      type: String,
      default: "N/A",
    },

    companySince: {
      type: String,
      default: "N/A",
    },

    companyEmployees: {
      type: String,
      default: "N/A",
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;