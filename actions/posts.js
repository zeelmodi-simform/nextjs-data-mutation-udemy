"use server";

import { redirect } from "next/navigation";

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";

export async function createPost(prevState, formData) {
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = [];

    if (!title || title.trim().length === 0) {
      errors.push('Title is required!')
    }

    if (!content || content.trim().length === 0) {
      errors.push('Content is required.')
    }

    if (!image || image.size === 0) {
      errors.push('Image is required!')
    }

    if (errors.length) {
      return {
        errors
      };
    }
  
    console.log({ image });

    let imageUrl;

    try {
        imageUrl = await uploadImage(image)
    } catch (error) {
        console.log({error})
        throw new Error('Image upload failed, post was not created. Please try again later.')
    }
  
    await storePost({
      imageUrl: imageUrl,
      title,
      content,
      userId: 1
    })

    revalidatePath('/feed', 'page')
    redirect('/feed')
};

export async function togglePostLikeStatus(postId) {
  
  updatePostLikeStatus(postId, 2);
  revalidatePath('/', 'layout')
}