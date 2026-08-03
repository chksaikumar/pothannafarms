import { storage } from '@/lib/firebase/client'
import { adminStorage } from '@/lib/firebase/admin'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

export const uploadFile = async (path: string, file: File, onProgress?: (progress: number) => void): Promise<string> => {
  const storageRef = ref(storage, path)
  const uploadTask = uploadBytesResumable(storageRef, file)
  
  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        onProgress?.(progress)
      },
      (error) => reject(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        resolve(downloadURL)
      }
    )
  })
}

export const deleteFile = async (path: string) => {
  const storageRef = ref(storage, path)
  await deleteObject(storageRef)
}

export const generateStoragePath = (folder: string, id: string, fileName: string) => {
  const ext = fileName.split('.').pop()
  return `${folder}/${id}/${Date.now()}.${ext}`
}
