// src/app.ts
import express6 from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id            String        @id\n  name          String\n  email         String        @unique\n  emailVerified Boolean       @default(false)\n  image         String?\n  createdAt     DateTime      @default(now())\n  updatedAt     DateTime      @updatedAt\n  role          String?       @default("Student")\n  status        String?       @default("Unbanned")\n  tutorProfile  TutorProfile?\n  reviews       Reviews[]\n  accounts      Account[]\n  sessions      Session[]\n  bookings      Booking[]\n\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum Role {\n  Student\n  Tutor\n  Admin\n}\n\nenum TutorStatus {\n  ACTIVE\n  INACTIVE\n}\n\nmodel TutorProfile {\n  id String @id @default(cuid())\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id])\n\n  price   String\n  subject String\n\n  reviews           Reviews[]\n  availabilitySlots AvailabilitySlot[]\n  bookings          Booking[]\n\n  isFeatured Boolean     @default(false)\n  status     TutorStatus @default(ACTIVE)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Category {\n  id   String @id @default(cuid())\n  name String @unique\n\n  tutors   TutorProfile[]\n  bookings Booking[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Reviews {\n  id String @id @default(cuid())\n\n  tutorId String\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  rating  String\n  comment String?\n\n  createdAt DateTime @default(now())\n}\n\nmodel AvailabilitySlot {\n  id String @id @default(cuid())\n\n  tutorId String\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n\n  dayOfWeek String\n\n  isAvailable Boolean @default(true)\n\n  createdAt DateTime @default(now())\n}\n\nenum SessionStatus {\n  PENDING\n  COMPLETED\n  CANCELLED\n}\n\nmodel Booking {\n  id      String       @id @default(cuid())\n  tutorId String\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n\n  studentId String\n  student   User   @relation(fields: [studentId], references: [id], onDelete: Cascade)\n\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id])\n\n  startTime DateTime\n  endTime   DateTime\n\n  status    SessionStatus @default(PENDING) // e.g., PENDING, COMPLETED, CANCELLED\n  createdAt DateTime      @default(now())\n  updatedAt DateTime      @updatedAt\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"role","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"tutorProfile","kind":"object","type":"TutorProfile","relationName":"TutorProfileToUser"},{"name":"reviews","kind":"object","type":"Reviews","relationName":"ReviewsToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"TutorProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"TutorProfileToUser"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToTutorProfile"},{"name":"price","kind":"scalar","type":"String"},{"name":"subject","kind":"scalar","type":"String"},{"name":"reviews","kind":"object","type":"Reviews","relationName":"ReviewsToTutorProfile"},{"name":"availabilitySlots","kind":"object","type":"AvailabilitySlot","relationName":"AvailabilitySlotToTutorProfile"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToTutorProfile"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"status","kind":"enum","type":"TutorStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"tutors","kind":"object","type":"TutorProfile","relationName":"CategoryToTutorProfile"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToCategory"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Reviews":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"ReviewsToTutorProfile"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewsToUser"},{"name":"rating","kind":"scalar","type":"String"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"AvailabilitySlot":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"AvailabilitySlotToTutorProfile"},{"name":"dayOfWeek","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"BookingToTutorProfile"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"student","kind":"object","type":"User","relationName":"BookingToUser"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"BookingToCategory"},{"name":"startTime","kind":"scalar","type":"DateTime"},{"name":"endTime","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"SessionStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.App_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "Student",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "Unbanned",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true
  }
});

// src/modules/tutor/tutor.router.ts
import express from "express";

// src/modules/tutor/tutor.service.ts
var createTutor = async (data) => {
  const result = await prisma.tutorProfile.create({
    data
  });
  return result;
};
var getAllTutors = async ({
  search,
  category,
  isFeatured
}) => {
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: [
        {
          subject: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          price: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          reviews: {
            some: {
              rating: search
            }
          }
        }
      ]
    });
  }
  if (category) {
    andConditions.push({
      category: {
        name: {
          contains: category,
          mode: "insensitive"
        }
      }
    });
  }
  if (typeof isFeatured === "boolean") {
    andConditions.push({
      isFeatured
    });
  }
  const result = await prisma.tutorProfile.findMany({
    where: andConditions.length ? { AND: andConditions } : {},
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      reviews: {
        select: {
          rating: true,
          comment: true
        }
      },
      category: {
        select: {
          name: true
        }
      }
    }
  });
  return result;
};
var getTutorById = async (id) => {
  const result = await prisma.tutorProfile.findUnique({
    where: { id },
    include: {
      user: true
    }
  });
  return result;
};
var getTutorByUserId = async (userId) => {
  const result = await prisma.tutorProfile.findUnique({
    where: {
      userId
      // 👈 IMPORTANT FIX
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      category: {
        select: {
          name: true
        }
      },
      reviews: {
        select: {
          rating: true,
          comment: true
        }
      }
    }
  });
  return result;
};
var updateTutorById = async (tutorId, data) => {
  console.log(data);
  const result = await prisma.tutorProfile.update({
    where: {
      id: tutorId
    },
    data
  });
  return result;
};
var deleteTutorById = async (tutorId) => {
  const result = await prisma.tutorProfile.delete({
    where: {
      id: tutorId
    }
  });
  return result;
};
var tutorService = {
  createTutor,
  getAllTutors,
  getTutorById,
  getTutorByUserId,
  updateTutorById,
  deleteTutorById
};

