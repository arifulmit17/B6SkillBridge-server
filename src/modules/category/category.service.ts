
import { Category } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createCategory = async (data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.category.create({
        data
    })
    return result;
}

const getAllCategories = async () => {
  const result = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          tutors: true,
          bookings: true,
        },
      },
    },
  })
  return result
}
const getCategoryById = async (id: string) => {
    const result = await prisma.category.findUnique({
        where: { id },
    });
    return result;
}

const updateCategoryById=async (categoryId:string,data:Partial<Category>)=>{
     console.log(data);
     const result= await prisma.category.update({
         where:{
             id:categoryId
         },
         data
     })
     return result;
  }


const deleteCategoryById=async (categoryId:string)=>{
    
    const result= await prisma.category.delete({
        where:{
            id:categoryId
        }
    })
    return result;
 }


export const categoryService = { createCategory,getAllCategories,getCategoryById,updateCategoryById,deleteCategoryById };

