import { TutorProfile } from "../../generated/prisma/client";
import { TutorProfileWhereInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";


const createTutor = async (data: Omit<TutorProfile, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.tutorProfile.create({
        data
    })
    return result;
}
// search by subject, price, rating


const getAllTutors = async ({
  search,
  category,
  isFeatured,
}: {
  search?: string
  category?: string
  isFeatured?: boolean
}) => {
  const andConditions: TutorProfileWhereInput[] = []

  if (search) {
    andConditions.push({
      OR: [
        {
          subject: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          price: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          reviews:{
                        some:{
                            rating: search as string
                        }
                    }
        },
      ],
    })
  }

  if (category) {
    andConditions.push({
      category: {
        name: {
          contains: category,
          mode: "insensitive",
        },
      },
    })
  }

  if (typeof isFeatured === "boolean") {
    andConditions.push({
      isFeatured,
    })
  }

  const result = await prisma.tutorProfile.findMany({
    where: andConditions.length ? { AND: andConditions } : {},
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      reviews: {
        select: {
          rating: true,
          comment: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  })

  return result
}


// get tutor by id
const getTutorById = async (id: string) => {
    const result = await prisma.tutorProfile.findUnique({
        where: { id },
        include: {
      user: true,
    },
    });
    return result;
}
const getTutorByUserId = async (userId: string) => {
  const result = await prisma.tutorProfile.findUnique({
    where: {
      userId: userId, 
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
      reviews: {
        select: {
          rating: true,
          comment: true,
        },
      },
    },
  })

  return result
}

const updateTutorById=async (tutorId:string,data:Partial<TutorProfile>)=>{
     console.log(data);
    const result= await prisma.tutorProfile.update({
        where:{
            id:tutorId
        },
        data
    })
    return result;
 }

const deleteTutorById=async (tutorId:string)=>{
    
    const result= await prisma.tutorProfile.delete({
        where:{
            id:tutorId
        }
    })
    return result;
 }


export const tutorService = { 
    createTutor,
    getAllTutors,
    getTutorById,
    getTutorByUserId,
    updateTutorById,
    deleteTutorById

 };