// src/modules/tutor/tutor.controller.ts
var createTutor2 = async (req, res) => {
  try {
    const result = await tutorService.createTutor(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ error: "Tutor creation failed", details: e });
  }
};
var getAllTutors2 = async (req, res) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : void 0;
    const { category } = req.query;
    const filterString = typeof category === "string" ? category : void 0;
    const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : void 0;
    const result = await tutorService.getAllTutors({ search: searchString, category: filterString, isFeatured });
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: "Tutor fetching failed", details: e });
  }
};
var getTutorById2 = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Tutor Id is required!");
    }
    const result = await tutorService.getTutorById(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: "Tutor fetching failed", details: e });
  }
};
var getTutorByUserId2 = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      throw new Error("User Id is required!");
    }
    const result = await tutorService.getTutorByUserId(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: "Tutor fetching failed", details: e });
  }
};
var updateTutorById2 = async (req, res) => {
  try {
    const { tutorId } = req.params;
    console.log(tutorId);
    const result = await tutorService.updateTutorById(tutorId, req.body);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: "Tutor update failed", details: e });
  }
};
var tutorController = { createTutor: createTutor2, getAllTutors: getAllTutors2, getTutorById: getTutorById2, getTutorByUserId: getTutorByUserId2, updateTutorById: updateTutorById2 };

// src/modules/tutor/tutor.router.ts
var router = express.Router();
router.get("/user", tutorController.getTutorByUserId);
router.get("/", tutorController.getAllTutors);
router.get("/:id", tutorController.getTutorById);
router.patch("/:id", tutorController.updateTutorById);
router.post("/", tutorController.createTutor);
var tutorRouter = router;

// src/modules/category/category.router.ts
import express2 from "express";

// src/modules/category/category.service.ts
var createCategory = async (data) => {
  const result = await prisma.category.create({
    data
  });
  return result;
};
var getAllCategories = async () => {
  const result = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          tutors: true,
          bookings: true
        }
      }
    }
  });
  return result;
};
var updateCategoryById = async (categoryId, data) => {
  console.log(data);
  const result = await prisma.category.update({
    where: {
      id: categoryId
    },
    data
  });
  return result;
};
var deleteCategoryById = async (categoryId) => {
  const result = await prisma.category.delete({
    where: {
      id: categoryId
    }
  });
  return result;
};
var categoryService = { createCategory, getAllCategories, updateCategoryById, deleteCategoryById };

// src/modules/category/category.controller.ts
var createCategory2 = async (req, res) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ error: "Category creation failed", details: e });
  }
};
var getAllCategories2 = async (req, res) => {
  try {
    const result = await categoryService.getAllCategories();
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ error: "Categories fetching failed", details: e });
  }
};
var updateCategoryById2 = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const result = await categoryService.updateCategoryById(
      categoryId,
      req.body
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Category update failed",
      details: e
    });
  }
};
var deleteCategoryById2 = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const result = await categoryService.deleteCategoryById(categoryId);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete category",
      error
    });
  }
};
var categoryController = { createCategory: createCategory2, getAllCategories: getAllCategories2, updateCategoryById: updateCategoryById2, deleteCategoryById: deleteCategoryById2 };

// src/modules/category/category.router.ts
var router2 = express2.Router();
router2.get("/", categoryController.getAllCategories);
router2.post("/", categoryController.createCategory);
router2.patch("/:categoryId", categoryController.updateCategoryById);
router2.delete("/:categoryId", categoryController.deleteCategoryById);
var categoryRouter = router2;

// src/modules/review/review.router.ts
import express3 from "express";

// src/modules/review/review.service.ts
var createReview = async (data) => {
  const result = await prisma.reviews.create({
    data
  });
  return result;
};
var getAllReviews = async () => {
  const result = await prisma.reviews.findMany();
  return result;
};
var getReviewsByTutorId = async (tutorId) => {
  const result = await prisma.reviews.findMany(
    {
      where: { tutorId }
    }
  );
  return result;
};
var updateReviewById = async (reviewId, data) => {
  console.log(data);
  const result = await prisma.reviews.update({
    where: {
      id: reviewId
    },
    data
  });
  return result;
};
var deleteReviewById = async (reviewId) => {
  const result = await prisma.reviews.delete({
    where: {
      id: reviewId
    }
  });
  return result;
};
var reviewService = { createReview, getReviewsByTutorId, getAllReviews, updateReviewById, deleteReviewById };

