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
const getAllTutors= async ({search,category,isFeatured}:{search: string | undefined,category: string | undefined,isFeatured?: boolean | undefined})=>{
    
    const andConditions:TutorProfileWhereInput[]=[];
    
    if(search){
        andConditions.push({ OR:[
                {
            subject: {
                contains: search as string,
                mode: 'insensitive'
            }
                },
                {
            price: {
                contains: search as string,
                mode: 'insensitive'
            }
                },
                {
                    reviews:{
                        some:{
                            rating: search as string
                        }
                    }
                }
                
            ]})
    }

    if(category){
        andConditions.push({
             category: {
        name: {
        contains:category as string,
        mode: "insensitive",
        },
    },
        })
    }

    if(typeof isFeatured === 'boolean'){
        andConditions.push({
            isFeatured: isFeatured
        })
    }
    
    
    const result =await prisma.tutorProfile.findMany({
        where: {
            AND:andConditions
            
            
        },
        include: {
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
}

    });
     return result;
}

// get tutor by id
const getTutorById = async (id: string) => {
    const result = await prisma.tutorProfile.findUnique({
        where: { id },
    });
    return result;
}

export const tutorService = { 
    createTutor,
    getAllTutors,
    getTutorById

 };