// src/modules/review/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    const result = await reviewService.createReview(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ error: "Review creation failed", details: e });
  }
};
var getReviewsByTutorId2 = async (req, res) => {
  try {
    const { tutorid } = req.query;
    const result = await reviewService.getReviewsByTutorId(tutorid);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: "Review fetching failed", details: e });
  }
};
var getAllReviews2 = async (req, res) => {
  try {
    const { tutorid } = req.query;
    const result = await reviewService.getAllReviews();
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: "Review fetching failed", details: e });
  }
};
var updateReviewById2 = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const result = await reviewService.updateReviewById(
      reviewId,
      req.body
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Review update failed",
      details: e
    });
  }
};
var deleteReviewById2 = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const result = await reviewService.deleteReviewById(reviewId);
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete review",
      error
    });
  }
};
var reviewController = { createReview: createReview2, getReviewsByTutorId: getReviewsByTutorId2, getAllReviews: getAllReviews2, updateReviewById: updateReviewById2, deleteReviewById: deleteReviewById2 };

// src/modules/review/review.router.ts
var router3 = express3.Router();
router3.get("/", reviewController.getAllReviews);
router3.get("/tutor", reviewController.getReviewsByTutorId);
router3.post("/", reviewController.createReview);
router3.patch("/:reviewId", reviewController.updateReviewById);
router3.delete("/:reviewId", reviewController.deleteReviewById);
var reviewRouter = router3;

// src/modules/teachingsession/teachingsession.router.ts
import express4 from "express";

// src/modules/teachingsession/teachingsession.service.ts
var createTeachingSession = async (data) => {
  const result = await prisma.booking.create({
    data
  });
  return result;
};
var getAllTeachingSessions = async () => {
  const result = await prisma.booking.findMany({
    include: {
      tutor: true,
      student: true
    }
  });
  return result;
};
var updateSessionById = async (sessionId, data) => {
  console.log(data);
  const result = await prisma.booking.update({
    where: {
      id: sessionId
    },
    data
  });
  return result;
};
var deleteSessionById = async (sessionId) => {
  const result = await prisma.booking.delete({
    where: {
      id: sessionId
    }
  });
  return result;
};
var teachingSessionService = { createTeachingSession, getAllTeachingSessions, deleteSessionById, updateSessionById };

// src/modules/teachingsession/teachingsession.controller.ts
var createTeachingSession2 = async (req, res) => {
  try {
    const result = await teachingSessionService.createTeachingSession(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ error: "Teaching session creation failed", details: e });
  }
};
var getAllTeachingSessions2 = async (req, res) => {
  try {
    const { tutorid } = req.query;
    const result = await teachingSessionService.getAllTeachingSessions();
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: "Teaching session fetching failed", details: e });
  }
};
var updateTeachingSessionById = async (req, res) => {
  try {
    const { sessionId } = req.params;
    console.log(sessionId);
    const result = await teachingSessionService.updateSessionById(sessionId, req.body);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: "Teaching session update failed", details: e });
  }
};
var deleteTeachingSessionById = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const result = await teachingSessionService.deleteSessionById(sessionId);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: "Teaching session deletion failed", details: e });
  }
};
var teachingSessionController = { createTeachingSession: createTeachingSession2, getAllTeachingSessions: getAllTeachingSessions2, deleteTeachingSessionById, updateTeachingSessionById };

// src/modules/teachingsession/teachingsession.router.ts
var router4 = express4.Router();
router4.get("/", teachingSessionController.getAllTeachingSessions);
router4.patch("/:sessionId", teachingSessionController.updateTeachingSessionById);
router4.post("/", teachingSessionController.createTeachingSession);
router4.delete("/:sessionId", teachingSessionController.deleteTeachingSessionById);
var teachingSessionRouter = router4;

// src/modules/User/user.router.ts
import express5 from "express";

// src/modules/User/user.service.ts
var getAllUser = async () => {
  const result = await prisma.user.findMany();
  return result;
};
var updateUserById = async (userId, data) => {
  console.log(data);
  const result = await prisma.user.update({
    where: {
      id: userId
    },
    data
  });
  return result;
};
var userService = { getAllUser, updateUserById };

// src/modules/User/user.controller.ts
var getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUser();
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: "Review fetching failed", details: e });
  }
};
var updateUserById2 = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const result = await userService.updateUserById(userId, req.body);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: "Tutor update failed", details: e });
  }
};
var userController = { getAllUsers, updateUserById: updateUserById2 };

// src/modules/User/user.router.ts
var router5 = express5.Router();
router5.get("/", userController.getAllUsers);
router5.patch("/:userId", userController.updateUserById);
var userRouter = router5;

// src/app.ts
var app = express6();
app.use(cors({
  origin: process.env.APP_URL || "http://localhost:4000",
  credentials: true
}));
app.use(express6.json());
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use("/api/tutors", tutorRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/teachingsessions", teachingSessionRouter);
app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  res.send("Welcome to the SkillBridge Server!");
});
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
